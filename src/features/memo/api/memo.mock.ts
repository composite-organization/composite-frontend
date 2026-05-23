import { http, HttpResponse } from 'msw';

export const memoHandlers = [
  http.get('/memoWidgets/:memoWidgetId', ({ params }) => {
    return HttpResponse.json({
      id: Number(params.memoWidgetId),
      widgetId: 1,
      title: '메모 제목',
      content: '메모 내용',
      updatedTime: '2026-03-27T00:00:00',
    });
  }),

  http.post('/memoWidgets', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json(
      {
        id: 1,
        lessonId: body.lessonId,
        title: body.title,
        content: body.content,
      },
      { status: 201 },
    );
  }),

  http.put('/memoWidgets/:memoWidgetId', async ({ params, request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({
      id: Number(params.memoWidgetId),
      widgetId: 1,
      title: body.title,
      content: body.content,
      updatedTime: '2026-03-27T00:00:00',
    });
  }),

  http.delete('/memoWidgets/:memoWidgetId', () => {
    return new HttpResponse(null, { status: 200 });
  }),
];
