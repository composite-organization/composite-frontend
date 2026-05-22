import { http, HttpResponse } from 'msw';

export const voteHandlers = [
  http.post('/vote-widgets', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const options = (body.options as string[]) ?? [];
    return HttpResponse.json(
      {
        id: 1,
        title: body.title,
        isAnonymous: body.isAnonymous,
        isMultiSelectable: body.isMultiSelectable,
        status: 'IN_PROGRESS',
        options: options.map((content, index) => ({
          id: index + 1,
          content,
        })),
      },
      { status: 201 },
    );
  }),

  http.get('/vote-widgets/:voteWidgetId', ({ params }) => {
    return HttpResponse.json({
      id: Number(params.voteWidgetId),
      title: '투표 제목',
      isAnonymous: false,
      isMultiSelectable: false,
      status: 'IN_PROGRESS',
      options: [
        { id: 1, content: '선택지 1' },
        { id: 2, content: '선택지 2' },
      ],
      participationResponse: {
        totalParticipantCount: 0,
        anonymousOptionStatuses: [
          { optionId: 1, count: 0 },
          { optionId: 2, count: 0 },
        ],
        identifiedOptionStatuses: [
          { optionId: 1, voterNames: [] },
          { optionId: 2, voterNames: [] },
        ],
      },
      endedResponse: {
        selectedOptionIds: [],
      },
    });
  }),

  http.delete('/vote-widgets/:voteWidgetId', () => {
    return new HttpResponse(null, { status: 200 });
  }),

  http.post('/vote-widgets/:voteWidgetId/submissions', () => {
    return new HttpResponse(null, { status: 200 });
  }),

  http.patch('/vote-widgets/:voteWidgetId/status', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({ status: body.status });
  }),
];
