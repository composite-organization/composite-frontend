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
import type { AttachmentWidget } from '@/features/attachment/types';
import type { VoteSelectionItem } from '@/features/vote/ui/blocks/SelectionList';
import { useLessonWidgetIdsQuery } from '@/features/lesson/api/lesson.queries';
import { useCreateMemoWidgetMutation } from '@/features/memo/api/memo.queries';
import { fetchMemoWidget } from '@/features/memo/api/memo.api';
import {
  useAttachmentWidgetAttachmentsQuery,
  useCreateAttachmentWidgetMutation,
  useDeleteAttachmentWidgetMutation,
  useDeleteAttachmentWidgetAttachmentMutation,
  useUploadAttachmentWidgetAttachmentMutation,
} from '@/features/attachment/api/attachment.queries';
import {
  fetchAttachmentWidgetAttachmentDetail,
  fetchAttachmentWidgetAttachments,
} from '@/features/attachment/api/attachment.api';
import SiteHeader from '@/shared/components/widget/dashboard-header/DashboardHeader';
import DashboardHeader from '@/features/dashboard/ui/dashboard-header/DashboardHeader';
import AddWidgetModal from '@/features/dashboard/modal/add-widget-modal/AddWidgetModal';
import QuizCreate, { type QuizCreateData } from '@/features/quiz/ui/QuizCreate';
import VoteCreate from '@/features/vote/ui/VoteCreate';
import MemoCreate, { type MemoCreateData } from '@/features/memo/ui/MemoCreate';
import QuizTeacher from '@/features/quiz/ui/QuizTeacher';
import VoteTeacher from '@/features/vote/ui/VoteTeacher';
import QuestionTeacher from '@/features/question/ui/QuestionTeacher';
import MemoTeacher from '@/features/memo/ui/MemoTeacher';
import AttachmentWidgetTeacher from '@/features/attachment/ui/AttachmentTeacher';

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
  type: 'question';
  id: string;
};

type AttachmentDashboardWidget = {
  type: 'file';
  id: string;
  attachmentWidgetId: number;
};

type DashboardWidget =
  | QuizWidget
  | VoteWidget
  | NoteWidget
  | SimpleWidget
  | AttachmentDashboardWidget;

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

interface AttachmentWidgetCardProps {
  attachmentWidgetId: number;
  token: string;
  onDeleteWidget: () => void;
}

function AttachmentWidgetCard({
  attachmentWidgetId,
  token,
  onDeleteWidget,
}: AttachmentWidgetCardProps) {
  const { data: attachmentData = [] } = useAttachmentWidgetAttachmentsQuery(
    attachmentWidgetId,
    token,
  );
  const uploadAttachmentMutation =
    useUploadAttachmentWidgetAttachmentMutation(token);
  const deleteAttachmentMutation =
    useDeleteAttachmentWidgetAttachmentMutation(token);

  const attachments: AttachmentWidget[] = attachmentData.map((attachment) => ({
    id: String(attachment.id),
    name: attachment.name,
    size: attachment.size,
  }));

  function handleUpload(files: FileList) {
    Array.from(files).forEach((file) => {
      uploadAttachmentMutation.mutate({
        attachmentWidgetId,
        body: { attachment: file },
      });
    });
  }
  function downloadFile(url: string, fileName: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  async function handleDownload(attachment: AttachmentWidget) {
    const { url } = await fetchAttachmentWidgetAttachmentDetail(
      attachmentWidgetId,
      Number(attachment.id),
      token,
    );
    const fileName = await fetchAttachmentWidgetAttachments(
      attachmentWidgetId,
      token,
    ).then((attachmentList) => {
      const targetAttachment = attachmentList.find(
        (att) => String(att.id) === attachment.id,
      );
      return targetAttachment ? targetAttachment.name : 'downloaded_file';
    });

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to download attachment');

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      downloadFile(objectUrl, fileName);
      URL.revokeObjectURL(objectUrl);
    } catch {
      downloadFile(url, fileName);
    }
  }

  function handleDelete(attachment: AttachmentWidget) {
    deleteAttachmentMutation.mutate({
      attachmentWidgetId,
      attachmentId: Number(attachment.id),
    });
  }

  return (
    <AttachmentWidgetTeacher
      attachments={attachments}
      onUpload={handleUpload}
      onDownload={handleDownload}
      onDelete={handleDelete}
      onDeleteWidget={onDeleteWidget}
    />
  );
}

