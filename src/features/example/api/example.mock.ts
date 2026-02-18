import { http, HttpResponse } from 'msw';

export const userHandlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({ id: 1, name: 'Alice' });
  }),
];
