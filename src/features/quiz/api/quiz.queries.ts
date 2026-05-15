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

export function useCreateQuizWidgetMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateQuizWidgetRequest) => createQuizWidget(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lesson', 'widgets'] });
      queryClient.invalidateQueries({ queryKey: ['quiz'] });
    },
  });
}

export function useQuizWidgetQuery(quizWidgetId: number, token: string) {
  return useQuery({
    queryKey: ['quiz', 'detail', quizWidgetId],
    queryFn: () => fetchQuizWidget(quizWidgetId),
    enabled: Number.isFinite(quizWidgetId) && !!token,
  });
}

export function useQuizWidgetsQuery(quizWidgetIds: number[], token: string) {
  return useQueries({
    queries: quizWidgetIds.map((quizWidgetId) => ({
      queryKey: ['quiz', 'detail', quizWidgetId],
      queryFn: () => fetchQuizWidget(quizWidgetId),
      enabled: Number.isFinite(quizWidgetId) && !!token,
    })),
  });
}

export function useSubmitQuizAnswerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      quizWidgetId,
      body,
    }: {
      quizWidgetId: number;
      body: SubmitQuizRequest;
    }) => submitQuizAnswer(quizWidgetId, body),
    onSuccess: (_data, { quizWidgetId }) => {
      queryClient.invalidateQueries({
        queryKey: ['quiz', 'detail', quizWidgetId],
      });
    },
  });
}

export function useUpdateQuizStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      quizWidgetId,
      body,
    }: {
      quizWidgetId: number;
      body: UpdateQuizStatusRequest;
    }) => updateQuizStatus(quizWidgetId, body),
    onSuccess: (_data, { quizWidgetId }) => {
      queryClient.invalidateQueries({
        queryKey: ['quiz', 'detail', quizWidgetId],
      });
    },
  });
}

export function useUpdateQuizOptionsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      quizWidgetId,
      options,
    }: {
      quizWidgetId: number;
      options: CreateQuizOptionRequest[];
    }) => updateQuizOptions(quizWidgetId, { options }),
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

export function useDeleteQuizWidgetMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quizWidgetId: number) => deleteQuizWidget(quizWidgetId),
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
    queryFn: () => fetchQuizAnswers(quizWidgetId),
    enabled: Number.isFinite(quizWidgetId) && !!token,
  });
}

export function useQuizAnswersQueries(
  quizWidgetIds: number[],
  token: string,
  enabled = true,
) {
  return useQueries({
    queries: quizWidgetIds.map((quizWidgetId) => ({
      queryKey: ['quiz', 'answers', quizWidgetId],
      queryFn: () => fetchQuizAnswers(quizWidgetId),
      enabled: enabled && Number.isFinite(quizWidgetId) && !!token,
    })),
  });
}
