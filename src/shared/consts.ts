export const baseUrl = 'https://piter-education.ru:7070';

export const loginUrl = 'sign-in';
export const lessonsUrl = 'lessons';
export const usersUrl = 'api/Users';
export const groupUrl = 'api/Groups';
export const addNewTaskUrl = 'api/tasks/teacher';
export const getHomeworkById = (id: number) => `api/homeworks/${id}`;
export const postStudentAnswer = (homeworkId: number) => `api/student-homeworks/${homeworkId}`;
export const getStudentHomeworkByIdUrl = (id: number) => `api/student-homeworks/${id}`;
export const studentHomeworksByUserId = (userId: number) => {
  return `api/student-homeworks/by-user/${userId}`;
};
export const getHomeworksByGroupId = (groupId: number) => {
  return `api/Homeworks/by-group/${groupId}`;
};
export const getStudentAnswerByTaskId = (taskId: number) => `api/Tasks/${taskId}/answer`;
export const registerUrl = 'register';
export const coursesUrl = 'api/Courses';
export const getAllAnswersEachStudentsByTaskIdUrl = (id: number) =>
  `api/student-homeworks/task/${id}/answers`;
