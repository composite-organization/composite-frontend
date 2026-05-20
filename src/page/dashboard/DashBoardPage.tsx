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
  useQuizWidgetsQuery,
  useCreateQuizWidgetMutation,
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
  isEnded: boolean;
};

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
  const createQuizWidgetMutation = useCreateQuizWidgetMutation();
  const updateQuizStatusMutation = useUpdateQuizStatusMutation();

  useEffect(() => {
    if (hasInitializedRef.current) return;
    if (memoWidgetIds.length === 0 && quizWidgetIds.length === 0) return;
    if (!memoWidgetQueries.every((query) => query.isSuccess)) return;
    if (!quizWidgetQueries.every((query) => query.isSuccess)) return;

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
      .map((query) => query.data)
      .filter((data): data is QuizWidgetDetail => data !== undefined)
      .map((data) => ({
        type: 'quiz' as const,
        id: String(data.quizWidgetId),
        quizWidgetId: data.quizWidgetId,
        question: data.title,
        choices: data.options.map((option) => option.content),
        correctAnswerIndex: 0,
        isEnded: data.status === '종료',
      }));
    setWidgets([...memoWidgets, ...quizWidgets]);
  }, [memoWidgetIds, memoWidgetQueries, quizWidgetIds, quizWidgetQueries]);

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
              isEnded: false,
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
            participantCount={0}
            isEnded={widget.isEnded}
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
      <VoteCreate
        isOpen={activeCreateModal === 'vote'}
        onCancel={handleCloseCreateModal}
        onSubmit={handleVoteSubmit}
      />
    </div>
  );
}

export default DashBoardPage;
