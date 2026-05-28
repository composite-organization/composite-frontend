import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchLesson,
  fetchLessonWidgetIds,
  createLesson,
  authenticateLesson,
  type CreateLessonRequest,
  type AuthenticateLessonRequest,
} from './lesson.api';

export function useLessonQuery(lessonId: number) {
  return useQuery({
    queryKey: ['lesson', 'detail', lessonId],
    queryFn: () => fetchLesson(lessonId),
    enabled: !!lessonId,
  });
}

export function useLessonWidgetIdsQuery(lessonId: number) {
  return useQuery({
    queryKey: ['lesson', 'widgets', lessonId],
    queryFn: () => fetchLessonWidgetIds(lessonId),
    enabled: !!lessonId,
  });
}

export function useCreateLessonMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateLessonRequest) => createLesson(body),
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
