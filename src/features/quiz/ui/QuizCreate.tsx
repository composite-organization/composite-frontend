import { useEffect, useState } from 'react';
import Modal from '@/shared/components/ui/modal/Modal';
import Input from '@/shared/components/ui/input/Input';
import Button from '@/shared/components/ui/button/Button';
import Icon from '@/shared/components/ui/icon/Icon';

export interface QuizCreateData {
  question: string;
  correctAnswerIndex: number;
  choices: string[];
}

interface ChoiceItem {
  id: number;
  value: string;
}

let nextChoiceId = 0;

function createChoiceItem(value: string = ''): ChoiceItem {
  nextChoiceId += 1;
  return { id: nextChoiceId, value };
}

interface QuizCreateChoiceRowProps {
  item: ChoiceItem;
  index: number;
  onDelete: (id: number) => void;
  onChange: (id: number, value: string) => void;
}

function QuizCreateChoiceRow({
  item,
  index,
  onDelete,
  onChange,
}: QuizCreateChoiceRowProps) {
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(item.id, event.target.value);
  }

  function handleDelete() {
    onDelete(item.id);
  }

  return (
    <div className="flex flex-row items-center gap-1">
      <Input
        placeholder={`선택지 ${index + 1}`}
        value={item.value}
        onChange={handleInputChange}
        wrapperClassName="flex-1"
      />
      <button
        type="button"
        onClick={handleDelete}
        className="flex items-center justify-center w-9 h-12 bg-black-0 rounded-[20px] cursor-pointer hover:bg-black-50 transition-colors"
      >
        <Icon name="close" size={12} />
      </button>
    </div>
  );
}

interface QuizCreateProps {
  initialData?: QuizCreateData;
  isOpen: boolean;
  modalTitle?: string;
  onClose: () => void;
  onSubmit: (data: QuizCreateData) => void;
  questionDisabled?: boolean;
  submitLabel?: string;
}

function createChoiceItems(values: string[]): ChoiceItem[] {
  return values.map((value) => createChoiceItem(value));
}

function isValidAnswerIndex(value: string, choices: ChoiceItem[]): boolean {
  const index = parseInt(value, 10) - 1;
  return Number.isInteger(index) && index >= 0 && index < choices.length;
}

function QuizCreate({
  initialData,
  isOpen,
  modalTitle = '퀴즈',
  onClose,
  onSubmit,
  questionDisabled = false,
  submitLabel = '생성',
}: QuizCreateProps) {
  const [question, setQuestion] = useState('');
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState('');
  const [choices, setChoices] = useState<ChoiceItem[]>([
    createChoiceItem(),
    createChoiceItem(),
    createChoiceItem(),
  ]);

  useEffect(() => {
    if (!isOpen) return;

    setQuestion(initialData?.question ?? '');
    setCorrectAnswerIndex(
      initialData ? String(initialData.correctAnswerIndex + 1) : '',
    );
    setChoices(
      initialData
        ? createChoiceItems(initialData.choices)
        : [createChoiceItem(), createChoiceItem(), createChoiceItem()],
    );
  }, [initialData, isOpen]);

  function handleQuestionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuestion(event.target.value);
  }

  function handleCorrectAnswerIndexChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setCorrectAnswerIndex(event.target.value);
  }

  function handleChoiceDelete(id: number) {
    setChoices((previous) => previous.filter((choice) => choice.id !== id));
  }

  function handleChoiceChange(id: number, value: string) {
    setChoices((previous) =>
      previous.map((choice) =>
        choice.id === id ? { ...choice, value } : choice,
      ),
    );
  }

  function handleChoiceAdd() {
    setChoices((previous) => [...previous, createChoiceItem()]);
  }

  function handleSubmit() {
    const parsedCorrectAnswerIndex = parseInt(correctAnswerIndex, 10) - 1;
    if (!isValidAnswerIndex(correctAnswerIndex, choices)) return;

    onSubmit({
      question: question.trim(),
      correctAnswerIndex: parsedCorrectAnswerIndex,
      choices: choices.map((item) => item.value.trim()),
    });
    setQuestion('');
    setCorrectAnswerIndex('');
    setChoices([createChoiceItem(), createChoiceItem(), createChoiceItem()]);
  }

  return (
    <Modal title={modalTitle} isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-5.5 w-full mt-4">
        <Input
          title="질문"
          placeholder="질문을 입력하세요"
          value={question}
          onChange={handleQuestionChange}
          state={questionDisabled ? 'disabled' : 'default'}
        />

        <Input
          title="정답"
          placeholder="정답 번호를 입력하세요 (예: 2)"
          value={correctAnswerIndex}
          onChange={handleCorrectAnswerIndexChange}
        />

        <div className="flex flex-col gap-1.5 w-full">
          <span className="h3-semibold text-black-500">선택지</span>
          <div className="flex flex-col gap-1.5">
            {choices.map((item, index) => (
              <QuizCreateChoiceRow
                key={item.id}
                item={item}
                index={index}
                onDelete={handleChoiceDelete}
                onChange={handleChoiceChange}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={handleChoiceAdd}
            className="flex flex-row items-center justify-center gap-2 w-full h-12 bg-black-50 rounded-[20px] body-semibold text-black-500 cursor-pointer hover:bg-black-100 transition-colors mt-1.5"
          >
            <Icon name="add" size={16} />
            추가
          </button>
        </div>
      </div>

      <div className="flex flex-row items-center gap-4 w-full">
        <Button variant="cancel" size="lg" className="flex-1" onClick={onClose}>
          취소
        </Button>
        <Button
          variant="blue"
          size="lg"
          className="flex-1"
          onClick={handleSubmit}
          disabled={
            !question.trim() ||
            choices.some((choice) => !choice.value.trim()) ||
            !isValidAnswerIndex(correctAnswerIndex, choices)
          }
        >
          {submitLabel}
        </Button>
      </div>
    </Modal>
  );
}

export default QuizCreate;
