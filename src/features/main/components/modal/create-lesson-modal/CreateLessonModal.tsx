import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from '@/shared/components/ui/modal/Modal';
import Input from '@/shared/components/ui/input/Input';
import IconButton from '@/shared/components/ui/icon-button/IconButton';
import Button from '@/shared/components/ui/button/Button';

const createLessonSchema = z.object({
  lessonName: z.string().trim().min(3, '수업명은 3자리 이상입니다.'),
  teacherName: z.string().trim().min(1, '수업자명을 입력해주세요'),
});

type CreateLessonFormValues = z.infer<typeof createLessonSchema>;

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
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<CreateLessonFormValues>({
    resolver: zodResolver(createLessonSchema),
    defaultValues: {
      lessonName: '',
      teacherName: '',
    },
    mode: 'onChange',
  });
  const handleCopyLessonCode = async () => {
    await navigator.clipboard.writeText(lessonCode);
  };
  const onFormSubmit = handleSubmit((data) => {
    onSubmit?.({
      lessonName: data.lessonName.trim(),
      teacherName: data.teacherName.trim(),
      lessonCode,
    });
  });

  return (
    <Modal title="수업 만들기" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={onFormSubmit} className="flex flex-col w-full gap-8">
        <Input
          state="default"
          title="수업명"
          placeholder="예: 미적분학 1"
          {...register('lessonName')}
        />
        <Input
          state="default"
          title="수업자명"
          placeholder="예: 홍길동"
          {...register('teacherName')}
        />
        <div>
          <div className="flex items-end gap-5">
            <Input state="disabled" title="수업코드" value={lessonCode} />
            <IconButton
              iconName="copy"
              onClick={handleCopyLessonCode}
              size="medium"
              className="w-12 h-12"
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
