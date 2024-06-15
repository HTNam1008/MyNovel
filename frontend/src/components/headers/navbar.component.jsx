import React, { useState, useEffect } from "react";
import { Nav, NavDropdown, Form } from "react-bootstrap";
import Switch from "react-switch";
import { useTheme } from "../../assets/context/theme.context.js";
import WebSocketService from "../../services/webSocket.service.js";
import { Link } from "react-router-dom";

const title = ["Danh sách", "Thể loại"];
const list = ["Truyện hot", "Truyện mới cập nhật", "Truyện full"];
const categories = [
  "Tiên Hiệp",
  "Huyền Huyễn",
  "Đô Thị",
  "Khoa Huyễn",
  "Kiếm Hiệp",
  "Ngôn Tình",
  "Lịch Sử",
  "Đam Mỹ",
  "Quân Sự",
  "Quan Trường",
  "Võng Du",
  "Linh Dị",
  "Hệ Thống",
  "Dị Giới",
  "Dị Năng",
  "Xuyên Không",
  "Trọng Sinh",
  "Xuyên Nhanh",
  "Trinh Thám",
  "Thám Hiểm",
  "Ngược",
  "Sủng",
  "Cung Đấu",
  "Nữ Cường",
  "Gia Đấu",
  "Đông Phương",
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
// const chapters = ["Dưới 100 chương", "100-500 chương", "500-1000 chương", "Trên 1000 chương"];

function NavBar({ theme, selectedServer, setSelectedServer }) {
  const { toggleTheme } = useTheme();
  const [dataPlugins, setDataPlugins] = useState(null);
  const [error, setError] = useState(null);
  const [loadingPlugins, setLoading] = useState(true);

  useEffect(() => {
    const webSocketService = new WebSocketService(
      "/api/plugins",
      15000,
      "server"
    );

    const handleDataUpdate = (data) => {
      setDataPlugins(data);
      setLoading(false);
    };

    const handleError = (error) => {
      setError(error);
      setLoading(false);
    };

    webSocketService.setDataUpdateHandler(handleDataUpdate);
    webSocketService.setErrorHandler(handleError);
    webSocketService.startPolling();

    return () => {
      webSocketService.stopPolling();
    };
  }, []);

  const handleServerChange = (event) => {
    setSelectedServer(event.target.value);
  };

  const handleNavigate = (event) => {};

  return (
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
                fontFamily: "Netflix Sans",
                fontWeight: "550",
                paddingLeft: "10px",
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/menu.png`}
                alt=""
                style={{ width: "20px", height: "22px", marginRight: "5px" }}
              />{" "}
              {item}
            </span>
          }
          id="navbarScrollingDropdown"
        >
          {index === 0 &&
            list.map((item, itemIndex) => (
              <NavDropdown.Item
                key={itemIndex}
                className="dropdown-item table-link"
                onClick={handleNavigate}
                as={Link}
                to={`/list/${item}/${"none"}/${parseInt(itemIndex)+1}`}
              >
                {item}
              </NavDropdown.Item>
            ))}
          {index === 1 && (
            <div className="dropdown-menu-multi-column">
              {categories.map((item, itemIndex) => (
                <NavDropdown.Item
                  key={itemIndex}
                  className="dropdown-item table-link"
                  onClick={handleNavigate}
                  as={Link}
                  to={`/list/${"none"}/${item}/${parseInt(itemIndex) + 1}`}
                >
                  {item}
                </NavDropdown.Item>
              ))}
            </div>
          )}
          {/* {index === 2 &&
            chapters.map((item, index) => (
              <NavDropdown.Item key={index} href={`/search/${vietnameseTo_(item)}`} className="dropdown-item table-link">
                {item}
              </NavDropdown.Item>
            ))} */}
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
              style={{ width: "20px", height: "22px", marginRight: "5px" }}
            />{" "}
            Chế Độ
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
      </NavDropdown>

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
              style={{ width: "20px", height: "22px", marginRight: "5px" }}
            />{" "}
            Chọn server
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
        <NavDropdown.Item className="table-link">
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
                      name="server"
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
  );
}

export default NavBar;
