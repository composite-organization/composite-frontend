import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createQuizWidget,
  deleteQuizWidget,
  fetchQuizAnswers,
  fetchQuizWidget,
  submitQuizAnswer,
  updateQuizOptions,
  updateQuizStatus,
  type CreateQuizOptionRequest,
  type CreateQuizWidgetRequest,
  type SubmitQuizRequest,
  type UpdateQuizStatusRequest,
} from './quiz.api';

export function useCreateQuizWidgetMutation(token: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateQuizWidgetRequest) =>
      createQuizWidget(token, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lesson', 'widgets'] });
      queryClient.invalidateQueries({ queryKey: ['quiz'] });
    },
  });
}

export function useQuizWidgetQuery(quizWidgetId: number, token: string) {
  return useQuery({
    queryKey: ['quiz', 'detail', quizWidgetId],
    queryFn: () => fetchQuizWidget(quizWidgetId, token),
    enabled: Number.isFinite(quizWidgetId) && !!token,
  });
}

export function useQuizWidgetsQuery(quizWidgetIds: number[], token: string) {
  return useQueries({
    queries: quizWidgetIds.map((id) => ({
      queryKey: ['quiz', 'detail', id],
      queryFn: () => fetchQuizWidget(id, token),
      enabled: Number.isFinite(id) && !!token,
    })),
  });
}

export function useSubmitQuizAnswerMutation(token: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      quizWidgetId,
      body,
    }: {
      quizWidgetId: number;
      body: SubmitQuizRequest;
    }) => submitQuizAnswer(quizWidgetId, token, body),
    onSuccess: (_data, { quizWidgetId }) => {
      queryClient.invalidateQueries({
        queryKey: ['quiz', 'detail', quizWidgetId],
      });
    },
  });
}

export function useUpdateQuizStatusMutation(token: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      quizWidgetId,
      body,
    }: {
      quizWidgetId: number;
      body: UpdateQuizStatusRequest;
    }) => updateQuizStatus(quizWidgetId, token, body),
    onSuccess: (_data, { quizWidgetId }) => {
      queryClient.invalidateQueries({
        queryKey: ['quiz', 'detail', quizWidgetId],
      });
    },
  });
}

export function useUpdateQuizOptionsMutation(token: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      quizWidgetId,
      options,
    }: {
      quizWidgetId: number;
      options: CreateQuizOptionRequest[];
    }) => updateQuizOptions(quizWidgetId, token, { options }),
    onSuccess: (_data, { quizWidgetId }) => {
      queryClient.invalidateQueries({
        queryKey: ['quiz', 'detail', quizWidgetId],
      });
      queryClient.invalidateQueries({
        queryKey: ['quiz', 'answers', quizWidgetId],
      });
    },
  });
}

export function useDeleteQuizWidgetMutation(token: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quizWidgetId: number) => deleteQuizWidget(quizWidgetId, token),
    onSuccess: (_data, quizWidgetId) => {
      queryClient.invalidateQueries({ queryKey: ['lesson', 'widgets'] });
      queryClient.invalidateQueries({ queryKey: ['quiz'] });
      queryClient.removeQueries({ queryKey: ['quiz', 'detail', quizWidgetId] });
      queryClient.removeQueries({
        queryKey: ['quiz', 'answers', quizWidgetId],
      });
    },
  });
}

export function useQuizAnswersQuery(quizWidgetId: number, token: string) {
  return useQuery({
    queryKey: ['quiz', 'answers', quizWidgetId],
    queryFn: () => fetchQuizAnswers(quizWidgetId, token),
    enabled: Number.isFinite(quizWidgetId) && !!token,
  });
}

export function useQuizAnswersQueries(
  quizWidgetIds: number[],
  token: string,
  enabled = true,
) {
  return useQueries({
    queries: quizWidgetIds.map((id) => ({
      queryKey: ['quiz', 'answers', id],
      queryFn: () => fetchQuizAnswers(id, token),
      enabled: enabled && Number.isFinite(id) && !!token,
    })),
  });
}
