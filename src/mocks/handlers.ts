import { userHandlers } from '../features/example/api/example.mock.ts';
import { lessonHandlers } from '../features/lesson/api/lesson.mock';

export const handlers = [...userHandlers, ...lessonHandlers];
