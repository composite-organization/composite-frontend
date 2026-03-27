import { http, HttpResponse } from 'msw';

export const memoHandlers = [
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
];
