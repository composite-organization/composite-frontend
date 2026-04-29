import { http, HttpResponse } from 'msw';

export const guestHandlers = [
  http.post('/guests/credentials', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json(
      {
        token: `guest-token-${body.name}`,
      },
      { status: 201 },
    );
  }),
];
