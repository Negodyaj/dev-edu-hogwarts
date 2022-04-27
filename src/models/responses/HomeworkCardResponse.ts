export type HomeworkCardResponse = {
  task: {
    id: number;
    name: string;
    description: string;
    links: string;
    isRequired: boolean;
    isDeleted: boolean;
  };
  id: number;
  status: number;
  startDate: string;
  endDate: string;
};
