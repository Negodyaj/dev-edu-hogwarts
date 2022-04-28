export type Filter = {
  id: number;
  name: string;
};

export const DateFilterList: Filter[] = [
  {
    id: 1,
    name: 'Все',
  },
  {
    id: 2,
    name: 'Эта неделя',
  },
  {
    id: 3,
    name: 'Этот месяц',
  },
];
