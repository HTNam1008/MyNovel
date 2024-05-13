import React from 'react';
import {Route, Routes} from 'react-router';
import './App.css';
import HomePage from './pages/home.page';
import SearchPage from './pages/search.page';
import Header from './components/headers/header.component'
import Footer from './components/footers/footer.component'

import { ChakraProvider } from '@chakra-ui/react'

function App() {
    return (
    <ChakraProvider>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:title" element={<SearchPage />} />
      </Routes>
      <Footer/>
    </ChakraProvider>
    )
}



export default App;
