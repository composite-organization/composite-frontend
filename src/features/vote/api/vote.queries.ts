import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createVoteWidget,
  deleteVoteWidget,
  fetchVoteWidget,
  submitVote,
  updateVoteStatus,
} from './vote.api';
import type {
  CreateVoteWidgetRequest,
  SubmitVoteRequest,
  UpdateVoteStatusRequest,
} from './vote.types';

export function useCreateVoteWidgetMutation(token: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateVoteWidgetRequest) =>
      createVoteWidget(body, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vote'] });
    },
  });
}

export function useVoteWidgetQuery(voteWidgetId: number, token: string) {
  return useQuery({
    queryKey: ['vote', 'detail', voteWidgetId],
    queryFn: () => fetchVoteWidget(voteWidgetId, token),
    enabled: !!voteWidgetId && !!token,
  });
}

export function useSubmitVoteMutation(token: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      voteWidgetId,
      body,
    }: {
      voteWidgetId: number;
      body: SubmitVoteRequest;
    }) => submitVote(voteWidgetId, body, token),
    onSuccess: (_data, { voteWidgetId }) => {
      queryClient.invalidateQueries({
        queryKey: ['vote', 'detail', voteWidgetId],
      });
    },
  });
}

export function useUpdateVoteStatusMutation(token: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      voteWidgetId,
      body,
    }: {
      voteWidgetId: number;
      body: UpdateVoteStatusRequest;
    }) => updateVoteStatus(voteWidgetId, body, token),
    onSuccess: (_data, { voteWidgetId }) => {
      queryClient.invalidateQueries({
        queryKey: ['vote', 'detail', voteWidgetId],
      });
    },
  });
}

export function useDeleteVoteWidgetMutation(token: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (voteWidgetId: number) => deleteVoteWidget(voteWidgetId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vote'] });
    },
  });
}
