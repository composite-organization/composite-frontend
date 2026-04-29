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
  const response = await http.post<GuestCredentialsResponse>(
    '/guests/credentials',
    body,
  );
  return response.data;
}
