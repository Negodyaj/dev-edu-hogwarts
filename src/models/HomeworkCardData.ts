export type HomeworkCardData = {
  task: {
    id: number,
    name: string,
    description: string,
    links: string,
    isRequired: boolean,
    isDeleted: boolean
  },
  id: number,
  startDate: string,
  endDate: string
}