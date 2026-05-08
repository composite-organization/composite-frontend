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
  token: string;
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
  token: string,
): Promise<Lesson> {
  const response = await http.get<Lesson>(`/lessons/${lessonCode}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export interface LessonWidgetIds {
  memo: number[];
  quiz: number[];
  vote: number[];
  attachment: number[];
}

export interface GetLessonWidgetIdsResponse {
  widgets: LessonWidgetIds;
}

export async function fetchLessonWidgetIds(
  lessonCode: string,
  token: string,
): Promise<GetLessonWidgetIdsResponse> {
  const response = await http.get<GetLessonWidgetIdsResponse>(
    `/lessons/${lessonCode}/widgets`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function authenticateLesson(
  body: AuthenticateLessonRequest,
): Promise<AuthenticateLessonResponse> {
  const response = await http.post('/lessons/authentications', body);
  const authorizationHeader: string =
    response.headers.authorization || response.headers.Authorization;
  if (!authorizationHeader) throw new Error('Authorization header not found');
  const token = authorizationHeader.startsWith('Bearer ')
    ? authorizationHeader.slice(7)
    : authorizationHeader;
  return { token };
}
