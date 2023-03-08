import { useState } from 'react';

const useLocalStorage = (keyName: string, defaultValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      }
    } catch (error) {
      return defaultValue;
    }
  });

  const setvalue = (newValue: any) => {
    localStorage.setItem(keyName, JSON.stringify(newValue));
    setStoredValue(newValue);
  };

  return [storedValue, setvalue];
};

export default useLocalStorage;
