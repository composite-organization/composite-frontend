import { userHandlers } from '../features/example/api/example.mock.ts';
import { memoHandlers } from '../features/memo/api/memo.mock';
import { lessonHandlers } from '../features/lesson/api/lesson.mock';
import { guestHandlers } from '../features/guest/api/guest.mock';

export const handlers = [
  ...userHandlers,
  ...memoHandlers,
  ...lessonHandlers,
  ...guestHandlers,
];
