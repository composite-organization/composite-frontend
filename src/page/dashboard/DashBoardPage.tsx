import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { WidgetName } from '@/shared/types/widget.type';
import type { LectureMaterial } from '@/features/lecture-materials/types';
import type { VoteSelectionItem } from '@/features/vote/ui/blocks/SelectionList';
import {
  useLessonQuery,
  useLessonWidgetIdsQuery,
} from '@/features/lesson/api/lesson.queries';
import { useMemoWidgetsQuery } from '@/features/memo/api/memo.queries';
import {
  useDeleteQuizWidgetMutation,
  useQuizWidgetsQuery,
  useQuizAnswersQueries,
  useCreateQuizWidgetMutation,
  useUpdateQuizOptionsMutation,
  useUpdateQuizStatusMutation,
} from '@/features/quiz/api/quiz.queries';
import type { MemoWidget } from '@/features/memo/api/memo.api';
import type { QuizWidgetDetail } from '@/features/quiz/api/quiz.api';
import { getCurrentLessonId } from '@/lib/lessonStorage';
import SiteHeader from '@/shared/components/widget/dashboard-header/DashboardHeader';
import DashboardHeader from '@/features/dashboard/ui/dashboard-header/DashboardHeader';
import AddWidgetModal from '@/features/dashboard/modal/add-widget-modal/AddWidgetModal';
import QuizCreate, { type QuizCreateData } from '@/features/quiz/ui/QuizCreate';
import VoteCreate from '@/features/vote/ui/VoteCreate';
import QuizTeacher from '@/features/quiz/ui/QuizTeacher';
import VoteTeacher from '@/features/vote/ui/VoteTeacher';
import QuestionTeacher from '@/features/question/ui/QuestionTeacher';
import MemoTeacher from '@/features/memo/ui/MemoTeacher';
import LectureMaterialsTeacher from '@/features/lecture-materials/ui/LectureMaterialsTeacher';

type QuizWidget = {
  type: 'quiz';
  id: string;
  quizWidgetId?: number;
  question: string;
  choices: string[];
  correctAnswerIndex: number;
  correctRate: number;
  isEnded: boolean;
  participantCount: number;
  participantStatuses: QuizParticipantStatus[];
};

interface QuizParticipantStatus {
  choiceIndex: number;
  participants: string[];
}

type VoteWidget = {
  type: 'vote';
  id: string;
  title: string;
  description: string;
  selections: VoteSelectionItem[];
  options: string[];
};

type NoteWidget = {
  type: 'note';
  id: string;
  memoWidgetId?: number;
  title: string;
  content: string;
};

type SimpleWidget = {
  type: 'question' | 'file';
  id: string;
};

type DashboardWidget = QuizWidget | VoteWidget | NoteWidget | SimpleWidget;

function findChoiceIndex(
  options: QuizWidgetDetail['options'],
  optionId: number,
): number {
  return options.findIndex((option) => option.quizOptionId === optionId);
}

function findCorrectAnswerIndex(
  detail: QuizWidgetDetail,
  answerQuizOptionIds: number[],
): number {
  const answerIndex = findChoiceIndex(detail.options, answerQuizOptionIds[0]);
  return answerIndex >= 0 ? answerIndex : 0;
}

function mapParticipantStatuses(
  detail: QuizWidgetDetail,
): QuizParticipantStatus[] {
  return detail.participationResponse.optionStatuses.flatMap((status) => {
    const choiceIndex = findChoiceIndex(detail.options, status.optionId);

    if (choiceIndex < 0) return [];

    return [{ choiceIndex, participants: status.participantNames }];
  });
}

function mapQuizWidget(
  detail: QuizWidgetDetail,
  answerQuizOptionIds: number[],
): QuizWidget {
  return {
    type: 'quiz',
    id: String(detail.quizWidgetId),
    quizWidgetId: detail.quizWidgetId,
    question: detail.title,
    choices: detail.options.map((option) => option.content),
    correctAnswerIndex: findCorrectAnswerIndex(detail, answerQuizOptionIds),
    correctRate: detail.correctRate,
    isEnded: detail.status === '종료',
    participantCount: detail.participationResponse.totalParticipantCount,
    participantStatuses: mapParticipantStatuses(detail),
  };
}

