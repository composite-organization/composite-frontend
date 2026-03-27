import { useFormInput } from '@/features/main/hooks/useFormInput';
import Modal from '@/shared/components/ui/modal/Modal';
import Input from '@/shared/components/ui/input/Input';
import IconButton from '@/shared/components/ui/icon-button/IconButton';
import Button from '@/shared/components/ui/button/Button';
import {
  validateLessonName,
  validateTeacherName,
  VALIDATION_MESSAGES,
} from '@/features/main/utils/validation';

interface CreateLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonCode: string;
  onSubmit?: (payload: {
    lessonName: string;
    teacherName: string;
    lessonCode: string;
  }) => void;
}

function CreateLessonModal({
  isOpen,
  onClose,
  lessonCode,
  onSubmit,
}: CreateLessonModalProps) {
  const lessonNameInput = useFormInput({ validator: validateLessonName });
  const teacherNameInput = useFormInput({ validator: validateTeacherName });

  const handleCopyLessonCode = async () => {
    await navigator.clipboard.writeText(lessonCode);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lessonNameInput.isValid && teacherNameInput.isValid) {
      onSubmit?.({
        lessonName: lessonNameInput.value.trim(),
        teacherName: teacherNameInput.value.trim(),
        lessonCode,
      });
      lessonNameInput.reset();
      teacherNameInput.reset();
    }
  };

  const isValid = lessonNameInput.isValid && teacherNameInput.isValid;

  return (
    <Modal title="수업 만들기" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleFormSubmit} className="flex flex-col w-full gap-8">
        <div className="flex flex-col gap-1.5">
          <Input
            {...lessonNameInput}
            title="수업명"
            placeholder="예: 미적분학 1"
          />
          {lessonNameInput.showError && (
            <span className="label-regular text-red-500 ml-1">
              {VALIDATION_MESSAGES.LESSON_NAME}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Input
            {...teacherNameInput}
            title="수업자명"
            placeholder="예: 홍길동"
          />
          {teacherNameInput.showError && (
            <span className="label-regular text-red-500 ml-1">
              {VALIDATION_MESSAGES.TEACHER_NAME}
            </span>
          )}
        </div>

        <div>
          <div className="flex items-end gap-5">
            <Input
              state="disabled"
              title="수업코드"
              value={lessonCode}
              readOnly
            />
            <IconButton
              iconName="copy"
              onClick={handleCopyLessonCode}
              size="medium"
              className="w-16 h-[55px]"
              type="button"
            />
          </div>
          <span className="label-regular text-red-600">
            수업 코드 분실 시 수업 참여에 어려움이 발생할 수 있습니다!
          </span>
        </div>
        <Button type="submit" variant="blue" size="xl" disabled={!isValid}>
          수업 시작하기
        </Button>
      </form>
    </Modal>
  );
}

export default CreateLessonModal;
