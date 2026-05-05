import { http } from '../../../lib/http';

export interface GuestCredentialsRequest {
  name: string;
}

export interface GuestCredentialsResponse {
  token: string;
}

export async function getGuestToken(
  body: GuestCredentialsRequest,
): Promise<GuestCredentialsResponse> {
  const response = await http.post('/guests/credentials', body);
  const authorizationHeader: string =
    response.headers.authorization || response.headers.Authorization;

  if (!authorizationHeader) {
    throw new Error('Authorization header not found in response');
  }

  const token = authorizationHeader.startsWith('Bearer ')
    ? authorizationHeader.slice(7)
    : authorizationHeader;

  return { token };
}
