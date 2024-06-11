import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/home.page";
import SearchPage from "./pages/search.page";
import DetailPage from "./pages/detail.page";
import StoryPage from "./pages/story.page";
import Header from "./components/headers/header.component";
import Footer from "./components/footers/footer.component";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "./assets/context/theme.context";
import { ServerProvider } from "./assets/context/server.context";
import StoryBeingRead from "./components/homePage/storyBeingRead.component";

function App() {
  return (
    <ChakraProvider>
      <ThemeProvider>
        <ServerProvider>
          <Header/>
          <Routes>
            {/* Đảm bảo route cho StoryBeingRead không trùng với HomePage */}
            <Route path="/" element={<HomePage />} />
            <Route path="/reading" element={<StoryBeingRead />} />
            <Route path="/search/:title" element={<SearchPage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route
              path="/story/:chapterId/:title/:numChapter"
              element={<StoryPage />}
            />
          </Routes>
          <Footer />
        </ServerProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default App;
