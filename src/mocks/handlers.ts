import { userHandlers } from '../features/example/api/example.mock.ts';
import { quizHandlers } from '@/features/quiz/api/quiz.mock.ts';

export const handlers = [...userHandlers, ...quizHandlers];
