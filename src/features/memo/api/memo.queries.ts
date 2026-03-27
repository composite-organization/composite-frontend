import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMemoWidget, type CreateMemoWidgetRequest } from './memo.api';

export function useCreateMemoWidgetMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateMemoWidgetRequest) => createMemoWidget(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memo'] });
    },
  });
}
