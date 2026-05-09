import { http } from '../../../lib/http';

export interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: { value: string };
}

export type QuizStatus = '시작 전' | '진행 중' | '완료';

export interface QuizWidget {
  quizWidgetId: number;
}

export interface QuizWidgetOption {
  quizOptionId: number;
  content: string;
}

export interface QuizOptionStatus {
  optionId: number;
  participantNames: string[];
}

export interface QuizParticipationResponse {
  totalParticipantCount: number;
  optionStatuses: QuizOptionStatus[];
}

export interface QuizWidgetDetail {
  quizWidgetId: number;
  title: string;
  status: QuizStatus;
  correctRate: number;
  submittedOptionIds: number[];
  participationResponse: QuizParticipationResponse;
  options: QuizWidgetOption[];
}

export interface QuizAnswersResponse {
  answerQuizOptionIds: number[];
}

export interface CreateQuizOptionRequest {
  content: string;
  isCorrect: boolean;
}

export interface CreateQuizWidgetRequest {
  lessonId: number;
  title: string;
  options: CreateQuizOptionRequest[];
}

export interface SubmitQuizRequest {
  quizOptionIds: number[];
}

export interface UpdateQuizStatusRequest {
  status: QuizStatus;
}

export interface UpdateQuizOptionsRequest {
  quizWidgetId: number;
  options: CreateQuizOptionRequest[];
}

export async function createQuizWidget(
  user: User,
  body: CreateQuizWidgetRequest,
): Promise<QuizWidget> {
  const response = await http.post<QuizWidget>('/quizWidgets', body, {
    params: { user },
  });
  return response.data;
}

export async function fetchQuizWidget(
  quizWidgetId: number,
  user: User,
): Promise<QuizWidgetDetail> {
  const response = await http.get<QuizWidgetDetail>(
    `/quizWidgets/${quizWidgetId}`,
    {
      params: { user },
    },
  );
  return response.data;
}

export async function submitQuizAnswer(
  quizWidgetId: number,
  user: User,
  body: SubmitQuizRequest,
): Promise<void> {
  await http.post(`/quizWidgets/${quizWidgetId}/submissions`, body, {
    params: { user },
  });
}

export async function updateQuizStatus(
  quizWidgetId: number,
  user: User,
  body: UpdateQuizStatusRequest,
): Promise<void> {
  await http.patch(`/quizWidgets/${quizWidgetId}/status`, body, {
    params: { user },
  });
}

export async function updateQuizOptions(
  quizWidgetId: number,
  user: User,
  body: UpdateQuizOptionsRequest,
): Promise<QuizWidget> {
  const response = await http.patch<QuizWidget>(
    `/quizWidgets/${quizWidgetId}/quizOptions`,
    body,
    {
      params: { user },
    },
  );
  return response.data;
}

export async function deleteQuizWidget(
  quizWidgetId: number,
  user: User,
): Promise<void> {
  await http.delete(`/quizWidgets/${quizWidgetId}`, {
    params: { user },
  });
}

export async function fetchQuizAnswers(
  quizWidgetId: number,
  user: User,
): Promise<QuizAnswersResponse> {
  const response = await http.get<QuizAnswersResponse>(
    `/quizWidgets/${quizWidgetId}/answers`,
    {
      params: { user },
    },
  );
  return response.data;
}
