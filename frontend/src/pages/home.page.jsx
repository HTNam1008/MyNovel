import React from 'react'
import useSearchFetching from '../services/search.service.js';
import StoryUpdate from '../components/homePage/storyUpdate.component.jsx';
import StoryNew from '../components/homePage/storyNew.component.jsx';

function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <StoryUpdate/>
      <StoryNew/>
      {/* <ul>{data.map(item => <li>{item.title}</li>)} </ul> */}
    </>
  );
}

export default HomePage