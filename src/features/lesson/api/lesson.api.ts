import { http } from '../../../lib/http';

export interface Lesson {
  lessonId: number;
  lessonName: string;
  teacherName: string;
}

export interface CreateLessonRequest {
  teacherName: string;
  lessonName: string;
  lessonCode: string;
  password: string;
}

export interface CreateLessonResponse {
  lessonId: number;
  lessonName: string;
}

export interface JoinStudentRequest {
  name: string;
}

export interface JoinStudentResponse {
  lessonId: number;
}

export interface AuthenticateLessonRequest {
  lessonCode: string;
  password: string;
}

export interface AuthenticateLessonResponse {
  token: string;
  lessonId: number;
}

export async function createLesson(
  body: CreateLessonRequest,
): Promise<CreateLessonResponse> {
  const response = await http.post<CreateLessonResponse>('/lessons', body);
  return response.data;
}

export async function joinLessonAsStudent(
  lessonCode: string,
  body: JoinStudentRequest,
): Promise<JoinStudentResponse> {
  const response = await http.post<JoinStudentResponse>(
    `/lessons/${lessonCode}/students`,
    body,
  );
  return response.data;
}

export async function fetchLesson(lessonId: number): Promise<Lesson> {
  const response = await http.get<Lesson>(`/lessons/${lessonId}`);
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
  lessonId: number,
): Promise<GetLessonWidgetIdsResponse> {
  const response = await http.get<GetLessonWidgetIdsResponse>(
    `/lessons/${lessonId}/widgets`,
  );
  return response.data;
}

export async function authenticateLesson(
  body: AuthenticateLessonRequest,
): Promise<AuthenticateLessonResponse> {
  const response = await http.post<{ lessonId: number }>(
    '/lessons/authentications',
    body,
  );
  const authorizationHeader: string =
    response.headers.authorization || response.headers.Authorization;
  if (!authorizationHeader) throw new Error('Authorization header not found');
  const token = authorizationHeader.startsWith('Bearer ')
    ? authorizationHeader.slice(7)
    : authorizationHeader;
  return { token, lessonId: response.data.lessonId };
}
