import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createQuizWidget,
  fetchQuizWidget,
  submitQuizAnswer,
  updateQuizStatus,
  updateQuizOptions,
  deleteQuizWidget,
  fetchQuizAnswers,
  type User,
  type CreateQuizWidgetRequest,
  type SubmitQuizRequest,
  type CreateQuizOptionRequest,
  type UpdateQuizStatusRequest,
} from './quiz.api';

const useUser = () => ({ id: 0, name: { value: 'tester' } }) as User;

export function useCreateQuizWidgetMutation() {
  const queryClient = useQueryClient();
  const user = useUser();

  return useMutation({
    mutationFn: (body: CreateQuizWidgetRequest) => createQuizWidget(user, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quiz'] });
    },
  });
}

export function useQuizWidgetQuery(quizWidgetId: number) {
  const user = useUser();

  return useQuery({
    queryKey: ['quiz', 'detail', quizWidgetId, user.id],
    queryFn: () => fetchQuizWidget(quizWidgetId, user),
  });
}

export function useSubmitQuizAnswerMutation() {
  const queryClient = useQueryClient();
  const user = useUser();

  return useMutation({
    mutationFn: ({
      quizWidgetId,
      body,
    }: {
      quizWidgetId: number;
      body: SubmitQuizRequest;
    }) => submitQuizAnswer(quizWidgetId, user, body),
    onSuccess: (_data, { quizWidgetId }) => {
      queryClient.invalidateQueries({
        queryKey: ['quiz', 'detail', quizWidgetId],
      });
    },
  });
}

export function useUpdateQuizStatusMutation() {
  const queryClient = useQueryClient();
  const user = useUser();

  return useMutation({
    mutationFn: ({
      quizWidgetId,
      body,
    }: {
      quizWidgetId: number;
      body: UpdateQuizStatusRequest;
    }) => updateQuizStatus(quizWidgetId, user, body),
    onSuccess: (_data, { quizWidgetId }) => {
      queryClient.invalidateQueries({
        queryKey: ['quiz', 'detail', quizWidgetId],
      });
    },
  });
}

export function useUpdateQuizOptionsMutation() {
  const queryClient = useQueryClient();
  const user = useUser();

  return useMutation({
    mutationFn: ({
      quizWidgetId,
      options,
    }: {
      quizWidgetId: number;
      options: CreateQuizOptionRequest[];
    }) => updateQuizOptions(quizWidgetId, user, { quizWidgetId, options }),
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
  const user = useUser();

  return useMutation({
    mutationFn: (quizWidgetId: number) => deleteQuizWidget(quizWidgetId, user),
    onSuccess: (_data, quizWidgetId) => {
      queryClient.invalidateQueries({ queryKey: ['quiz'] });
      queryClient.removeQueries({ queryKey: ['quiz', 'detail', quizWidgetId] });
      queryClient.removeQueries({
        queryKey: ['quiz', 'answers', quizWidgetId],
      });
    },
  });
}

export function useQuizAnswersQuery(quizWidgetId: number) {
  const user = useUser();

  return useQuery({
    queryKey: ['quiz', 'answers', quizWidgetId],
    queryFn: () => fetchQuizAnswers(quizWidgetId, user),
  });
}
