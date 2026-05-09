import { http } from '../../../lib/http';

export interface MemoWidget {
  id: number;
  widgetId: number;
  title: string;
  content: string;
  updatedTime: string;
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
