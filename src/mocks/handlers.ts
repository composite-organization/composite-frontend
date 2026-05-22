import { userHandlers } from '../features/example/api/example.mock.ts';
import { memoHandlers } from '../features/memo/api/memo.mock';
import { lessonHandlers } from '../features/lesson/api/lesson.mock';
import { guestHandlers } from '../features/guest/api/guest.mock';
import { voteHandlers } from '../features/vote/api/vote.mock';

export const handlers = [
  ...userHandlers,
  ...memoHandlers,
  ...lessonHandlers,
  ...guestHandlers,
  ...voteHandlers,
];
