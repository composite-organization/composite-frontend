import { useState } from 'react';
import Input from '@/shared/components/ui/input/Input';
import IconButton from '@/shared/components/ui/icon-button/IconButton';
import { validateLessonCode } from '@/features/main/utils/validation';

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
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLessonCode(code)) {
      onSubmitCode(code.trim());
      setCode('');
    }
  };

  return (
    <form className="flex flex-col gap-2.5 w-full" onSubmit={handleSubmit}>
      <div className="body-regular text-black-300">{description}</div>
      <label htmlFor={id} className="h3-semibold text-black-500">
        {title}
      </label>
      <div className="flex w-full gap-3">
        <Input
          id={id}
          state="default"
          placeholder={placeholder}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          wrapperClassName="h-12 py-0"
        />
        <IconButton
          type="submit"
          shape="square"
          iconName="add"
          className="h-12 w-[75px] bg-blue-300 hover:bg-blue-200"
          iconClassName="invert"
          disabled={!validateLessonCode(code)}
        />
      </div>
    </form>
  );
}

export default EntranceForm;
