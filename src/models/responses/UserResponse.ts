export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  roles: [string];
  patronymic: string;
  username: string;
  registrationDate: string;
  birthDate: string;
  phoneNumber: string;
  exileDate: string;
  gitHubAccount: string;
  city: 1;
  groups: [
    {
      id: number;
      name: string;
      course: {
        id: number;
        name: string;
        isDeleted: boolean;
      };
      groupStatus: string;
      startDate: string;
      endDate: string;
      timetable: string;
      paymentPerMonth: number;
    }
  ];
}
