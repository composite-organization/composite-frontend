import type { ChangeEvent } from 'react';
import { useState } from 'react';

interface UseFormInputProps {
  initialValue?: string;
  validator?: (value: string) => boolean;
}

export function useFormInput({
  initialValue = '',
  validator,
}: UseFormInputProps = {}) {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
    setIsTouched(true);
  };

  const isValid = validator ? validator(value) : true;

  const showError = !isFocused && isTouched && !isValid;

  const reset = () => {
    setValue(initialValue);
    setIsTouched(false);
    setIsFocused(false);
  };

  return {
    value,
    onChange,
    onFocus,
    onBlur,
    state: (showError ? 'error' : 'default') as 'error' | 'default',
    isValid,
    showError,
    reset,
  };
}
