import { useState } from 'react';
import Modal from '@/shared/components/ui/modal/Modal';
import { TeacherWidgetContainer } from '@/shared/components/widget/widget-container/WidgetContainer';
import Button from '@/shared/components/ui/button/Button';
import QuizSelection from './blocks/QuizSelection';
import QuizFooter from './blocks/QuizFooter';
import QuizResult from './blocks/QuizResult';

interface ParticipantStatus {
  choiceIndex: number;
  participants: string[];
}

interface QuizTeacherProps {
  question: string;
  choices: string[];
  correctIndex: number;
  participantCount: number;
  isEnded: boolean;
  correctRate?: number;
  participantStatuses?: ParticipantStatus[];
  onDelete?: () => void;
  onEdit?: () => void;
  onEnd: () => void;
}

function QuizTeacher({
  question,
  choices,
  correctIndex,
  participantCount,
  isEnded,
  correctRate = 0,
  participantStatuses = [],
  onDelete,
  onEdit,
  onEnd,
}: QuizTeacherProps) {
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [isStatusPopupOpen, setIsStatusPopupOpen] = useState(false);

  function getSelectionState(
    index: number,
  ): 'default' | 'selected' | 'correct' | 'disabled' {
    if (index === correctIndex) return 'correct';
    return 'default';
  }

  function handleEndConfirm() {
    onEnd();
    setIsEndModalOpen(false);
  }

  function handleCloseEndModal() {
    setIsEndModalOpen(false);
  }

  return (
    <div className="relative w-130">
      <TeacherWidgetContainer
        iconName="quiz"
        title="퀴즈"
        description="퀴즈 위젯"
        onDeleteClick={onDelete}
        onEditClick={onEdit}
      >
        <div className="flex flex-col gap-5 px-4 pt-4 pb-5">
          <p className="body-regular text-black-500">{question}</p>

          <div className="flex flex-col gap-2.5">
            {choices.map((choice, index) => (
              <QuizSelection
                key={choice}
                index={index + 1}
                content={choice}
                state={getSelectionState(index)}
              />
            ))}
          </div>

          <QuizFooter
            statusSlot={
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsStatusPopupOpen(!isStatusPopupOpen)}
                  className="flex flex-row items-center gap-2 px-4 py-2 bg-black-50 rounded-[14px] label-regular text-black-500 cursor-pointer hover:bg-black-100 transition-colors"
                >
                  <svg
                    width="16"
                    height="12"
                    viewBox="0 0 16 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.33301 3.47317C2.33314 2.87434 2.49682 2.28572 2.80817 1.76441C3.11951 1.24311 3.56794 0.80683 4.10995 0.497916C4.65195 0.189001 5.26912 0.0179413 5.90157 0.00133611C6.53401 -0.0152691 7.16026 0.123144 7.71952 0.403144C8.27879 0.683144 8.75209 1.09522 9.09348 1.59939C9.43488 2.10355 9.63279 2.68269 9.66799 3.28059C9.7032 3.87848 9.57451 4.47485 9.29442 5.0118C9.01433 5.54874 8.59234 6.00805 8.06941 6.34513C9.19554 6.73606 10.1723 7.43702 10.874 8.35778C11.5757 9.27855 11.9701 10.377 12.0067 11.5118C12.0051 11.6341 11.9537 11.7512 11.8631 11.8384C11.7725 11.9257 11.6498 11.9765 11.5206 11.9802C11.3914 11.9839 11.2656 11.9401 11.1697 11.8581C11.0737 11.7761 11.015 11.6622 11.0057 11.5402C10.9659 10.3094 10.4215 9.14172 9.48761 8.28446C8.55376 7.42719 7.30395 6.94776 6.00301 6.94776C4.70208 6.94776 3.45226 7.42719 2.51842 8.28446C1.58457 9.14172 1.04009 10.3094 1.00035 11.5402C0.993666 11.6639 0.936068 11.7802 0.839893 11.8642C0.743718 11.9481 0.616616 11.9931 0.485815 11.9895C0.355015 11.9859 0.23092 11.9339 0.140115 11.8447C0.0493107 11.7555 -0.000980916 11.6362 1.44997e-05 11.5124C0.0364184 10.3775 0.430849 9.27894 1.13254 8.35805C1.83422 7.43715 2.81105 6.7361 3.93728 6.34513C3.44284 6.02641 3.0382 5.59813 2.75859 5.09758C2.47899 4.59703 2.33289 4.03937 2.33301 3.47317ZM6.00335 0.946702C5.29539 0.946702 4.61644 1.21288 4.11584 1.68669C3.61525 2.16049 3.33401 2.80311 3.33401 3.47317C3.33401 4.14323 3.61525 4.78585 4.11584 5.25965C4.61644 5.73346 5.29539 5.99964 6.00335 5.99964C6.7113 5.99964 7.39025 5.73346 7.89085 5.25965C8.39145 4.78585 8.67268 4.14323 8.67268 3.47317C8.67268 2.80311 8.39145 2.16049 7.89085 1.68669C7.39025 1.21288 6.7113 0.946702 6.00335 0.946702ZM11.5355 3.47317C11.4372 3.47317 11.3407 3.47949 11.2459 3.49212C11.1798 3.50333 11.1119 3.50182 11.0464 3.48766C10.9808 3.47351 10.919 3.44701 10.8645 3.40975C10.81 3.37248 10.7641 3.32521 10.7293 3.27076C10.6945 3.21631 10.6717 3.15579 10.6622 3.09281C10.6527 3.02984 10.6567 2.9657 10.674 2.90421C10.6912 2.84273 10.7214 2.78516 10.7627 2.73495C10.8039 2.68474 10.8555 2.64291 10.9142 2.61196C10.9729 2.58101 11.0376 2.56157 11.1044 2.5548C11.7682 2.46397 12.4449 2.58461 13.0283 2.89772C13.6116 3.21083 14.0684 3.69864 14.3267 4.28437C14.5851 4.87011 14.6303 5.52052 14.4553 6.13325C14.2803 6.74598 13.895 7.28624 13.36 7.669C14.1464 8.00227 14.8141 8.54379 15.2825 9.22823C15.751 9.91267 16.0001 10.7108 16 11.5263C16 11.6519 15.9473 11.7724 15.8534 11.8613C15.7595 11.9501 15.6322 12 15.4995 12C15.3668 12 15.2395 11.9501 15.1456 11.8613C15.0517 11.7724 14.999 11.6519 14.999 11.5263C14.9992 10.8214 14.7594 10.1353 14.3151 9.56956C13.8708 9.00387 13.2457 8.58879 12.5325 8.38589L12.1762 8.28483V7.22624L12.4498 7.09423C12.8554 6.89978 13.1799 6.58164 13.3709 6.19117C13.562 5.8007 13.6084 5.36068 13.5027 4.94216C13.3971 4.52363 13.1454 4.15103 12.7885 3.8845C12.4316 3.61796 11.9902 3.47306 11.5355 3.47317Z"
                      fill="black"
                    />
                  </svg>
                  <span>현황</span>
                </button>
                {isStatusPopupOpen && (
                  <div className="absolute bottom-full left-0 mb-2 bg-black-0 border border-black-100 rounded-2xl px-5 py-3 shadow-md min-w-45 z-10">
                    <div className="flex flex-col gap-2">
                      {participantStatuses.map((status) => (
                        <p
                          key={status.choiceIndex}
                          className="description-regular text-black-500"
                        >
                          {status.choiceIndex + 1}:{' '}
                          {status.participants.join(', ')}
                        </p>
                      ))}
                    </div>
                    <p className="description-regular text-black-200 mt-2">
                      {participantCount}명 참여
                    </p>
                  </div>
                )}
              </div>
            }
            actionSlot={
              <button
                type="button"
                disabled={isEnded}
                onClick={() => setIsEndModalOpen(true)}
                className="flex items-center justify-center px-5 py-2.5 rounded-[14px] label-medium text-black-0 transition-colors cursor-pointer disabled:bg-black-200 disabled:cursor-not-allowed bg-blue-300 hover:bg-blue-200"
              >
                종료
              </button>
            }
          />

          {isEnded && (
            <QuizResult
              correctRate={correctRate}
              correctAnswerIndex={correctIndex + 1}
            />
          )}
        </div>
      </TeacherWidgetContainer>

      <Modal
        title="퀴즈 종료"
        isOpen={isEndModalOpen}
        onClose={handleCloseEndModal}
      >
        <p className="h3-semibold text-black-500">퀴즈를 종료하시겠습니까?</p>
        <div className="flex flex-row items-center w-full gap-9">
          <Button
            variant="cancel"
            size="xl"
            className="flex-1"
            onClick={handleCloseEndModal}
          >
            취소
          </Button>
          <Button
            variant="blue"
            size="xl"
            className="flex-1"
            onClick={handleEndConfirm}
          >
            종료
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default QuizTeacher;
