import { useQuery } from '@tanstack/react-query';
import {useGlobalContext} from './context';
import axios from 'axios';
const URL = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;

const Gallery = () => {
  const {searchTerm}= useGlobalContext()
  const response = useQuery({
    queryKey: ['images', searchTerm],
    queryFn: async () => {
      const result = await axios.get(`${URL}&query=${searchTerm}`);

      return result.data;
    },
  });

  if (response.isLoading) {
    return (
      <section className='image-container'>
        <h4>Loading..</h4>
      </section>
    );
  }

  if (response.isError) {
    return (
      <section className='image-container not-Found'>
        <img src='./not-Found.jpg' alt='404 error' />
      </section>
    );
  }

  const results = response.data.results;

  if (results.length < 1) {
    return (
      <section className='image-container not-Found'>
        <img src='./not-Found.jpg' alt='no results' className='not-Found' />
      </section>
    );
  }

  return (
    <section className='image-container'>
      {results.map((item) => {
        const urls = item?.urls?.regular;
        return (
          <img
            src={urls}
            alt={item.alt_description}
            className='img'
            key={item.id}
          ></img>
        );
      })}
    </section>
  );
};
export default Gallery;
