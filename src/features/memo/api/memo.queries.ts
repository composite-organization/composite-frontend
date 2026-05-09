import { useQueries } from '@tanstack/react-query';
import { fetchMemoWidget } from './memo.api';

export function useMemoWidgetsQuery(memoWidgetIds: number[], token: string) {
  return useQueries({
    queries: memoWidgetIds.map((id) => ({
      queryKey: ['memoWidget', id],
      queryFn: () => fetchMemoWidget(id, token),
      enabled: !!token,
    })),
  });
}
