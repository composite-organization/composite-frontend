import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createMemoWidget,
  deleteMemoWidget,
  fetchMemoWidget,
  updateMemoWidget,
  type CreateMemoWidgetRequest,
  type UpdateMemoWidgetRequest,
} from './memo.api';

export function useCreateMemoWidgetMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateMemoWidgetRequest) => createMemoWidget(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memo'] });
    },
  });
}

export function useMemoWidgetQuery(memoWidgetId: number) {
  return useQuery({
    queryKey: ['memo', 'detail', memoWidgetId],
    queryFn: () => fetchMemoWidget(memoWidgetId),
  });
}

export function useUpdateMemoWidgetMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      memoWidgetId,
      body,
    }: {
      memoWidgetId: number;
      body: UpdateMemoWidgetRequest;
    }) => updateMemoWidget(memoWidgetId, body),
    onSuccess: (_data, { memoWidgetId }) => {
      queryClient.invalidateQueries({
        queryKey: ['memo', 'detail', memoWidgetId],
      });
    },
  });
}

export function useDeleteMemoWidgetMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (memoWidgetId: number) => deleteMemoWidget(memoWidgetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memo'] });
    },
  });
}
