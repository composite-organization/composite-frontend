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
