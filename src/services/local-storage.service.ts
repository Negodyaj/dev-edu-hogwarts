export const store = (key: string, data: any) => {
  if (!localStorage) return;

  if (typeof data === 'string') 
    localStorage.setItem(key, data);
  else 
    localStorage.setItem(key, JSON.stringify(data));
};

export const getFromStorage = (key: string): string => {
  if (!localStorage) return '';

  const data = localStorage.getItem(key);
  return data || '';
};

export const removeFromStorage = (key: string) => {
  if (!localStorage) return;
  localStorage.removeItem(key);
};
