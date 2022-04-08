export const INIT_FORM = 'newHomeworkForm/INIT_FORM' as const;
export const ADD_LINK = 'newHomeworkForm/ADD_LINK' as const;
export const REMOVE_LINK = 'newHomeworkForm/REMOVE_LINK' as const;
export const SET_VALUE_INPUT_LINK = 'newHomeworkForm/SET_VALUE_INPUT_LINK' as const;

export const InitForm = () => (
  {
    type: INIT_FORM,
  }
)

export const AddLink = (link: string) => (
  {
    type: ADD_LINK,
    payload: link,
  }
)

export const RemoveLink = (link: number) => (
  {
    type: REMOVE_LINK,
    payload: link,
  }
)

export const SetValueInInput = (text: string) => (
  {
    type: SET_VALUE_INPUT_LINK,
    payload: text,
  }
)

export type NewHomeworkFormAction =
  ReturnType<typeof AddLink>  | ReturnType<typeof RemoveLink>  | ReturnType<typeof InitForm> | ReturnType<typeof SetValueInInput> ;