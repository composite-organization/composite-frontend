import React from 'react';
import Input from '@/shared/components/ui/input/Input';
import IconButton from '@/shared/components/ui/icon-button/IconButton';

interface EntranceFormProps {
  description: string;
  title: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAction?: () => void;
}

function EntranceForm({
  description,
  title,
  placeholder,
  value,
  onChange,
  onAction,
}: EntranceFormProps) {
  return (
    <div className="flex flex-col gap-[10px] w-full">
      <div className="body-regular text-black-300">{description}</div>
      <div className="h3-semibold text-black-500">{title}</div>
      <div className="flex w-full gap-3">
        <Input
          state="default"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          wrapperClassName="h-12 py-0"
        />
        <IconButton
          shape="square"
          iconName="add"
          className="h-12 w-[75px] bg-blue-300"
          onClick={onAction}
        />
      </div>
    </div>
  );
}
export default EntranceForm;
