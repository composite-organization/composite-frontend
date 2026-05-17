import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createMemoWidget,
  deleteMemoWidget,
  fetchMemoWidget,
  updateMemoWidget,
  type CreateMemoWidgetRequest,
  type UpdateMemoWidgetRequest,
} from './memo.api';

export function useCreateMemoWidgetMutation(token: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateMemoWidgetRequest) =>
      createMemoWidget(body, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memo'] });
    },
  });
}

export function useMemoWidgetQuery(memoWidgetId: number, token: string) {
  return useQuery({
    queryKey: ['memo', 'detail', memoWidgetId],
    queryFn: () => fetchMemoWidget(memoWidgetId, token),
    enabled: !!token,
  });
}

export function useUpdateMemoWidgetMutation(token: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      memoWidgetId,
      body,
    }: {
      memoWidgetId: number;
      body: UpdateMemoWidgetRequest;
    }) => updateMemoWidget(memoWidgetId, body, token),
    onSuccess: (_data, { memoWidgetId }) => {
      queryClient.invalidateQueries({
        queryKey: ['memo', 'detail', memoWidgetId],
      });
    },
  });
}

export function useDeleteMemoWidgetMutation(token: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (memoWidgetId: number) => deleteMemoWidget(memoWidgetId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memo'] });
    },
  });
}
