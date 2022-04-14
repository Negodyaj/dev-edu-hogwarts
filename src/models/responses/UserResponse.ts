import { GroupResponse } from "./GroupResponse";

export interface UserResponse {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  photo: string,
  roles: string[],
  patronymic: string,
  username: string,
  registrationDate: string,
  birthDate: string,
  phoneNumber: string,
  exileDate: string,
  gitHubAccount: string,
  city: 1,
  groups: GroupResponse[],
}