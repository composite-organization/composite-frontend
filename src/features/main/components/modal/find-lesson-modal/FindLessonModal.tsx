import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from '@/shared/components/ui/modal/Modal';
import Input from '@/shared/components/ui/input/Input';
import Button from '@/shared/components/ui/button/Button';

const findSchema = z.object({
  password: z.string().trim().min(6, '비밀번호는 6자 이상입니다'),
});

type FindFormValues = z.infer<typeof findSchema>;

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
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FindFormValues>({
    resolver: zodResolver(findSchema),
    defaultValues: {
      password: '',
    },
    mode: 'onChange',
  });

  const onFormSubmit = handleSubmit((data) => {
    onSubmit?.({
      password: data.password.trim(),
      lessonCode,
    });
    // console.log(data);
  });

  return (
    <Modal title="내 수업 찾기" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={onFormSubmit} className="flex flex-col w-full gap-8">
        <Input
          type="password"
          state="default"
          title="2차 비밀번호"
          {...register('password')}
        />
        <Button type="submit" variant="blue" size="xl" disabled={!isValid}>
          수업 참여하기
        </Button>
      </form>
    </Modal>
  );
}
export default FindLessonModal;
