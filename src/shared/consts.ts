export const baseUrl = 'https://piter-education.ru:7070';

export const loginUrl = 'sign-in';
export const lessonsUrl = 'api/lessons';
export const usersUrl = 'api/Users';
export const groupUrl = 'api/Groups';
export const taskUrl = 'api/tasks';
export const registerUrl = 'register';
export const coursesUrl = 'api/Courses';
export const addNewTaskByTeacherUrl = `${taskUrl}/teacher`;
export const addNewTaskByMethodistUrl = `${taskUrl}/methodist`;
export const addNewHomeworkWithTaskByTeacherUrl = `${taskUrl}/publish-homework`;
export const taskById = (taskId: number | string) => `${taskUrl}/${taskId}`;
export const courseById = (courseId: number) => `${coursesUrl}/${courseId}/full`;
export const draftsByGroupId = (groupId: number) => `${taskUrl}/by-group/${groupId}`;
export const homeworkById = (id: number | string) => `api/homeworks/${id}`;
export const postStudentAnswer = (homeworkId: number) => `api/student-homeworks/${homeworkId}`;
export const getStudentHomeworkByIdUrl = (id: number) => `api/student-homeworks/${id}`;
export const studentHomeworksByUserId = (userId: number) => {
  return `api/student-homeworks/by-user/${userId}`;
};
export const getHomeworksByGroupId = (groupId: number) => {
  return `api/Homeworks/by-group/${groupId}`;
};
export const updateAttendanceForLesson = (
  lessonId: number,
  studentId: number,
  attendanceType: string
) => `${lessonsUrl}/${lessonId}/student/${studentId}/attendance/${attendanceType}`;
export const lessonsByGroupId = (groupId: number) => {
  return `${lessonsUrl}/by-group/${groupId}`;
};
export const getStudentAnswerByTaskId = (taskId: number) => `${taskUrl}/${taskId}/answer`;
export const updateUserUrl = (id: number) => `${usersUrl}/${id}`;
export const GroupByIdUrl = (groupId: number) => `${groupUrl}/${groupId}`;
export const updatePassword = 'api/Users/password';
export const getTopicsByCourseId = (courseId: number) => `api/Courses/${courseId}/topics`;
export const postTopic = 'api/Topics';
export const updateCourseProgram = (courseId: number) => `/api/Courses/${courseId}/program`;
export const getAllAnswersEachStudentsByTaskIdUrl = (id: number) =>
  `api/student-homeworks/task/${id}/answers`;
