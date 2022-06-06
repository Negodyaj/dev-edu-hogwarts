export type Group = {
  id: number;
  name: string;
};

export interface StudentResponse {
  id: number;
  firstName: string;
  lastName: string;
  groups: Group[];
  phoneNumber: string;
  email: string;
}
