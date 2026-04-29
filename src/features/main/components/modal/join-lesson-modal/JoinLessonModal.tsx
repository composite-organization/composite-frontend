import { useFormInput } from '@/features/main/hooks/useFormInput';
import Modal from '@/shared/components/ui/modal/Modal';
import Input from '@/shared/components/ui/input/Input';
import Button from '@/shared/components/ui/button/Button';
import {
  validateStudentName,
  VALIDATION_MESSAGES,
} from '@/features/main/utils/validation';

interface JoinLessonModalProps {
  lessonCode: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (payload: { studentName: string; lessonCode: string }) => void;
}

function JoinLessonModal({
  lessonCode,
  isOpen,
  onClose,
  onSubmit,
}: JoinLessonModalProps) {
  const studentNameInput = useFormInput({ validator: validateStudentName });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentNameInput.isValid) {
      onSubmit?.({
        studentName: studentNameInput.value.trim(),
        lessonCode,
      });
      studentNameInput.reset();
    }
  };

  return (
    <Modal title="수업 참여하기" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleFormSubmit} className="flex flex-col w-full gap-8">
        <div className="flex flex-col gap-1.5">
          <Input
            {...studentNameInput}
            title="학생명"
            placeholder="예: 홍길동"
          />
          {studentNameInput.showError && (
            <span className="label-regular text-red-500 ml-1">
              {VALIDATION_MESSAGES.STUDENT_NAME}
            </span>
          )}
        </div>
        <Button
          type="submit"
          variant="blue"
          size="xl"
          disabled={!studentNameInput.isValid}
        >
          수업 참여하기
        </Button>
      </form>
    </Modal>
  );
}

export default JoinLessonModal;
