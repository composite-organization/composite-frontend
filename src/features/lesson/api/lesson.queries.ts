import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchLesson,
  createLesson,
  authenticateLesson,
  type CreateLessonRequest,
  type AuthenticateLessonRequest,
} from './lesson.api';

export function useLessonQuery(lessonCode: string, user: string) {
  return useQuery({
    queryKey: ['lesson', 'detail', lessonCode, user],
    queryFn: () => fetchLesson(lessonCode, user),
    enabled: !!lessonCode && !!user,
  });
}

export function useCreateLessonMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ body, user }: { body: CreateLessonRequest; user: string }) =>
      createLesson(body, user),
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
