import React from 'react'
import { useParams } from 'react-router-dom';
import SearchNavbar from '../components/searchPage/searchNavbar.component.jsx';
import { useTheme } from "../assets/context/theme.context.js";

function SearchNavbarPage() {
   // ----- Theme -----
  const { theme } = useTheme();
  const {type , cate,index} = useParams();
  // console.log('Search query 2:', title);
  return (
    <div style={{ backgroundColor: theme === "dark" ? "#1D3557" : "#E3F4F4" }}>
      <SearchNavbar type={type} cate={cate} index={index} />
    </div>
  )
}

export default SearchNavbarPage