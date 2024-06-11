import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  Button,
} from "react-bootstrap";
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import { useTheme } from "../../assets/context/theme.context.js";
import { useServer } from "../../assets/context/server.context.js";
import WebSocketService from "../../services/webSocket.service.js";
import "../../assets/styles/style.css";

const TITLE = "My Novel";
let title = ["Danh sách", "Thể loại", "Phân loại theo chương"];
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
let chapters = [
  "Dưới 100 chương",
  "100-500 chương",
  "500-1000 chương",
  "Trên 1000 chương",
];

function Header() {
  // ----- Search query -----
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
  // ----- Search query end-----

  // ----- Theme -----
  const { theme, toggleTheme } = useTheme();

  // ----- Theme end -----

  // ----- Set server default -----
  const { selectedServer, setSelectedServer } = useServer();

  const handleServerChange = (event) => {
    setSelectedServer(event.target.value);
  };
  // ----- Set server default end -----

  // ----- Get list plugins -----

  const [dataPlugins, setDataPlugins] = useState(null);
  const [error, setError] = useState(null);
  const [loadingPlugins, setLoading] = useState(true); // Mặc định là true khi đang loading

  useEffect(() => {
    // Tạo một instance của WebSocketService
    const webSocketService = new WebSocketService("/api/plugins");

    // Xử lý sự kiện khi dữ liệu được cập nhật
    const handleDataUpdate = (data) => {
      setDataPlugins(data);
      setLoading(false); // Dừng loading khi có dữ liệu
    };

    // Xử lý sự kiện khi có lỗi
    const handleError = (error) => {
      setError(error);
      setLoading(false); // Dừng loading khi có lỗi
    };

    // Đăng ký các hàm callback cho WebSocketService
    webSocketService.setDataUpdateHandler(handleDataUpdate);
    webSocketService.setErrorHandler(handleError);

    // Bắt đầu polling khi component được mount
    webSocketService.startPolling();

    // Đảm bảo rằng chúng ta dừng polling khi component unmount
    return () => {
      webSocketService.stopPolling();
    };
  }, []); // useEffect sẽ chỉ chạy một lần khi component được mount

  // ----- Get list plugins end -----

  // State for header background
  const [headerBg, setHeaderBg] = useState(
    "linear-gradient(180deg, rgba(18, 18, 20, .68), transparent)"
  );

  // Effect to handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const headerHeight = 0.55 * windowHeight;

      if (scrollPosition > headerHeight) {
        // setHeaderBg("linear-gradient(to bottom,  #64CCC5, #176B87,#053B50)");
        setHeaderBg("linear-gradient(0, rgba(18, 18, 20, .68), transparent)");

        
      } else {
        setHeaderBg("linear-gradient(180deg, rgba(18, 18, 20, .68), transparent)");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed", // Make the header float
        top: "0",
        left: "0",
        width: "100%", // Full width
        background: headerBg, // Dynamic background based on scroll position
        zIndex: "1000", // Ensure the header is on top
        transition: "background 0.3s ease", // Smooth transition for background change
      }}
    >
      <Navbar
        expand="md"
        style={{
          padding: "0px",
          height: "80px",
        }}
      >
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              src={`${process.env.PUBLIC_URL}/images/logo.png`}
              alt={TITLE}
              style={{ width: "80px", height: "80px",backgroundColor:'transparent' }}
            />{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "120px", display: "flex" }}
              navbarScroll
            >
              {title.map((item, index) => (
                <NavDropdown
                  key={index}
                  title={
                    <span
                      style={{
                        fontSize: "18px",
                        color: "#fff",
                        display: "inline-flex",
                        fontFamily: 'Netflix Sans',
                        fontWeight: "550",
                        paddingLeft: "10px",
                      }}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/images/menu.png`}
                        alt=""
                        style={{
                          width: "20px",
                          height: "22px",
                          marginRight: "5px",
                        }}
                      />{" "}
                      {item}
                    </span>
                  }
                  id="navbarScrollingDropdown"
                >
                  {index === 0 &&
                    list.map((item, index) => (
                      <NavDropdown.Item
                        key={index}
                        href={`/search/${item}`}
                        className="dropdown-item table-link"
                      >
                        {item}
                      </NavDropdown.Item>
                    ))}

                  {index === 1 && (
                    <div className="dropdown-menu-multi-column">
                      {categories.map((item, itemIndex) => (
                        <NavDropdown.Item
                          key={itemIndex}
                          href={`/search/${item}`}
                          className="dropdown-item table-link"
                        >
                          {item}
                        </NavDropdown.Item>
                      ))}
                    </div>
                  )}

                  {index === 2 &&
                    chapters.map((item, index) => (
                      <NavDropdown.Item
                        key={index}
                        href={`/search/${item}`}
                        className="dropdown-item table-link"
                      >
                        {item}
                      </NavDropdown.Item>
                    ))}
                </NavDropdown>
              ))}

              <NavDropdown
                title={
                  <span
                    style={{
                      fontSize: "18px",
                      color: "#fff",
                      fontFamily: "Netflix Sans",
                      fontWeight: "550",
                      display: "inline-flex",
                      paddingLeft: "10px",
                    }}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/menu.png`}
                      alt=""
                      style={{
                        width: "20px",
                        height: "22px",
                        marginRight: "5px",
                      }}
                    />{" "}
                    Cài đặt
                  </span>
                }
                id="navbarScrollingDropdown"
                style={{
                  fontSize: "18px",
                  color: "#053B50",
                  display: "inline-flex",
                  paddingLeft: "10px",
                }}
              >
                <NavDropdown.Item className="dropdown-item table-link">
                  <div className="d-flex align-items-center">
                    <span className="me-2">
                      {theme === "light" ? "Light Mode" : "Dark Mode"}
                    </span>
                    <Switch
                      onChange={toggleTheme}
                      checked={theme === "dark"}
                      onColor="#000"
                      offColor="#ddd"
                      checkedIcon={false}
                      uncheckedIcon={false}
                      handleDiameter={10}
                      height={15}
                      width={30}
                    />
                  </div>
                </NavDropdown.Item>
                <NavDropdown.Item className="table-link">
                  <div>
                    {loadingPlugins ? (
                      <div>Loading...</div>
                    ) : (
                      <div>
                        <NavDropdown.ItemText>
                          Server mặc định{" "}
                        </NavDropdown.ItemText>
                        <Form>
                          {dataPlugins.map((plugin) => (
                            <Form.Check
                              key={plugin.endpoint}
                              type="radio"
                              label={plugin.name}
                              name="server" // Giữ tên nhóm là "server"
                              id={`${plugin.name}`}
                              value={plugin.name}
                              checked={selectedServer === plugin.name}
                              onChange={handleServerChange}
                            />
                          ))}
                        </Form>
                      </div>
                    )}
                  </div>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Form
              className="d-flex custom-placeholder"
              style={{ width: "25%", paddingRight: "40px", backgroundColor:'transparent'}}
            >
              <Form.Control
                type="search"
                placeholder="Nhập tên truyện, tác giả, thể loại.."
                className="me-2 w-100 "
                aria-label="Search"
                value={searchQuery}
                onChange={handleInputChange}
                style={{
                  border: "1px solid white", // Customize the border color and width
                  borderRadius: "20px", // Optional: Add rounded corners
                  padding: "10px", // Optional: Add padding for better look
                  backgroundColor: "transparent", // Optional: Add background color
                  color:"white"
                }}
              />
              <Button
                variant="outline-success"
                onClick={handleSearch}
                style={{ borderRadius: "20px", border: "1px solid white" }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/search.png`}
                  alt="Search"
                  style={{ width: "30px", height: "30px", color:"white" }} // Adjust the size of the image
                />
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
