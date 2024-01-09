import { MdLightMode } from 'react-icons/md';
import { MdOutlineDarkMode } from 'react-icons/md';
import { useGlobalContext } from './context';


const ThemeToggle = () => {

  const { isDarkTheme, toggleDarkTheme } = useGlobalContext();
  return (
    <section className='toggle-container'>
      <button className='dark-toggle' onClick={toggleDarkTheme}>
        {isDarkTheme ? (
          <MdOutlineDarkMode className='toggle-icon' />
        ) : (
          <MdLightMode className='toggle-icon' />
        )}
      </button>
    </section>
  );
};
export default ThemeToggle;
