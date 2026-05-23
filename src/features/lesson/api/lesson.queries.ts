import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchLesson,
  fetchLessonWidgetIds,
  createLesson,
  authenticateLesson,
  type CreateLessonRequest,
  type AuthenticateLessonRequest,
} from './lesson.api';

export function useLessonQuery(lessonId: number, token: string) {
  return useQuery({
    queryKey: ['lesson', 'detail', lessonId, token],
    queryFn: () => fetchLesson(lessonId, token),
    enabled: !!lessonId && !!token,
  });
}

export function useLessonWidgetIdsQuery(lessonId: number, token: string) {
  return useQuery({
    queryKey: ['lesson', 'widgets', lessonId],
    queryFn: () => fetchLessonWidgetIds(lessonId, token),
    enabled: !!lessonId && !!token,
  });
}

export function useCreateLessonMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      body,
      guestToken,
    }: {
      body: CreateLessonRequest;
      guestToken: string;
    }) => createLesson(body, guestToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lesson'] });
    },
  });
}

export function useAuthenticateLessonMutation() {
  return useMutation({
    mutationFn: (body: AuthenticateLessonRequest) => authenticateLesson(body),
  });
}
