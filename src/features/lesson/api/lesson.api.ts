import { http } from '../../../lib/http';

export interface Lesson {
  lessonCode: string;
  lessonName: string;
  teacherName: string;
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
  user: string,
): Promise<Lesson> {
  const response = await http.post<Lesson>('/lessons', body, {
    params: { user },
  });
  return response.data;
}

export async function fetchLesson(
  lessonCode: string,
  user: string,
): Promise<Lesson> {
  const response = await http.get<Lesson>(`/lessons/${lessonCode}`, {
    params: { user },
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
