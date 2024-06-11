import React from "react";
import StoryUpdate from "../components/homePage/storyUpdate.component.jsx";
import StoryNew from "../components/homePage/storyNew.component.jsx";
import { Container, Row, Col } from "react-bootstrap";
import { useTheme } from "../assets/context/theme.context.js";

function HomePage() {
  // ----- Theme -----
  const { theme } = useTheme();

  // ----- Theme End -----
  return (
    <div>
      <div style={{ backgroundColor: theme === "dark" ? "#1D3557" : "#fff" }}>
        <Container className="d-flex justify-content-center">
          <Col>
            <Row>
              <StoryUpdate />
            </Row>
            <Row>
              <StoryNew />
            </Row>
          </Col>
        </Container>
      </div>
    </div>
  );
}

export default HomePage;
