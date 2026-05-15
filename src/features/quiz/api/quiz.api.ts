import { http } from '../../../lib/http';

type QuizStatus = '시작 전' | '진행 중' | '종료';

interface QuizWidget {
  quizWidgetId: number;
}

interface QuizWidgetOption {
  quizOptionId: number;
  content: string;
}

interface QuizOptionStatus {
  optionId: number;
  participantNames: string[];
}

interface QuizParticipationResponse {
  totalParticipantCount: number;
  optionStatuses: QuizOptionStatus[];
}

interface QuizAnswersResponse {
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

interface UpdateQuizOptionsRequest {
  options: CreateQuizOptionRequest[];
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

export async function createQuizWidget(
  body: CreateQuizWidgetRequest,
): Promise<QuizWidget> {
  const response = await http.post<QuizWidget>('/quizWidgets', body);
  return response.data;
}

export async function fetchQuizWidget(
  quizWidgetId: number,
): Promise<QuizWidgetDetail> {
  const response = await http.get<QuizWidgetDetail>(
    `/quizWidgets/${quizWidgetId}`,
  );
  return response.data;
}

export async function submitQuizAnswer(
  quizWidgetId: number,
  body: SubmitQuizRequest,
): Promise<void> {
  await http.post(`/quizWidgets/${quizWidgetId}/submissions`, body);
}

export async function updateQuizStatus(
  quizWidgetId: number,
  body: UpdateQuizStatusRequest,
): Promise<void> {
  await http.patch(`/quizWidgets/${quizWidgetId}/status`, body);
}

export async function updateQuizOptions(
  quizWidgetId: number,
  body: UpdateQuizOptionsRequest,
): Promise<QuizWidget> {
  const response = await http.patch<QuizWidget>(
    `/quizWidgets/${quizWidgetId}/quizOptions`,
    body,
  );
  return response.data;
}

export async function deleteQuizWidget(quizWidgetId: number): Promise<void> {
  await http.delete(`/quizWidgets/${quizWidgetId}`);
}

export async function fetchQuizAnswers(
  quizWidgetId: number,
): Promise<QuizAnswersResponse> {
  const response = await http.get<QuizAnswersResponse>(
    `/quizWidgets/${quizWidgetId}/answers`,
  );
  return response.data;
}
