import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DashboardHeader from '@/shared/components/widget/dashboard-header/DashboardHeader';
import { WIDGET_DATA } from '@/features/main/data/widgetData';
import EntranceSection from '@/features/main/components/ui/entrance-section/EntranceSection';
import HeroSection from '@/features/main/components/ui/hero-section/HeroSection';
import SectionDivider from '@/features/main/components/ui/section-divider/SectionDivider';
import WidgetDescriptionCard from '@/features/main/components/ui/widget-description-card/WidgetDescriptionCard';
import VideoSection from '@/features/main/components/ui/video-section/VideoSection';
import JoinLessonModal from '@/features/main/components/modal/join-lesson-modal/JoinLessonModal';
import FindLessonModal from '@/features/main/components/modal/find-lesson-modal/FindLessonModal';
import CreateLessonModal from '@/features/main/components/modal/create-lesson-modal/CreateLessonModal';
import { useCreateLessonMutation } from '@/features/lesson/api/lesson.queries';
import {
  authenticateLesson,
  joinLessonAsStudent,
} from '@/features/lesson/api/lesson.api';
import { getGuestToken } from '@/features/guest/api/guest.api';

type SelectedId = 'note' | 'file' | 'quiz' | 'vote' | 'question';
type ModalType = 'join' | 'find' | 'create' | null;

function generateLessonCode(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i += 1) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

export default function MainPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedWidgetId, setSelectedWidgetId] =
    useState<SelectedId>('question');
  const [openedModal, setOpenedModal] = useState<ModalType>(null);

  const [submittedJoinCode, setSubmittedJoinCode] = useState('');
  const [submittedFindCode, setSubmittedFindCode] = useState('');
  const [lessonCode, setLessonCode] = useState<string>('');

  const createLessonMutation = useCreateLessonMutation();

  useEffect(() => {
    const lessonCodeParam = searchParams.get('lessonCode');
    if (lessonCodeParam) {
      setSubmittedJoinCode(lessonCodeParam);
      setOpenedModal('join');
    }
  }, [searchParams]);

  useEffect(() => {
    if (createLessonMutation.isSuccess && createLessonMutation.data) {
      const lesson = createLessonMutation.data;
      navigate(`/dashboard/teacher/${lessonCode}/${lesson.lessonId}`);
    }
  }, [
    createLessonMutation.isSuccess,
    createLessonMutation.data,
    navigate,
    lessonCode,
  ]);

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
    setLessonCode(generateLessonCode());
    setOpenedModal('create');
  };

  const handleJoinSubmit = async (payload: {
    studentName: string;
    lessonCode: string;
  }) => {
    try {
      const guestCredentialsResponse = await getGuestToken({
        name: payload.studentName,
      });
      localStorage.setItem('authToken', guestCredentialsResponse.token);
      const { lessonId } = await joinLessonAsStudent(
        payload.lessonCode,
        { name: payload.studentName },
        guestCredentialsResponse.token,
      );
      navigate(`/dashboard/student/${payload.lessonCode}/${lessonId}`);
    } catch {
      // eslint-disable-next-line no-empty
    }
  };

  const handleFindSubmit = async (payload: {
    password: string;
    lessonCode: string;
  }) => {
    try {
      const authResponse = await authenticateLesson({
        lessonCode: payload.lessonCode,
        password: payload.password,
      });
      localStorage.setItem('lessonAuthToken', authResponse.token);
      localStorage.setItem('authToken', authResponse.token);
      navigate(
        `/dashboard/teacher/${payload.lessonCode}/${authResponse.lessonId}`,
      );
    } catch {
      // eslint-disable-next-line no-empty
    }
  };

  const handleCreateSubmit = async (payload: {
    lessonName: string;
    teacherName: string;
    password: string;
    lessonCode: string;
  }) => {
    try {
      const guestCredentialsResponse = await getGuestToken({
        name: payload.teacherName,
      });
      localStorage.setItem('authToken', guestCredentialsResponse.token);
      createLessonMutation.mutate({
        body: {
          teacherName: payload.teacherName,
          lessonName: payload.lessonName,
          lessonCode: payload.lessonCode,
          password: payload.password,
        },
        guestToken: guestCredentialsResponse.token,
      });
    } catch {
      // eslint-disable-next-line no-empty
    }
  };

  return (
    <div className="flex flex-col w-full">
      <DashboardHeader logoOnly />
      <main className="flex w-full justify-center px-30 py-10">
        <div className="flex flex-col items-center w-full gap-20">
          <section className="flex w-full gap-30 justify-between items-stretch">
            <div className="flex flex-1 min-w-0">
              <VideoSection
                className="h-full w-full"
                selectedId={selectedWidgetId}
              />
            </div>
            <div className="flex flex-col gap-20 w-auto shrink-0">
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
            <div className="flex gap-9 w-full">
              {WIDGET_DATA.map((widget) => (
                <WidgetDescriptionCard
                  key={widget.id}
                  iconName={widget.id}
                  title={widget.title}
                  description={widget.description}
                  isSelected={selectedWidgetId === widget.id}
                  onClick={() => setSelectedWidgetId(widget.id)}
                  className="flex-1"
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
            onSubmit={handleJoinSubmit}
          />
        )}
        {openedModal === 'find' && (
          <FindLessonModal
            lessonCode={submittedFindCode}
            isOpen
            onClose={handleCloseModal}
            onSubmit={handleFindSubmit}
          />
        )}
        {openedModal === 'create' && (
          <CreateLessonModal
            isOpen
            onClose={handleCloseModal}
            lessonCode={lessonCode}
            isLoading={createLessonMutation.isPending}
            error={createLessonMutation.error?.message || null}
            onSubmit={handleCreateSubmit}
          />
        )}
      </main>
    </div>
  );
}
