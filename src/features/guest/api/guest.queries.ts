import { useMutation } from '@tanstack/react-query';
import { getGuestToken, type GuestCredentialsRequest } from './guest.api';

export function useGetGuestTokenMutation() {
  return useMutation({
    mutationFn: (body: GuestCredentialsRequest) => getGuestToken(body),
  });
}
