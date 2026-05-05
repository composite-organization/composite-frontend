import { http } from '../../../lib/http';

export interface Lesson {
  id: number;
  teacherName: string;
  lessonName: string;
  lessonCode: string;
  createdTime: string;
}

export interface CreateLessonRequest {
  teacherName: string;
  lessonName: string;
  lessonCode: string;
  password: string;
}

export interface AuthenticateLessonRequest {
  lessonCode: string;
  password: string;
}

export interface AuthenticateLessonResponse {
  lessonCode: string;
  authenticated: boolean;
}

export async function createLesson(
  body: CreateLessonRequest,
  guestToken: string,
): Promise<Lesson> {
  const response = await http.post<Lesson>('/lessons', body, {
    headers: {
      Authorization: `Bearer ${guestToken}`,
    },
  });
  return response.data;
}

export async function fetchLesson(
  lessonCode: string,
  guestToken: string,
): Promise<Lesson> {
  const response = await http.get<Lesson>(`/lessons/${lessonCode}`, {
    headers: {
      Authorization: `Bearer ${guestToken}`,
    },
  });
  return response.data;
}

export async function authenticateLesson(
  body: AuthenticateLessonRequest,
): Promise<AuthenticateLessonResponse> {
  const response = await http.post<AuthenticateLessonResponse>(
    '/lessons/authentications',
    body,
  );
  return response.data;
}
