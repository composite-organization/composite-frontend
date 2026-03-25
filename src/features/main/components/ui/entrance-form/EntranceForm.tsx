import React from 'react';
import Input from '@/shared/components/ui/input/Input';
import IconButton from '@/shared/components/ui/icon-button/IconButton';

interface EntranceFormProps {
  id: string;
  description: string;
  title: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAction?: () => void;
}

function EntranceForm({
  id,
  description,
  title,
  placeholder,
  value,
  onChange,
  onAction,
}: EntranceFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAction?.();
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
          value={value}
          onChange={onChange}
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
