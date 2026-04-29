import { userHandlers } from '../features/example/api/example.mock.ts';
import { lessonHandlers } from '../features/lesson/api/lesson.mock';
import { guestHandlers } from '../features/guest/api/guest.mock';

export const handlers = [...userHandlers, ...lessonHandlers, ...guestHandlers];
