import { http, HttpResponse } from 'msw';

export const lessonHandlers = [
  http.get('/lessons/:lessonCode', ({ params }) => {
    return HttpResponse.json({
      lessonCode: String(params.lessonCode),
      lessonName: '샘플 수업',
      teacherName: '홍길동',
    });
  }),

  http.post('/lessons', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json(
      {
        lessonCode: body.lessonCode,
        lessonName: body.lessonName,
        teacherName: body.teacherName,
      },
      { status: 201 },
    );
  }),

  http.post('/lessons/authentications', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({
      lessonCode: body.lessonCode,
      authenticated: true,
    });
  }),
];
