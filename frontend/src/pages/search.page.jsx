import React from 'react'
import { useParams } from 'react-router-dom';
import Search from '../components/searchPage/search.component';
import { useTheme } from "../assets/context/theme.context.js";

function SearchPage() {
   // ----- Theme -----
  const { theme } = useTheme();
  const {title} = useParams();
  console.log('Search query 2:', title);
  return (
    <div style={{ backgroundColor: theme === "dark" ? "#1D3557" : "#E3F4F4" }}>
      <Search title={title}/>
    </div>
  )
}

export default SearchPage