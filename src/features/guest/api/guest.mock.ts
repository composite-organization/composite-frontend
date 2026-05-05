import { http, HttpResponse } from 'msw';

function encodeBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function generateMockJWT(name: string): string {
  const header = encodeBase64(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = encodeBase64(
    JSON.stringify({
      name,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400,
    }),
  );
  const signature = encodeBase64('mock-signature');
  return `${header}.${payload}.${signature}`;
}

export const guestHandlers = [
  http.post('/guests/credentials', async ({ request }) => {
    try {
      const body = (await request.json()) as Record<string, unknown>;
      const token = generateMockJWT(String(body.name || 'guest'));
      return new HttpResponse(null, {
        status: 201,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {
      return HttpResponse.json(
        { error: 'Failed to process request' },
        { status: 400 },
      );
    }
  }),
];
