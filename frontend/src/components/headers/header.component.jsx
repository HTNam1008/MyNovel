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
    const webSocketService = new WebSocketService('/api/plugins');

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

  // if (error) {
  //   return <div>Error fetching plugins: {error.message}</div>;
  // }


 // ----- Get list plugins end -----

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
              <NavDropdown
                key={index}
                title={<span>{item}</span>}
                id="navbarScrollingDropdown"
              >
                {index === 0 &&
                  list.map((item, index) => (
                    <NavDropdown.Item key={index} href={`/search/${item}`}>
                      {item}
                    </NavDropdown.Item>
                  ))}

                {index === 1 &&
                  categories.map((item, _index) => (
                    <NavDropdown.Item key={_index} href={`/search/${item}`}>
                      {item}
                    </NavDropdown.Item>
                  ))}

                {index === 2 &&
                  chapters.map((item, index) => (
                    <NavDropdown.Item key={index} href={`/search/${item}`}>
                      {item}
                    </NavDropdown.Item>
                  ))}
              </NavDropdown>
            ))}
            <NavDropdown title="Cài đặt" id="basic-nav-dropdown">
              <NavDropdown.Item>
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
              <NavDropdown.Item>
                <div>
                  {loadingPlugins ? (
                    <div>Loading...</div>
                  ) : (
                    <div>
                    <NavDropdown.ItemText>Server mặc định </NavDropdown.ItemText>
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
