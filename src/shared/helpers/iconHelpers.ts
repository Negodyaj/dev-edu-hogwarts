export const setRandomIconGroup = () => {
  const random = Math.random() * 9 + 1;
  return +~~random;
};
