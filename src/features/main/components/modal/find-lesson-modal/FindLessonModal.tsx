import { useFormInput } from '@/features/main/hooks/useFormInput';
import Modal from '@/shared/components/ui/modal/Modal';
import Input from '@/shared/components/ui/input/Input';
import Button from '@/shared/components/ui/button/Button';
import {
  validatePassword,
  VALIDATION_MESSAGES,
} from '@/features/main/utils/validation';

interface FindLessonModalProps {
  lessonCode: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (payload: { password: string; lessonCode: string }) => void;
}

function FindLessonModal({
  lessonCode,
  isOpen,
  onClose,
  onSubmit,
}: FindLessonModalProps) {
  const passwordInput = useFormInput({ validator: validatePassword });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.isValid) {
      onSubmit?.({
        password: passwordInput.value.trim(),
        lessonCode,
      });
      passwordInput.reset();
    }
  };

  return (
    <Modal title="내 수업 찾기" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleFormSubmit} className="flex flex-col w-full gap-8">
        <div className="flex flex-col gap-1.5">
          <Input type="password" {...passwordInput} title="2차 비밀번호" />
          {passwordInput.showError && (
            <span className="label-regular text-red-500 ml-1">
              {VALIDATION_MESSAGES.PASSWORD}
            </span>
          )}
        </div>
        <Button
          type="submit"
          variant="blue"
          size="xl"
          disabled={!passwordInput.isValid}
        >
          수업 찾기
        </Button>
      </form>
    </Modal>
  );
}

export default FindLessonModal;
