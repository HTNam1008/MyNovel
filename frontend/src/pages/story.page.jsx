import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Story from "../components/storyPage/story.component";

function StoryPage() {
  const { chapterId, title, numChapter } = useParams();
  

  return (
    <div style={{ backgroundColor: "#1D3557" }}>
      <Container className="d-flex justify-content-center" style={{ flexDirection: "column" }}>
        <Story chapterId={chapterId} title={title} numChapter={numChapter}  />  
      </Container>
    </div>
  );
}

export default StoryPage;
