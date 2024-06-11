import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/style.css";

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
    <Navbar expand="md" className="bg-body-tertiary" style={{ padding: "0px",height: "120px" }}>
      <Container fluid style={{ backgroundColor: "#DDF2FD" }}>
        <Navbar.Brand href="/">
          <img
            src={`${process.env.PUBLIC_URL}/images/title.png`}
            alt={TITLE}
            style={{ width: "120px", height: "120px" }}
          />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" >
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "120px",display: 'flex'}}
            navbarScroll
          >
            {title.map((item, index) => (
            <NavDropdown key={index} title={<span style={{ fontSize: '18px', color: '#053B50', display: 'inline-flex',paddingLeft:'10px'}}>
              <img src={`${process.env.PUBLIC_URL}/images/menu.png`} alt="" style={{ width: '20px',height: '22px', marginRight: '5px'}} /> {item}</span>} id='navbarScrollingDropdown'>
              {index===0 && list.map((item, index) => (<NavDropdown.Item href={`/search/${item}`} className="dropdown-item">{item}</NavDropdown.Item>))}

              {index===1 && (
                  <div className="dropdown-menu-multi-column">
                    {categories.map((item, itemIndex) => (
                      <NavDropdown.Item key={itemIndex} href={`/search/${item}`} className="dropdown-item">{item}</NavDropdown.Item>
                    ))}
                  </div>
                )}
                
              {index===2 && chapters.map((item, index) => (<NavDropdown.Item href={`/search/${item}`} className="dropdown-item">{item}</NavDropdown.Item>))}

              {index===3 && settings.map((item, index) => (<NavDropdown.Item href={`/search/${item}`} className="dropdown-item">{item}</NavDropdown.Item>))}

            </NavDropdown>))}
          </Nav>

          <Form className="d-flex" style={{ width: "25%" }}>
            <Form.Control
              type="search"
              placeholder="Nhập tên truyện, tác giả, thể loại.."
              className="me-2 w-100"
              aria-label="Search"
              value={searchQuery}
              onChange={handleInputChange}
              style={{
                border: "1px solid #053B50", // Customize the border color and width
                borderRadius: "20px", // Optional: Add rounded corners
                padding: "10px", // Optional: Add padding for better look
              }}
            />
            <Button variant="outline-success" onClick={handleSearch} style={{ borderRadius: "20px", border: "1px solid #053B50" }}>
              <img
                src={`${process.env.PUBLIC_URL}/images/search.png`}
                alt="Search"
                style={{ width: '30px', height: '30px' }} // Adjust the size of the image
              />
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
