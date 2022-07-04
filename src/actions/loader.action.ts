export const INCREMENT_LOADER = 'loader/INCREMENT_LOADER' as const;
export const DECREMENT_LOADER = 'loader/DECREMENT_LOADER' as const;

export const IncrementLoader = () => ({
  type: INCREMENT_LOADER,
});

export const DecrementLoader = () => ({
  type: DECREMENT_LOADER,
});

export type LoaderAction = ReturnType<typeof DecrementLoader> | ReturnType<typeof IncrementLoader>;
