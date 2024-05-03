import React from 'react';
import {Route, Routes} from 'react-router';
import './App.css';
import Home from './pages/home.page';
import Register from './pages/register.page';
import Header from './components/headers/header.component'
import Footer from './components/footers/footer.component'

function App() {
    return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer/>
    </>
    )
}



export default App;
