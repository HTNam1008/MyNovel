import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Story from "../components/storyPage/story.component";
import { useTheme } from "../assets/context/theme.context.js";

function StoryPage() {
  const { chapterId, title, numChapter } = useParams();
  const { theme } = useTheme();

  return (
    <div style={{ backgroundColor: theme === "dark" ? "#1D3557" : "#E3F4F4" }}>
      <Container className="d-flex justify-content-center" style={{ flexDirection: "column" }}>
        <Story chapterId={chapterId} title={title} numChapter={numChapter} />
      </Container>
    </div>
  );
}

export default StoryPage;
