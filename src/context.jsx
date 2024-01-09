import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const getInitialTheme = () =>{
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches
   const storedDarkMode = localStorage.getItem('darkTheme');


   if (storedDarkMode === null) {
     return prefersDarkMode;
   }

   return storedDarkMode === 'true';
}

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialTheme());

  const [searchTerm, setSearchTerm] = useState('car');

  const toggleDarkTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem('DarkTheme', 'newTheme');
  };

  useEffect(() => {
    document.querySelector('body').classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);
  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
