import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '@/shared/components/ui/input/Input';
import IconButton from '@/shared/components/ui/icon-button/IconButton';

const lessonCodeSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, '수업 코드를 입력해주세요.')
    .regex(/^[A-Z0-9]{8}$/, '수업 코드는 영문 대문자와 숫자 8자리여야 합니다.'),
});

type LessonCodeFormValues = z.infer<typeof lessonCodeSchema>;

interface EntranceFormProps {
  id: string;
  description: string;
  title: string;
  placeholder: string;
  onSubmitCode: (code: string) => void;
}

function EntranceForm({
  id,
  description,
  title,
  placeholder,
  onSubmitCode,
}: EntranceFormProps) {
  const { register, handleSubmit } = useForm<LessonCodeFormValues>({
    resolver: zodResolver(lessonCodeSchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = handleSubmit(
    (data) => {
      onSubmitCode(data.code.trim());
    },
    (error) => {
      alert(error.code?.message ?? '입력값이 올바르지 않습니다');
    },
  );

  return (
    <form className="flex flex-col gap-2.5 w-full" onSubmit={onSubmit}>
      <div className="body-regular text-black-300">{description}</div>
      <label htmlFor={id} className="h3-semibold text-black-500">
        {title}
      </label>
      <div className="flex w-full gap-3">
        <Input
          id={id}
          state="default"
          placeholder={placeholder}
          {...register('code')}
          wrapperClassName="h-12 py-0"
        />
        <IconButton
          type="submit"
          shape="square"
          iconName="add"
          className="h-12 w-[75px] bg-blue-300"
        />
      </div>
    </form>
  );
}
export default EntranceForm;
