import Footer from './Footer';
import Gallery from './Gallery';
import SearchForm from './SearchForm';
import ThemeToggle from './ThemeToggle';

const App = () => {
  return (
    <main className='main-container'>
      <ThemeToggle />
      <SearchForm />
      <Gallery />
      <Footer/>
    </main>
  );
};
export default App;
