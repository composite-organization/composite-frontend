export const MIN_STUDENT_NAME_LENGTH = 1;
export const MIN_LESSON_NAME_LENGTH = 3;
export const MIN_TEACHER_NAME_LENGTH = 1;
export const MIN_PASSWORD_LENGTH = 6;
export const MIN_LESSON_CODE_LENGTH = 1;

export const VALIDATION_MESSAGES = {
  STUDENT_NAME: '이름을 입력해주세요.',
  LESSON_NAME: '수업명은 3자리 이상입니다.',
  TEACHER_NAME: '수업자명을 입력해주세요.',
  PASSWORD: '비밀번호는 6자 이상입니다.',
  LESSON_CODE: '수업 코드를 입력해주세요.',
};

export const validateStudentName = (name: string) => {
  return name.trim().length >= MIN_STUDENT_NAME_LENGTH;
};

export const validateLessonName = (name: string) => {
  return name.trim().length >= MIN_LESSON_NAME_LENGTH;
};

export const validateTeacherName = (name: string) => {
  return name.trim().length >= MIN_TEACHER_NAME_LENGTH;
};

export const validatePassword = (password: string) => {
  return password.trim().length >= MIN_PASSWORD_LENGTH;
};

export const validateLessonCode = (code: string) => {
  return code.trim().length >= MIN_LESSON_CODE_LENGTH;
};
