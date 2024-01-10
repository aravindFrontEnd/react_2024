import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useGlobalContext } from './context';
import axios from 'axios';

const IMAGES_PER_PAGE = 6;





const Gallery = () => {

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { searchTerm } = useGlobalContext();

  const URL = `https://api.unsplash.com/search/photos?client_id=${
    import.meta.env.VITE_API_KEY
  }&page=${page}&per_page=${IMAGES_PER_PAGE}`;



  const response = useQuery({
    queryKey: ['images', searchTerm,page],
    queryFn: async () => {
      const result = await axios.get(`${URL}&query=${searchTerm}`);
    setTotalPages(result.data.total_pages);
      return result.data;
    },
  });

  if (response.isLoading) {
    return (
      <section className='image-container Loading'>
        <img src="./loading.gif" alt="loading" />
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
      <div className='buttons-search'>
        {page > 1 && (
          <button  className='prev-btn' onClick={() => setPage(page - 1)}>Previous</button>
        )}
        {page < totalPages && (
          <button  className='next-btn' onClick={() => setPage(page + 1)}>Next</button>
        )}
      </div>
    </section>
  );
};
export default Gallery;
