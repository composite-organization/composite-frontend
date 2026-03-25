import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from '@/shared/components/ui/modal/Modal';
import Input from '@/shared/components/ui/input/Input';
import Button from '@/shared/components/ui/button/Button';

const joinSchema = z.object({
  studentName: z.string().trim().min(1, '이름을 입력해주세요.'),
});

type JoinFormValues = z.infer<typeof joinSchema>;

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
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<JoinFormValues>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      studentName: '',
    },
    mode: 'onChange',
  });

  const onFormSubmit = handleSubmit((data) => {
    onSubmit?.({
      studentName: data.studentName.trim(),
      lessonCode,
    });
    // console.log(data, lessonCode);
  });

  return (
    <Modal title="수업 참여하기" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={onFormSubmit} className="flex flex-col w-full gap-8">
        <Input
          state="default"
          title="학생명"
          placeholder="예: 홍길동"
          {...register('studentName')}
        />
        <Button type="submit" variant="blue" size="xl" disabled={!isValid}>
          수업 참여하기
        </Button>
      </form>
    </Modal>
  );
}
export default JoinLessonModal;
