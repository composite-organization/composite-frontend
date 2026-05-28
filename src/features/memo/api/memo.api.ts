import { http } from '../../../lib/http';

export interface MemoWidget {
  id: number;
  lessonId: number;
  title: string;
  content: string;
}

export interface MemoWidgetDetail {
  id: number;
  widgetId: number;
  title: string;
  content: string;
  updatedTime: string;
}

export interface CreateMemoWidgetRequest {
  lessonId: number;
  title: string;
  content: string;
}

export interface UpdateMemoWidgetRequest {
  title: string;
  content: string;
}

export async function createMemoWidget(
  body: CreateMemoWidgetRequest,
): Promise<MemoWidget> {
  const response = await http.post<MemoWidget>('/memoWidgets', body);
  return response.data;
}

export async function fetchMemoWidget(
  memoWidgetId: number,
): Promise<MemoWidget> {
  const response = await http.get<MemoWidget>(`/memoWidgets/${memoWidgetId}`);
  return response.data;
}

export async function updateMemoWidget(
  memoWidgetId: number,
  body: UpdateMemoWidgetRequest,
): Promise<MemoWidget> {
  const response = await http.put<MemoWidget>(
    `/memoWidgets/${memoWidgetId}`,
    body,
  );
  return response.data;
}

export async function deleteMemoWidget(memoWidgetId: number): Promise<void> {
  await http.delete(`/memoWidgets/${memoWidgetId}`);
}
