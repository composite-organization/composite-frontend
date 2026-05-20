import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchLesson,
  fetchLessonWidgetIds,
  createLesson,
  authenticateLesson,
  type CreateLessonRequest,
  type AuthenticateLessonRequest,
} from './lesson.api';

export function useLessonQuery(
  lessonId: number | undefined,
  guestToken: string,
) {
  return useQuery({
    queryKey: ['lesson', 'detail', lessonId, guestToken],
    queryFn: () => fetchLesson(lessonId as number),
    enabled: Number.isFinite(lessonId) && !!guestToken,
  });
}

export function useLessonWidgetIdsQuery(
  lessonId: number | undefined,
  token: string,
) {
  return useQuery({
    queryKey: ['lesson', 'widgets', lessonId],
    queryFn: () => fetchLessonWidgetIds(lessonId as number),
    enabled: Number.isFinite(lessonId) && !!token,
  });
}

export function useCreateLessonMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ body }: { body: CreateLessonRequest }) => createLesson(body),
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
