import React from 'react'
import StoryUpdate from '../components/homePage/storyUpdate.component.jsx';
import StoryNew from '../components/homePage/storyNew.component.jsx';
import { Container, Row, Col } from 'react-bootstrap'; 

function HomePage() {
  return (
    <div style={{backgroundColor:'#1D3557'}}>
      <Container className="d-flex justify-content-center" > {/* Container để căn giữa homepage */}
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

  );
}

export default HomePage