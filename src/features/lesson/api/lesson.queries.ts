import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchLesson,
  createLesson,
  authenticateLesson,
  type CreateLessonRequest,
  type AuthenticateLessonRequest,
} from './lesson.api';

export function useLessonQuery(lessonCode: string, guestToken: string) {
  return useQuery({
    queryKey: ['lesson', 'detail', lessonCode, guestToken],
    queryFn: () => fetchLesson(lessonCode, guestToken),
    enabled: !!lessonCode && !!guestToken,
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
