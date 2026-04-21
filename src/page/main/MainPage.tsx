import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WIDGET_DATA } from '@/features/main/data/widgetData';
import EntranceSection from '@/features/main/components/ui/entrance-section/EntranceSection';
import HeroSection from '@/features/main/components/ui/hero-section/HeroSection';
import SectionDivider from '@/features/main/components/ui/section-divider/SectionDivider';
import WidgetDescriptionCard from '@/features/main/components/ui/widget-description-card/WidgetDescriptionCard';
import VideoSection from '@/features/main/components/ui/video-section/VideoSection';
import JoinLessonModal from '@/features/main/components/modal/join-lesson-modal/JoinLessonModal';
import FindLessonModal from '@/features/main/components/modal/find-lesson-modal/FindLessonModal';
import CreateLessonModal from '@/features/main/components/modal/create-lesson-modal/CreateLessonModal';

type SelectedId = 'note' | 'file' | 'quiz' | 'vote' | 'question';
type ModalType = 'join' | 'find' | 'create' | null;

export default function MainPage() {
  const navigate = useNavigate();
  const [selectedWidgetId, setSelectedWidgetId] =
    useState<SelectedId>('question');
  const [openedModal, setOpenedModal] = useState<ModalType>(null);

  const [submittedJoinCode, setSubmittedJoinCode] = useState('');
  const [submittedFindCode, setSubmittedFindCode] = useState('');
  const [lessonCode, setLessonCode] = useState<string>('');

  const handleCloseModal = () => {
    setOpenedModal(null);
  };
  const handleJoin = (code: string) => {
    setSubmittedJoinCode(code);
    setOpenedModal('join');
  };
  const handleFind = (code: string) => {
    setSubmittedFindCode(code);
    setOpenedModal('find');
  };
  const handleCreateCode = () => {
    setLessonCode('ABCD1234');
    setOpenedModal('create');
  };

  const handleCreateSubmit = (payload: {
    lessonName: string;
    teacherName: string;
    password: string;
    lessonCode: string;
  }) => {
    navigate(`/dashboard/${payload.lessonName}/${payload.teacherName}`);
  };

  return (
    <main className="flex px-30 py-10">
      <div className="flex flex-col items-center  w-[1508px] gap-20">
        <section className="flex w-full h-155 gap-30 justify-between">
          <div className="flex flex-1">
            <VideoSection
              className="h-full w-full"
              selectedId={selectedWidgetId}
            />
          </div>
          <div className="flex flex-col justify-between w-[500px]">
            <HeroSection />
            <EntranceSection
              onJoin={handleJoin}
              onFind={handleFind}
              onCreate={handleCreateCode}
            />
          </div>
        </section>
        <section className="flex flex-col gap-8 w-full">
          <SectionDivider
            className="flex items-center"
            text="카드를 클릭해 위젯 기능을 미리 확인해보세요"
          />
          <div className="flex justify-between w-full">
            {WIDGET_DATA.map((widget) => (
              <WidgetDescriptionCard
                key={widget.id}
                iconName={widget.id}
                title={widget.title}
                description={widget.description}
                isSelected={selectedWidgetId === widget.id}
                onClick={() => setSelectedWidgetId(widget.id)}
              />
            ))}
          </div>
        </section>
      </div>
      {openedModal === 'join' && (
        <JoinLessonModal
          lessonCode={submittedJoinCode}
          isOpen
          onClose={handleCloseModal}
        />
      )}
      {openedModal === 'find' && (
        <FindLessonModal
          lessonCode={submittedFindCode}
          isOpen
          onClose={handleCloseModal}
        />
      )}
      {openedModal === 'create' && (
        <CreateLessonModal
          isOpen
          onClose={handleCloseModal}
          lessonCode={lessonCode}
          onSubmit={handleCreateSubmit}
        />
      )}
    </main>
  );
}
