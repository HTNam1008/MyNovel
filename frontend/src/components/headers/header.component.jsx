import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TITLE='My Novel'

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
    const handleSearch = () => {
        // Thực hiện hành động tìm kiếm với searchQuery
        console.log('Search query:', searchQuery);
        // Ví dụ: redirect hoặc thực hiện tìm kiếm trong trang hiện tại
        navigate(`/search/:${searchQuery}`);

      };

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">{TITLE}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">List</Nav.Link>
            <Nav.Link href="#action2">Category</Nav.Link>
            <NavDropdown title="Setting" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <Button variant="outline-success" onClick={handleSearch}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;