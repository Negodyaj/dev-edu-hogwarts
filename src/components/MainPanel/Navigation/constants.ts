export const homeworksLink = '/homeworks';
export const coursesLink = '/courses';
export const editCoursesLink = '/edit-courses';
export const notificationsLink = '/';
export const newHomeworkLink = '/new-homework';
export const settingsLink = '/settings';
export const lessonsLink = '/lessons';
export const newLessonLink = '/new-lesson';
export const checkHomeworkLink = '/check-homework';
export const generalProgressLink = '/general-progress';
export const journalLink = '/journal';
export const groupsLink = '/groups';
export const newGroupLink = '/new-group';
export const studentListLink = '/students-list';
export const paymentTableLink = '/payment-table';
export const allUsersLink = '/all-users';

export const newHomeworkEditLink = (homeworkId?: number) =>
  `new-homework/edit-homework/${homeworkId}`;
export const taskEditLink = (taskId: number) => `new-homework/edit-task/${taskId}`;
export const homeworkStudentAnswerEditLink = (homeworkId?: number) =>
  `homeworks/${homeworkId}/edit`;
export const homeworkByIdLink = (homeworkId?: number | string) => `${homeworksLink}/${homeworkId}`;