function DashBoardPage() {
  const {
    lessonCode = '',
    lessonId: lessonIdParam = '',
    lessonName = '',
    teacherName = '',
  } = useParams<{
    lessonCode: string;
    lessonId: string;
    lessonName: string;
    teacherName: string;
  }>();
  const lessonId = Number(lessonIdParam);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeCreateModal, setActiveCreateModal] = useState<WidgetName | null>(
    null,
  );
  const [isMemoCreateOpen, setIsMemoCreateOpen] = useState(false);
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);
  const hasInitializedRef = useRef(false);

  const authToken = localStorage.getItem('authToken') ?? '';
  const { data: widgetIdsData } = useLessonWidgetIdsQuery(lessonId, authToken);
  const memoWidgetIds = useMemo(
    () => widgetIdsData?.widgets.memo ?? [],
    [widgetIdsData],
  );
  const attachmentWidgetIds = useMemo(
    () => widgetIdsData?.widgets.attachment ?? [],
    [widgetIdsData],
  );
  const createMemoMutation = useCreateMemoWidgetMutation(authToken);
  const createAttachmentWidgetMutation =
    useCreateAttachmentWidgetMutation(authToken);
  const deleteAttachmentWidgetMutation =
    useDeleteAttachmentWidgetMutation(authToken);

  useEffect(() => {
    if (hasInitializedRef.current) return;
    if (!widgetIdsData) return;
    if (!authToken) return;

    const loadDashboardWidgets = async () => {
      try {
        const memoWidgetDataArray = await Promise.all(
          memoWidgetIds.map((id) => fetchMemoWidget(id, authToken)),
        );
        setWidgets([
          ...memoWidgetDataArray.map((data) => ({
            type: 'note' as const,
            id: String(data.id),
            memoWidgetId: data.id,
            title: data.title,
            content: data.content,
          })),
          ...attachmentWidgetIds.map((id) => ({
            type: 'file' as const,
            id: `attachment-${id}`,
            attachmentWidgetId: id,
          })),
        ]);
        hasInitializedRef.current = true;
      } catch {
        hasInitializedRef.current = true;
      }
    };

    loadDashboardWidgets();
  }, [memoWidgetIds, attachmentWidgetIds, widgetIdsData, authToken]);

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
    if (id === 'file') {
      if (!lessonId) return;
      createAttachmentWidgetMutation.mutate(
        { lessonId },
        {
          onSuccess: (createdAttachmentWidget) => {
            setWidgets((previous) => [
              ...previous,
              {
                type: 'file',
                id: `attachment-${createdAttachmentWidget.id}`,
                attachmentWidgetId: createdAttachmentWidget.id,
              },
            ]);
          },
        },
      );
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
    setWidgets((previous) =>
      previous.map((widget) =>
        widget.id === widgetId && widget.type === 'quiz'
          ? { ...widget, isEnded: true }
          : widget,
      ),
    );
  }

  function handleDeleteAttachmentWidget(widget: AttachmentDashboardWidget) {
    deleteAttachmentWidgetMutation.mutate(widget.attachmentWidgetId, {
      onSuccess: () => {
        setWidgets((previous) =>
          previous.filter((item) => item.id !== widget.id),
        );
      },
    });
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
        return <MemoTeacher title={widget.title} content={widget.content} />;
      case 'file':
        return (
          <AttachmentWidgetCard
            attachmentWidgetId={widget.attachmentWidgetId}
            token={authToken}
            onDeleteWidget={() => handleDeleteAttachmentWidget(widget)}
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
      <MemoCreate
        isOpen={isMemoCreateOpen}
        onClose={handleCloseMemoCreateModal}
        onSubmit={handleMemoSubmit}
      />
    </div>
  );
}

export default DashBoardPage;
