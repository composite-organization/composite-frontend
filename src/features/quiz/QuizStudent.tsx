import { useState } from 'react';
import Modal from '@/shared/components/ui/modal/Modal';
import WidgetIcon from '@/shared/components/ui/widget-icon/WidgetIcon';
import Button from '@/shared/components/ui/button/Button';
import Icon from '@/shared/components/ui/icon/Icon';
import QuizSelection from './blocks/QuizSelection';
import QuizFooter from './blocks/QuizFooter';
import QuizResult from './blocks/QuizResult';

interface QuizStudentProps {
  question: string;
  choices: string[];
  participantCount: number;
  isEnded: boolean;
  correctRate?: number;
  isCorrect?: boolean;
  onSubmit: (selectedIndex: number) => void;
}

function QuizStudent({
  question,
  choices,
  participantCount,
  isEnded,
  correctRate = 0,
  isCorrect,
  onSubmit,
}: QuizStudentProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  function getSelectionState(
    index: number,
  ): 'default' | 'selected' | 'correct' | 'disabled' {
    if (isEnded) return 'disabled';
    if (selectedIndex === index) return 'selected';
    return 'default';
  }

  function handleSubmitConfirm() {
    if (selectedIndex !== null) {
      onSubmit(selectedIndex);
    }
    setIsSubmitModalOpen(false);
  }

  function handleCloseSubmitModal() {
    setIsSubmitModalOpen(false);
  }

  function handleCloseStatusModal() {
    setIsStatusModalOpen(false);
  }

  return (
    <div className="relative w-[520px]">
      <div className="flex flex-row items-center justify-between px-4 py-3 bg-white border border-black-200 rounded-t-[20px]">
        <div className="flex flex-row items-center gap-3">
          <WidgetIcon iconName="quiz" size={36} />
          <div className="flex flex-col gap-1">
            <span className="body-medium text-black-500">퀴즈</span>
            <span className="label-regular text-black-200">퀴즈 위젯</span>
          </div>
        </div>
        <button
          type="button"
          className="flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer hover:bg-black-50 transition-colors"
        >
          <Icon name="more" size={16} />
        </button>
      </div>

      <div className="flex flex-col gap-5 px-4 pt-4 pb-5 bg-black-0 border-x border-b border-black-200 rounded-b-[20px]">
        <p className="body-regular text-black-500">{question}</p>

        <div className="flex flex-col gap-5">
          {choices.map((choice, index) => (
            <button
              key={choice}
              type="button"
              disabled={isEnded}
              onClick={() => setSelectedIndex(index)}
              className="cursor-pointer disabled:cursor-not-allowed bg-transparent w-full"
            >
              <QuizSelection
                index={index + 1}
                content={choice}
                state={getSelectionState(index)}
              />
            </button>
          ))}
        </div>

        <QuizFooter
          statusSlot={
            <button
              type="button"
              onClick={() => setIsStatusModalOpen(true)}
              className="flex flex-row items-center gap-2 px-4 py-2 bg-black-50 rounded-[14px] label-regular text-black-500 cursor-pointer hover:bg-black-100 transition-colors"
            >
              <Icon name="PC" size={16} />
              <span>{participantCount}명 참여</span>
            </button>
          }
          actionSlot={
            <button
              type="button"
              disabled={isEnded}
              onClick={() => setIsSubmitModalOpen(true)}
              className="flex items-center justify-center px-5 py-[10px] rounded-[14px] label-medium text-black-0 transition-colors cursor-pointer disabled:bg-black-200 disabled:cursor-not-allowed bg-blue-300 hover:bg-blue-200"
            >
              제출
            </button>
          }
        />

        {isEnded && (
          <QuizResult
            correctRate={correctRate}
            isStudent
            isCorrect={isCorrect}
          />
        )}
      </div>

      {/* eslint-disable react/jsx-no-bind */}
      <Modal
        title="퀴즈 제출"
        isOpen={isSubmitModalOpen}
        onClose={handleCloseSubmitModal}
      >
        <p className="h3-semibold text-black-500">
          선택한 답안을 제출하시겠습니까?
        </p>
        <div className="flex flex-row items-center gap-9">
          <Button variant="cancel" size="xl" onClick={handleCloseSubmitModal}>
            취소
          </Button>
          <Button variant="blue" size="xl" onClick={handleSubmitConfirm}>
            제출
          </Button>
        </div>
      </Modal>

      <Modal
        title="참여 현황"
        isOpen={isStatusModalOpen}
        onClose={handleCloseStatusModal}
      >
        <p className="body-regular text-black-500">
          현재 {participantCount}명이 참여 중입니다.
        </p>
      </Modal>
      {/* eslint-enable react/jsx-no-bind */}
    </div>
  );
}

export default QuizStudent;
