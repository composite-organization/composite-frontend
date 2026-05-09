import { http, HttpResponse } from 'msw';

export const quizHandlers = [
  http.get('/quizWidgets/:quizWidgetId', ({ params }) => {
    return HttpResponse.json({
      quizWidgetId: Number(params.quizWidgetId),
      title: '제일 웃음이 많은 사람은?',
      status: '진행 중',
      correctRate: 25,
      submittedOptionIds: [1],
      participationResponse: {
        totalParticipantCount: 10,
        optionStatuses: [
          {
            optionId: 1,
            participantNames: ['슬링키'],
          },
          {
            optionId: 2,
            participantNames: ['큐보'],
          },
          {
            optionId: 3,
            participantNames: ['머랭'],
          },
          {
            optionId: 4,
            participantNames: ['이든'],
          },
        ],
      },
      options: [
        {
          quizOptionId: 1,
          content: '슬링키',
        },
        {
          quizOptionId: 2,
          content: '큐보',
        },
        {
          quizOptionId: 3,
          content: '머랭',
        },
        {
          quizOptionId: 4,
          content: '이든',
        },
      ],
    });
  }),

  http.post('/quizWidgets', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;

    return HttpResponse.json(
      {
        quizWidgetId: 1,
        lessonId: body.lessonId,
        title: body.title,
        status: '시작 전',
      },
      { status: 201 },
    );
  }),

  http.post('/quizWidgets/:quizWidgetId/submissions', async ({ request }) => {
    await request.json();

    return new HttpResponse(null, {
      status: 200,
    });
  }),

  http.patch('/quizWidgets/:quizWidgetId/status', async ({ request }) => {
    await request.json();

    return new HttpResponse(null, {
      status: 200,
    });
  }),

  http.patch(
    '/quizWidgets/:quizWidgetId/quizOptions',
    async ({ params, request }) => {
      await request.json();

      return HttpResponse.json({
        quizWidgetId: Number(params.quizWidgetId),
      });
    },
  ),

  http.delete('/quizWidgets/:quizWidgetId', () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),

  http.get('/quizWidgets/:quizWidgetId/answers', () => {
    return HttpResponse.json({
      answerQuizOptionIds: [1],
    });
  }),
];
