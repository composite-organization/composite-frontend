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
import { useCreateMemoWidgetMutation } from '@/features/memo/api/memo.queries';
import { fetchMemoWidget } from '@/features/memo/api/memo.api';
import {
  useCreateVoteWidgetMutation,
  useSubmitVoteMutation,
} from '@/features/vote/api/vote.queries';
import { fetchVoteWidget } from '@/features/vote/api/vote.api';
import type {
  VoteOptionResponse,
  VoteParticipationResponse,
} from '@/features/vote/api/vote.types';
import SiteHeader from '@/shared/components/widget/dashboard-header/DashboardHeader';
import DashboardHeader from '@/features/dashboard/ui/dashboard-header/DashboardHeader';
import AddWidgetModal from '@/features/dashboard/modal/add-widget-modal/AddWidgetModal';
import QuizCreate, { type QuizCreateData } from '@/features/quiz/ui/QuizCreate';
import VoteCreate from '@/features/vote/ui/VoteCreate';
import MemoCreate, { type MemoCreateData } from '@/features/memo/ui/MemoCreate';
import QuizTeacher from '@/features/quiz/ui/QuizTeacher';
import QuizStudent from '@/features/quiz/ui/QuizStudent';
import VoteTeacher from '@/features/vote/ui/VoteTeacher';
import VoteStudent from '@/features/vote/ui/VoteStudent';
import QuestionTeacher from '@/features/question/ui/QuestionTeacher';
import QuestionStudent from '@/features/question/ui/QuestionStudent';
import MemoTeacher from '@/features/memo/ui/MemoTeacher';
import MemoStudent from '@/features/memo/ui/MemoStudent';
import LectureMaterialsTeacher from '@/features/lecture-materials/ui/LectureMaterialsTeacher';
import LectureMaterialsStudent from '@/features/lecture-materials/ui/LectureMaterialsStudent';

type QuizWidget = {
  type: 'quiz';
  id: string;
  question: string;
  choices: string[];
  correctAnswerIndex: number;
  isEnded: boolean;
};

