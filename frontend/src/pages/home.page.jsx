import React from "react";
import StoryUpdate from "../components/homePage/storyUpdate.component.jsx";
import StoryNew from "../components/homePage/storyNew.component.jsx";
import { Container, Row, Col } from "react-bootstrap";
import { useTheme } from "../assets/context/theme.context.js";
import StoryBeingRead from "../components/homePage/storyBeingRead.component.jsx";
import StorySlide from "../components/homePage/storySlideShow.component.jsx";
import { Flex } from "@chakra-ui/react";

function HomePage() {
  // ----- Theme -----
  const { theme } = useTheme();

  // ----- Theme End -----
  // className="d-flex justify-content-center"
  return (
    <div>
      <div style={{ backgroundColor: theme === "dark" ? "#1D3557" : "#E3F4F4" }}>
        <StorySlide />
        <Container >
          <Col>
            <Row>
              <StoryUpdate />
            </Row>
            <Row style={{display: 'flex'}}>
              <Col style={{flex: '2'}}>
                <StoryNew />
              </Col>
              <Col style={{flex: '1'}}>
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
