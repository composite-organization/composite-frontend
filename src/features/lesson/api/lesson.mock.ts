import { http, HttpResponse } from 'msw';

function checkAuthorization(request: Request): boolean {
  const authorization = request.headers.get('Authorization');
  return !!authorization && authorization.startsWith('Bearer ');
}

export const lessonHandlers = [
  http.get('/lessons/:lessonCode', ({ params, request }) => {
    if (!checkAuthorization(request)) {
      return HttpResponse.json(
        {
          code: 'USER_UI_001',
          message: '인증 정보가 필요한 요청입니다.',
          detail: null,
        },
        { status: 401 },
      );
    }

    return HttpResponse.json({
      lessonCode: String(params.lessonCode),
      lessonName: '샘플 수업',
      teacherName: '홍길동',
    });
  }),

  http.post('/lessons', async ({ request }) => {
    if (!checkAuthorization(request)) {
      return HttpResponse.json(
        {
          code: 'USER_UI_001',
          message: '인증 정보가 필요한 요청입니다.',
          detail: null,
        },
        { status: 401 },
      );
    }

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
    if (!checkAuthorization(request)) {
      return HttpResponse.json(
        {
          code: 'USER_UI_001',
          message: '인증 정보가 필요한 요청입니다.',
          detail: null,
        },
        { status: 401 },
      );
    }

    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({
      lessonCode: body.lessonCode,
      authenticated: true,
    });
  }),
];
