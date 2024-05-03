import React from 'react'
import useSearchFetching from '../services/search.service';

function Home() {
    const { data, loading } = useSearchFetching('/search');
  return (
        <ul>{data.map(item => <li>{item.title}</li>)} </ul>
  );
}

export default Home