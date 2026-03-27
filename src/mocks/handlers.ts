import { userHandlers } from '../features/example/api/example.mock.ts';
import { memoHandlers } from '../features/memo/api/memo.mock';

export const handlers = [...userHandlers, ...memoHandlers];
