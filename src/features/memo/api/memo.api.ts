import { http } from '../../../lib/http';

export interface MemoWidget {
  id: number;
  lessonId: number;
  title: string;
  content: string;
}

export interface CreateMemoWidgetRequest {
  lessonId: number;
  title: string;
  content: string;
}

export async function createMemoWidget(
  body: CreateMemoWidgetRequest,
): Promise<MemoWidget> {
  const response = await http.post<MemoWidget>('/memoWidgets', body);
  return response.data;
}
