import { http } from '../../../lib/http';

export type VoteStatus = 'IN_PROGRESS' | 'ENDED';

export interface VoteOptionResponse {
  id: number;
  content: string;
}

export interface AnonymousOptionStatus {
  optionId: number;
  count: number;
}

export interface IdentifiedOptionStatus {
  optionId: number;
  voterNames: string[];
}

export interface VoteParticipationResponse {
  totalParticipantCount: number;
  anonymousOptionStatuses?: AnonymousOptionStatus[];
  identifiedOptionStatuses?: IdentifiedOptionStatus[];
}

export interface VoteEndedResponse {
  selectedOptionIds: number[];
}

export interface VoteWidgetDetail {
  id: number;
  title: string;
  isAnonymous: boolean;
  isMultiSelectable: boolean;
  status: VoteStatus;
  options: VoteOptionResponse[];
  participationResponse: VoteParticipationResponse;
  endedResponse?: VoteEndedResponse;
}

export interface CreateVoteWidgetResponse {
  id: number;
  title: string;
  isAnonymous: boolean;
  isMultiSelectable: boolean;
  status: VoteStatus;
  options: VoteOptionResponse[];
}

export interface CreateVoteWidgetRequest {
  lessonId: number;
  title: string;
  options: string[];
  isAnonymous: boolean;
  isMultiSelectable: boolean;
}

export interface SubmitVoteRequest {
  optionIds: number[];
}

export interface UpdateVoteStatusRequest {
  status: VoteStatus;
}

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
