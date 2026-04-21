import { useState } from 'react';
import { useParams } from 'react-router-dom';
import type { WidgetName } from '@/shared/types/widget.type';
import type { LectureMaterial } from '@/features/lecture-materials/types';
import type { VoteSelectionItem } from '@/features/vote/ui/blocks/SelectionList';
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

type SimpleWidget = {
  type: 'question' | 'note' | 'file';
  id: string;
};

type DashboardWidget = QuizWidget | VoteWidget | SimpleWidget;

function DashBoardPage() {
  const { lessonName = '', teacherName = '' } = useParams<{
    lessonName: string;
    teacherName: string;
  }>();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeCreateModal, setActiveCreateModal] = useState<WidgetName | null>(
    null,
  );
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);

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
    setWidgets((previous) => [
      ...previous,
      { type: id, id: crypto.randomUUID() },
    ]);
  }

  function handleCloseCreateModal() {
    setActiveCreateModal(null);
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

  function renderWidget(widget: DashboardWidget) {
    switch (widget.type) {
      case 'quiz':
        return (
          <QuizTeacher
            key={widget.id}
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
            key={widget.id}
            title={widget.title}
            description={widget.description}
            selections={widget.selections}
            options={widget.options}
          />
        );
      case 'question':
        return (
          <QuestionTeacher
            key={widget.id}
            questions={[]}
            currentPage={1}
            onPageChange={() => {}}
          />
        );
      case 'note':
        return <MemoTeacher key={widget.id} />;
      case 'file':
        return (
          <LectureMaterialsTeacher
            key={widget.id}
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
      <SiteHeader
        entryCode={lessonName}
        dashboardUrl={`/dashboard/${lessonName}/${teacherName}`}
        participantCount={0}
      />
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
    </div>
  );
}

export default DashBoardPage;
