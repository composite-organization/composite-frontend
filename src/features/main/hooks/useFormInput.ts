import type { ChangeEvent } from 'react';
import { useState, useCallback } from 'react';

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

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [],
  );

  const onFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsFocused(false);
    setIsTouched(true);
  }, []);

  const isValid = validator ? validator(value) : true;

  const showError = !isFocused && isTouched && !isValid;

  const reset = useCallback(() => {
    setValue(initialValue);
    setIsTouched(false);
    setIsFocused(false);
  }, [initialValue]);

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
