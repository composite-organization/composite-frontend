import { http } from '../../../lib/http';
import type {
  CreateVoteWidgetRequest,
  CreateVoteWidgetResponse,
  SubmitVoteRequest,
  UpdateVoteStatusRequest,
  VoteWidgetDetail,
} from './vote.types';

export async function createVoteWidget(
  body: CreateVoteWidgetRequest,
  token: string,
): Promise<CreateVoteWidgetResponse> {
  const response = await http.post<CreateVoteWidgetResponse>(
    '/vote-widgets',
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function fetchVoteWidget(
  voteWidgetId: number,
  token: string,
): Promise<VoteWidgetDetail> {
  const response = await http.get<VoteWidgetDetail>(
    `/vote-widgets/${voteWidgetId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function deleteVoteWidget(
  voteWidgetId: number,
  token: string,
): Promise<void> {
  await http.delete(`/vote-widgets/${voteWidgetId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function submitVote(
  voteWidgetId: number,
  body: SubmitVoteRequest,
  token: string,
): Promise<void> {
  await http.post(`/vote-widgets/${voteWidgetId}/submissions`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateVoteStatus(
  voteWidgetId: number,
  body: UpdateVoteStatusRequest,
  token: string,
): Promise<void> {
  await http.patch(`/vote-widgets/${voteWidgetId}/status`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