function findQuizWidget(
  widgets: DashboardWidget[],
  widgetId: string,
): QuizWidget | undefined {
  const widget = widgets.find((item) => item.id === widgetId);
  return widget?.type === 'quiz' ? widget : undefined;
}

interface SortableWidgetProps {
  widget: DashboardWidget;
  children: React.ReactNode;
}

function SortableWidget({ widget, children }: SortableWidgetProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      className="mb-5 break-inside-avoid cursor-grab active:cursor-grabbing"
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}

function DashBoardPage() {
  const {
    lessonCode = '',
    lessonName = '',
    teacherName = '',
  } = useParams<{
    lessonCode: string;
    lessonName: string;
    teacherName: string;
  }>();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeCreateModal, setActiveCreateModal] = useState<WidgetName | null>(
    null,
  );
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);
  const [editingQuizWidget, setEditingQuizWidget] = useState<QuizWidget | null>(
    null,
  );
  const hasInitializedRef = useRef(false);

  const authToken = localStorage.getItem('authToken') ?? '';
  const storedLessonId = getCurrentLessonId();
  const { data: lessonData } = useLessonQuery(storedLessonId, authToken);
  const lessonId = lessonData?.lessonId ?? storedLessonId;
  const { data: widgetIdsData } = useLessonWidgetIdsQuery(lessonId, authToken);
  // 메모 위젯
  const memoWidgetIds = useMemo(
    () => widgetIdsData?.widgets.memo ?? [],
    [widgetIdsData],
  );
  const memoWidgetQueries = useMemoWidgetsQuery(memoWidgetIds, authToken);
  // 퀴즈 위젯
  const quizWidgetIds = useMemo(
    () => widgetIdsData?.widgets.quiz ?? [],
    [widgetIdsData],
  );
  const quizWidgetQueries = useQuizWidgetsQuery(quizWidgetIds, authToken);
  const quizAnswerQueries = useQuizAnswersQueries(
    quizWidgetIds,
    authToken,
    quizWidgetIds.length > 0,
  );
  const createQuizWidgetMutation = useCreateQuizWidgetMutation();
  const deleteQuizWidgetMutation = useDeleteQuizWidgetMutation();
  const updateQuizOptionsMutation = useUpdateQuizOptionsMutation();
  const updateQuizStatusMutation = useUpdateQuizStatusMutation();

  useEffect(() => {
    if (hasInitializedRef.current) return;
    if (memoWidgetIds.length === 0 && quizWidgetIds.length === 0) return;
    if (!memoWidgetQueries.every((query) => query.isSuccess)) return;
    if (!quizWidgetQueries.every((query) => query.isSuccess)) return;
    if (!quizAnswerQueries.every((query) => query.isSuccess)) return;

    hasInitializedRef.current = true;

    const memoWidgets = memoWidgetQueries
      .map((query) => query.data)
      .filter((data): data is MemoWidget => data !== undefined)
      .map((data) => ({
        type: 'note' as const,
        id: String(data.id),
        memoWidgetId: data.id,
        title: data.title,
        content: data.content,
      }));

    const quizWidgets = quizWidgetQueries
      .map((query, index) => ({
        answers: quizAnswerQueries[index].data?.answerQuizOptionIds ?? [],
        detail: query.data,
      }))
      .filter(
        (
          value,
        ): value is {
          answers: number[];
          detail: QuizWidgetDetail;
        } => value.detail !== undefined,
      )
      .map(({ answers, detail }) => mapQuizWidget(detail, answers));
    setWidgets([...memoWidgets, ...quizWidgets]);
  }, [
    memoWidgetIds,
    memoWidgetQueries,
    quizAnswerQueries,
    quizWidgetIds,
    quizWidgetQueries,
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  function handleOpenAddModal() {
    setIsAddModalOpen(true);
  }

  function handleCloseAddModal() {
    setIsAddModalOpen(false);
  }

  function handleSelectWidget(id: WidgetName) {
    setIsAddModalOpen(false);
    if (id === 'quiz' || id === 'vote') {
      setActiveCreateModal(id);
      return;
    }
    if (id === 'note') {
      setWidgets((previous) => [
        ...previous,
        { type: 'note', id: crypto.randomUUID(), title: '', content: '' },
      ]);
      return;
    }
    setWidgets((previous) => [
      ...previous,
      { type: id, id: crypto.randomUUID() },
    ]);
  }

  function handleCloseCreateModal() {
    setActiveCreateModal(null);
  }

  function handleQuizSubmit(data: QuizCreateData) {
    if (!lessonId) {
      alert('수업 정보를 불러오지 못해 퀴즈를 생성할 수 없습니다.');
      return;
    }

    createQuizWidgetMutation.mutate(
      {
        lessonId,
        title: data.question,
        options: data.choices.map((choice, index) => ({
          content: choice,
          isCorrect: index === data.correctAnswerIndex,
        })),
      },
      {
        onSuccess: (createdQuiz) => {
          setWidgets((previous) => [
            ...previous,
            {
              type: 'quiz',
              id: String(createdQuiz.quizWidgetId),
              quizWidgetId: createdQuiz.quizWidgetId,
              question: data.question,
              choices: data.choices,
              correctAnswerIndex: data.correctAnswerIndex,
              correctRate: 0,
              isEnded: false,
              participantCount: 0,
              participantStatuses: [],
            },
          ]);
          setActiveCreateModal(null);
        },
        onError: () => {
          alert('퀴즈 생성에 실패했습니다.');
        },
      },
    );
  }

  function handleQuizEdit(widgetId: string) {
    const target = findQuizWidget(widgets, widgetId);
    if (!target || target.isEnded) return;

    setEditingQuizWidget(target);
  }

  function handleQuizEditClose() {
    setEditingQuizWidget(null);
  }

  function handleQuizEditSubmit(data: QuizCreateData) {
    if (!editingQuizWidget?.quizWidgetId || editingQuizWidget.isEnded) return;

    updateQuizOptionsMutation.mutate(
      {
        quizWidgetId: editingQuizWidget.quizWidgetId,
        options: data.choices.map((choice, index) => ({
          content: choice,
          isCorrect: index === data.correctAnswerIndex,
        })),
      },
      {
        onSuccess: () => {
          setWidgets((previous) =>
            previous.map((widget) =>
              widget.id === editingQuizWidget.id && widget.type === 'quiz'
                ? {
                    ...widget,
                    choices: data.choices,
                    correctAnswerIndex: data.correctAnswerIndex,
                  }
                : widget,
            ),
          );
          setEditingQuizWidget(null);
        },
        onError: () => {
          alert('퀴즈 수정에 실패했습니다.');
        },
      },
    );
  }

  function handleQuizDelete(widgetId: string) {
    const target = findQuizWidget(widgets, widgetId);
    if (!target) return;

    const removeQuizWidget = () => {
      setWidgets((previous) =>
        previous.filter((widget) => widget.id !== widgetId),
      );
    };

    if (!target.quizWidgetId) {
      removeQuizWidget();
      return;
    }

    deleteQuizWidgetMutation.mutate(target.quizWidgetId, {
      onSuccess: removeQuizWidget,
      onError: () => {
        alert('퀴즈 삭제에 실패했습니다.');
      },
    });
  }

  function handleVoteSubmit(data: {
    title: string;
    description: string;
    selections: VoteSelectionItem[];
    options: { id: string; label: string; enabled: boolean }[];
  }) {
    setWidgets((previous) => [
      ...previous,
      {
        type: 'vote',
        id: crypto.randomUUID(),
        title: data.title,
        description: data.description,
        selections: data.selections,
        options: data.options
          .filter((option) => option.enabled)
          .map((option) => option.label),
      },
    ]);
    setActiveCreateModal(null);
  }

  function handleQuizEnd(widgetId: string) {
    const target = widgets.find(
      (widget) => widget.id === widgetId && widget.type === 'quiz',
    );

    if (!target || target.type !== 'quiz' || !target.quizWidgetId) return;

    updateQuizStatusMutation.mutate(
      {
        quizWidgetId: target.quizWidgetId,
        body: { status: '종료' },
      },
      {
        onSuccess: () => {
          setWidgets((previous) =>
            previous.map((widget) =>
              widget.id === widgetId && widget.type === 'quiz'
                ? { ...widget, isEnded: true }
                : widget,
            ),
          );
        },
      },
    );

    setWidgets((previous) =>
      previous.map((widget) =>
        widget.id === widgetId && widget.type === 'quiz'
          ? { ...widget, isEnded: true }
          : widget,
      ),
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setWidgets((previous) => {
      const oldIndex = previous.findIndex((widget) => widget.id === active.id);
      const newIndex = previous.findIndex((widget) => widget.id === over.id);
      return arrayMove(previous, oldIndex, newIndex);
    });
  }

  function renderWidget(widget: DashboardWidget) {
    switch (widget.type) {
      case 'quiz':
        return (
          <QuizTeacher
            question={widget.question}
            choices={widget.choices}
            correctIndex={widget.correctAnswerIndex}
            correctRate={widget.correctRate}
            participantCount={widget.participantCount}
            participantStatuses={widget.participantStatuses}
            isEnded={widget.isEnded}
            onDelete={() => handleQuizDelete(widget.id)}
            onEdit={() => handleQuizEdit(widget.id)}
            onEnd={() => handleQuizEnd(widget.id)}
          />
        );
      case 'vote':
        return (
          <VoteTeacher
            title={widget.title}
            description={widget.description}
            selections={widget.selections}
            options={widget.options}
          />
        );
      case 'question':
        return (
          <QuestionTeacher
            questions={[]}
            currentPage={1}
            onPageChange={() => {}}
          />
        );
      case 'note':
        return (
          <MemoTeacher
            initialTitle={widget.title}
            initialMemo={widget.content}
          />
        );
      case 'file':
        return (
          <LectureMaterialsTeacher
            materials={[] as LectureMaterial[]}
            onUpload={() => {}}
            onDownload={() => {}}
            onDelete={() => {}}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="w-full">
      <SiteHeader entryCode={lessonCode} participantCount={0} />
      <DashboardHeader
        lessonName={lessonName}
        teacherName={teacherName}
        onOpenModal={handleOpenAddModal}
      />
      <div className="px-30 py-6">
        {widgets.length === 0 ? (
          <div className="flex w-full items-center justify-center py-20">
            <p className="body-medium text-black-200">위젯을 생성해주세요.</p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={widgets.map((widget) => widget.id)}
              strategy={rectSortingStrategy}
            >
              <div className="columns-1 gap-5 md:columns-2 lg:columns-3 xl:columns-4">
                {widgets.map((widget) => (
                  <SortableWidget key={widget.id} widget={widget}>
                    {renderWidget(widget)}
                  </SortableWidget>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
      <AddWidgetModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSelectWidget={handleSelectWidget}
      />
      <QuizCreate
        isOpen={activeCreateModal === 'quiz'}
        onClose={handleCloseCreateModal}
        onSubmit={handleQuizSubmit}
      />
      {editingQuizWidget && (
        <QuizCreate
          initialData={editingQuizWidget}
          isOpen
          modalTitle="퀴즈 수정"
          onClose={handleQuizEditClose}
          onSubmit={handleQuizEditSubmit}
          questionDisabled
          submitLabel="수정"
        />
      )}
      <VoteCreate
        isOpen={activeCreateModal === 'vote'}
        onCancel={handleCloseCreateModal}
        onSubmit={handleVoteSubmit}
      />
    </div>
  );
}

export default DashBoardPage;
