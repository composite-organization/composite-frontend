import { http, HttpResponse } from 'msw';

function generateMockJWT(name: string): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      name,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400,
    }),
  );
  const signature = btoa('mock-signature');
  return `${header}.${payload}.${signature}`;
}

export const guestHandlers = [
  http.post('/guests/credentials', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json(
      {
        token: generateMockJWT(String(body.name)),
      },
      { status: 201 },
    );
  }),
];
