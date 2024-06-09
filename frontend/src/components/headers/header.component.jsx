import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TITLE = "My Novel";
let title = ["Danh sách", "Thể loại", "Phân loại theo chương", "Cài đặt"];
let list = [
  "Truyện mới cập nhật",
  "Truyện hot",
  "Truyện full mới cập nhật",
  "Truyện full đánh giá cao",
  "Truyện full xem nhiều",
  "Truyện full tìm kiếm nhiều",
];

let categories = [
  "Tiên Hiệp",
  "Kiếm Hiệp",
  "Ngôn Tình",
  "Đam Mỹ",
  "Quan Trường",
  "Võng Du",
  "Khoa Huyễn",
  "Hệ Thống",
  "Huyền Huyễn",
  "Dị Giới",
  "Dị Năng",
  "Quân Sự",
  "Lịch Sử",
  "Xuyên Không",
  "Trọng Sinh",
  "Xuyên Nhanh",
  "Trinh Thám",
  "Thám Hiểm",
  "Linh Dị",
  "Ngược",
  "Sủng",
  "Cung Đấu",
  "Nữ Cường",
  "Gia Đấu",
  "Đông Phương",
  "Đô Thị",
  "Bách Hợp",
  "Hài Hước",
  "Điền Văn",
  "Cổ Đại",
  "Mạt Thế",
  "Truyện Teen",
  "Phương Tây",
  "Nữ Phụ",
  "Light Novel",
  "Việt Nam",
  "Đoản Văn",
  "Khác",
];
let chapters = ["Dưới 100 chương", "100-500 chương", "500-1000 chương", "Trên 1000 chương"];
let settings=['Mode'];

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    // Thực hiện hành động tìm kiếm với searchQuery
    console.log("Search query:", searchQuery);
    // Ví dụ: redirect hoặc thực hiện tìm kiếm trong trang hiện tại
    navigate(`/search/:${searchQuery}`);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Navbar expand="md" className="bg-body-tertiary" style={{ padding: "0px" }}>
      <Container fluid style={{ backgroundColor: "#DDF2FD" }}>
        <Navbar.Brand href="/">
          <img
            src={`${process.env.PUBLIC_URL}/images/title.png`}
            alt={TITLE}
            style={{ width: "100px", height: "auto" }}
          />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {title.map((item, index) => (
            <NavDropdown key={index} title={<span>{item}</span>} id='navbarScrollingDropdown'>
              {index===0 && list.map((item, index) => (<NavDropdown.Item href={`/search/${item}`}>{item}</NavDropdown.Item>))}

              {index===1 && categories.map((item, _index) => (
               <NavDropdown.Item href={`/search/${item}`}>{item}</NavDropdown.Item>
              ))}
                
              {index===2 && chapters.map((item, index) => (<NavDropdown.Item href={`/search/${item}`}>{item}</NavDropdown.Item>))}

              {index===3 && settings.map((item, index) => (<NavDropdown.Item href={`/search/${item}`}>{item}</NavDropdown.Item>))}

            </NavDropdown>))}
          </Nav>

          <Form className="d-flex" style={{ width: "30%" }}>
            <Form.Control
              type="search"
              placeholder="Nhập tên truyện, tác giả, thể loại.."
              className="me-2 w-100"
              aria-label="Search"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <Button variant="outline-success" onClick={handleSearch}>
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
