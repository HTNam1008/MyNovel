import React from 'react'
import { useParams } from 'react-router-dom';
import Search from '../components/searchPage/search.component';

function SearchPage() {

  const {title} = useParams();
  console.log('Search query 2:', title);
  return (
    <>
      <h1>search.page</h1>
      <Search title={title}/>
    </>
  )
}

export default SearchPage