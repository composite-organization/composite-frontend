const CURRENT_LESSON_ID_KEY = 'currentLessonId';

export function getCurrentLessonId(): number | undefined {
  const lessonId = Number(localStorage.getItem(CURRENT_LESSON_ID_KEY));

  return Number.isFinite(lessonId) && lessonId > 0 ? lessonId : undefined;
}

export function setCurrentLessonId(lessonId: number): void {
  localStorage.setItem(CURRENT_LESSON_ID_KEY, String(lessonId));
}
