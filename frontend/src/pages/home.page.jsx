import React from "react";
import StoryUpdate from "../components/homePage/storyUpdate.component.jsx";
import StoryNew from "../components/homePage/storyNew.component.jsx";
import { Container, Row, Col } from "react-bootstrap";
import { useTheme } from "../assets/context/theme.context.js";
import StoryBeingRead from "../components/homePage/storyBeingRead.component.jsx";
import StorySlide from "../components/homePage/storySlideShow.component.jsx";

function HomePage() {
  // ----- Theme -----
  const { theme } = useTheme();

  // ----- Theme End -----
  // className="d-flex justify-content-center"
  return (
    <div>
      <div style={{ backgroundColor: theme === "dark" ? "#1D3557" : "#DDF2FD" }}>
        <StorySlide />
        <Container >
          <Col>
            <Row>
              <StoryUpdate />
            </Row>
            <Row >
              <Col>
                <StoryNew />
              </Col>
              <Col>
                <StoryBeingRead />
              </Col>
            </Row>
          </Col>
        </Container>
      </div>
    </div>
  );
}

export default HomePage;