type VoteWidget = {
  type: 'vote';
  id: string;
  voteWidgetId?: number;
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

function buildVoteSettingBadges(
  isAnonymous: boolean,
  isMultiSelectable: boolean,
): string[] {
  const badges: string[] = [];
  if (isAnonymous) badges.push('익명');
  if (isMultiSelectable) badges.push('복수선택');
  return badges;
}

function buildVoteSelections(
  options: VoteOptionResponse[],
  participation?: VoteParticipationResponse,
): VoteSelectionItem[] {
  const totalParticipantCount = participation?.totalParticipantCount ?? 0;
  return options.map((option) => {
    const anonymousCount = participation?.anonymousOptionStatuses?.find(
      (status) => status.optionId === option.id,
    )?.count;
    const identifiedCount = participation?.identifiedOptionStatuses?.find(
      (status) => status.optionId === option.id,
    )?.voterNames.length;
    const voteCount = anonymousCount ?? identifiedCount ?? 0;
    return {
      id: String(option.id),
      label: option.content,
      voteCount,
      votedPercentage:
        totalParticipantCount > 0
          ? Math.round((voteCount / totalParticipantCount) * 100)
          : 0,
    };
  });
}

function DashBoardPage() {
  const {
    role = 'teacher',
    lessonCode = '',
    lessonId: lessonIdParam = '',
  } = useParams<{
    role: string;
    lessonCode: string;
    lessonId: string;
  }>();
  const lessonId = Number(lessonIdParam);
  const isTeacher = role !== 'student';
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeCreateModal, setActiveCreateModal] = useState<WidgetName | null>(
    null,
  );
  const [isMemoCreateOpen, setIsMemoCreateOpen] = useState(false);
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);
  const hasInitializedRef = useRef(false);

  const authToken = localStorage.getItem('authToken') ?? '';
  const { data: lessonData } = useLessonQuery(lessonId, authToken);
  const lessonName = lessonData?.lessonName ?? '';
  const teacherName = lessonData?.teacherName ?? '';
  const { data: widgetIdsData } = useLessonWidgetIdsQuery(lessonId, authToken);
  const memoWidgetIds = useMemo(
    () => widgetIdsData?.widgets.memo ?? [],
    [widgetIdsData],
  );
  const voteWidgetIds = useMemo(
    () => widgetIdsData?.widgets.vote ?? [],
    [widgetIdsData],
  );
  const createMemoMutation = useCreateMemoWidgetMutation(authToken);
  const createVoteMutation = useCreateVoteWidgetMutation(authToken);
  const submitVoteMutation = useSubmitVoteMutation(authToken);

  useEffect(() => {
    if (hasInitializedRef.current) return;
    if (!authToken) return;
    if (!widgetIdsData) return;

    const loadWidgets = async () => {
      try {
        const [memoWidgetDataArray, voteWidgetDataArray] = await Promise.all([
          Promise.all(
            memoWidgetIds.map((id) => fetchMemoWidget(id, authToken)),
          ),
          Promise.all(
            voteWidgetIds.map((id) => fetchVoteWidget(id, authToken)),
          ),
        ]);
        const memoWidgets: DashboardWidget[] = memoWidgetDataArray.map(
          (data) => ({
            type: 'note',
            id: String(data.id),
            memoWidgetId: data.id,
            title: data.title,
            content: data.content,
          }),
        );
        const voteWidgets: DashboardWidget[] = voteWidgetDataArray.map(
          (data) => ({
            type: 'vote',
            id: String(data.id),
            voteWidgetId: data.id,
            title: data.title,
            description: '',
            selections: buildVoteSelections(
              data.options,
              data.participationResponse,
            ),
            options: buildVoteSettingBadges(
              data.isAnonymous,
              data.isMultiSelectable,
            ),
          }),
        );
        setWidgets([...memoWidgets, ...voteWidgets]);
        hasInitializedRef.current = true;
      } catch (error) {
        console.error('위젯 초기 로드 실패', error);
        hasInitializedRef.current = true;
      }
    };

    loadWidgets();
  }, [widgetIdsData, memoWidgetIds, voteWidgetIds, authToken]);

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
      setIsMemoCreateOpen(true);
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

  function handleCloseMemoCreateModal() {
    setIsMemoCreateOpen(false);
  }

  function handleMemoSubmit(data: MemoCreateData) {
    if (!lessonId) return;
    createMemoMutation.mutate(
      {
        lessonId,
        title: data.title,
        content: data.content,
      },
      {
        onSuccess: (createdMemo) => {
          setWidgets((previous) => [
            ...previous,
            {
              type: 'note',
              id: String(createdMemo.id),
              memoWidgetId: createdMemo.id,
              title: createdMemo.title,
              content: createdMemo.content,
            },
          ]);
          setIsMemoCreateOpen(false);
        },
      },
    );
  }

  function handleQuizSubmit(data: QuizCreateData) {
    setWidgets((previous) => [
      ...previous,
      {
        type: 'quiz',
        id: crypto.randomUUID(),
        question: data.question,
        choices: data.choices,
        correctAnswerIndex: data.correctAnswerIndex,
        isEnded: false,
      },
    ]);
    setActiveCreateModal(null);
  }

  function handleVoteSubmit(data: {
    title: string;
    description: string;
    selections: VoteSelectionItem[];
    options: { id: string; label: string; enabled: boolean }[];
  }) {
    if (!lessonId) return;
    const isAnonymous =
      data.options.find((option) => option.id === 'anonymous')?.enabled ??
      false;
    const isMultiSelectable =
      data.options.find((option) => option.id === 'multiple')?.enabled ?? false;
    createVoteMutation.mutate(
      {
        lessonId,
        title: data.title,
        options: data.selections.map((selection) => selection.label),
        isAnonymous,
        isMultiSelectable,
      },
      {
        onSuccess: (createdVote) => {
          setWidgets((previous) => [
            ...previous,
            {
              type: 'vote',
              id: String(createdVote.id),
              voteWidgetId: createdVote.id,
              title: createdVote.title,
              description: data.description,
              selections: buildVoteSelections(createdVote.options),
              options: buildVoteSettingBadges(
                createdVote.isAnonymous,
                createdVote.isMultiSelectable,
              ),
            },
          ]);
          setActiveCreateModal(null);
        },
      },
    );
  }

  function handleVoteStudentSubmit(
    voteWidgetId: number,
    selectedIds: string[],
  ) {
    submitVoteMutation.mutate(
      {
        voteWidgetId,
        body: { optionIds: selectedIds.map(Number) },
      },
      {
        onSuccess: async () => {
          try {
            const updatedVote = await fetchVoteWidget(voteWidgetId, authToken);
            setWidgets((previous) =>
              previous.map((widget) =>
                widget.type === 'vote' && widget.voteWidgetId === voteWidgetId
                  ? {
                      ...widget,
                      selections: buildVoteSelections(
                        updatedVote.options,
                        updatedVote.participationResponse,
                      ),
                    }
                  : widget,
              ),
            );
          } catch (error) {
            console.error('투표 결과 갱신 실패', error);
          }
        },
      },
    );
  }

  function handleQuizEnd(widgetId: string) {
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
        return isTeacher ? (
          <QuizTeacher
            question={widget.question}
            choices={widget.choices}
            correctIndex={widget.correctAnswerIndex}
            participantCount={0}
            isEnded={widget.isEnded}
            onEnd={() => handleQuizEnd(widget.id)}
          />
        ) : (
          <QuizStudent
            question={widget.question}
            choices={widget.choices}
            correctAnswerIndex={widget.correctAnswerIndex}
            participantCount={0}
            isEnded={widget.isEnded}
            onSubmit={() => {}}
          />
        );
      case 'vote':
        return isTeacher ? (
          <VoteTeacher
            title={widget.title}
            description={widget.description}
            selections={widget.selections}
            options={widget.options}
          />
        ) : (
          <VoteStudent
            title={widget.title}
            description={widget.description}
            selections={widget.selections}
            options={widget.options}
            isMultipleChoice={widget.options.includes('복수선택')}
            onSubmit={(selectedIds) => {
              if (widget.voteWidgetId !== undefined) {
                handleVoteStudentSubmit(widget.voteWidgetId, selectedIds);
              }
            }}
          />
        );
      case 'question':
        return isTeacher ? (
          <QuestionTeacher
            questions={[]}
            currentPage={1}
            onPageChange={() => {}}
          />
        ) : (
          <QuestionStudent
            questions={[]}
            currentPage={1}
            onPageChange={() => {}}
            onSubmitQuestion={() => {}}
          />
        );
      case 'note':
        return isTeacher ? (
          <MemoTeacher title={widget.title} content={widget.content} />
        ) : (
          <MemoStudent title={widget.title} memo={widget.content} />
        );
      case 'file':
        return isTeacher ? (
          <LectureMaterialsTeacher
            materials={[] as LectureMaterial[]}
            onUpload={() => {}}
            onDownload={() => {}}
            onDelete={() => {}}
          />
        ) : (
          <LectureMaterialsStudent
            materials={[] as LectureMaterial[]}
            onDownload={() => {}}
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
        onOpenModal={isTeacher ? handleOpenAddModal : undefined}
      />
      <div className="px-30 py-6">
        {widgets.length === 0 && (
          <div className="flex w-full items-center justify-center py-20">
            <p className="body-medium text-black-200">
              {isTeacher
                ? '위젯을 생성해주세요.'
                : '아직 생성된 위젯이 없습니다.'}
            </p>
          </div>
        )}
        {widgets.length > 0 && isTeacher && (
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
        {widgets.length > 0 && !isTeacher && (
          <div className="columns-1 gap-5 md:columns-2 lg:columns-3 xl:columns-4">
            {widgets.map((widget) => (
              <div key={widget.id} className="mb-5 break-inside-avoid">
                {renderWidget(widget)}
              </div>
            ))}
          </div>
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
      <MemoCreate
        isOpen={isMemoCreateOpen}
        onClose={handleCloseMemoCreateModal}
        onSubmit={handleMemoSubmit}
      />
    </div>
  );
}

export default DashBoardPage;
