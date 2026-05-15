import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchLesson,
  fetchLessonWidgetIds,
  createLesson,
  authenticateLesson,
  type CreateLessonRequest,
  type AuthenticateLessonRequest,
} from './lesson.api';

export function useLessonQuery(lessonCode: string, guestToken: string) {
  return useQuery({
    queryKey: ['lesson', 'detail', lessonCode, guestToken],
    queryFn: () => fetchLesson(lessonCode),
    enabled: !!lessonCode && !!guestToken,
  });
}

export function useLessonWidgetIdsQuery(lessonCode: string, token: string) {
  return useQuery({
    queryKey: ['lesson', 'widgets', lessonCode],
    queryFn: () => fetchLessonWidgetIds(lessonCode),
    enabled: !!lessonCode && !!token,
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
