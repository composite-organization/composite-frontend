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
  token: string,
): Promise<MemoWidget> {
  const response = await http.post<MemoWidget>('/memoWidgets', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function fetchMemoWidget(
  memoWidgetId: number,
  token: string,
): Promise<MemoWidget> {
  const response = await http.get<MemoWidget>(`/memoWidgets/${memoWidgetId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function updateMemoWidget(
  memoWidgetId: number,
  body: UpdateMemoWidgetRequest,
  token: string,
): Promise<MemoWidget> {
  const response = await http.put<MemoWidget>(
    `/memoWidgets/${memoWidgetId}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function deleteMemoWidget(
  memoWidgetId: number,
  token: string,
): Promise<void> {
  await http.delete(`/memoWidgets/${memoWidgetId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
