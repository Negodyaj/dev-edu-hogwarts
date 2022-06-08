export const LOADER_INCREMENT = 'loader/LOADER_INCREMENT ' as const;
export const LOADER_DECREMENT = 'loader/LOADER_DECREMENT' as const;

export const loaderIncrement = () => ({
  type: LOADER_INCREMENT,
});

export const loaderDecrement = () => ({
  type: LOADER_DECREMENT,
});

export type LoaderAction = ReturnType<typeof loaderDecrement> | ReturnType<typeof loaderIncrement>;
