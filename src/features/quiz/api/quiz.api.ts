import { http } from '../../../lib/http';

export type QuizStatus = '시작 전' | '진행 중' | '종료';

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
  options: CreateQuizOptionRequest[];
}

export async function createQuizWidget(
  token: string,
  body: CreateQuizWidgetRequest,
): Promise<QuizWidget> {
  const response = await http.post<QuizWidget>('/quizWidgets', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function fetchQuizWidget(
  quizWidgetId: number,
  token: string,
): Promise<QuizWidgetDetail> {
  const response = await http.get<QuizWidgetDetail>(
    `/quizWidgets/${quizWidgetId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function submitQuizAnswer(
  quizWidgetId: number,
  token: string,
  body: SubmitQuizRequest,
): Promise<void> {
  await http.post(`/quizWidgets/${quizWidgetId}/submissions`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateQuizStatus(
  quizWidgetId: number,
  token: string,
  body: UpdateQuizStatusRequest,
): Promise<void> {
  await http.patch(`/quizWidgets/${quizWidgetId}/status`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateQuizOptions(
  quizWidgetId: number,
  token: string,
  body: UpdateQuizOptionsRequest,
): Promise<QuizWidget> {
  const response = await http.patch<QuizWidget>(
    `/quizWidgets/${quizWidgetId}/quizOptions`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function deleteQuizWidget(
  quizWidgetId: number,
  token: string,
): Promise<void> {
  await http.delete(`/quizWidgets/${quizWidgetId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchQuizAnswers(
  quizWidgetId: number,
  token: string,
): Promise<QuizAnswersResponse> {
  const response = await http.get<QuizAnswersResponse>(
    `/quizWidgets/${quizWidgetId}/answers`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}
