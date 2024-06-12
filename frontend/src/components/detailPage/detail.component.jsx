import React from "react";
import { Button, Container } from "react-bootstrap";
import useDetailFetching from "../../services/detail.service.js";
import useChapterFetching from "../../services/chapter.service.js";
import { useNavigate } from "react-router";
import { useServer } from "../../assets/context/server.context.js";
import { useTheme } from "../../assets/context/theme.context.js";
import "../../assets/styles/style.css";

function vietnameseToSlug(str) {
  // Chuyển đổi chuỗi thành chữ thường
  str = str.toLowerCase();

  // Loại bỏ các ký tự đặc biệt, ký tự có dấu
  const fromChars =
    "àáãạảăằắẵặẳâầấẫậẩèéẽẹẻêềếễệểìíĩịỉòóõọỏôồốỗộổơờớỡợởùúũụủưừứữựửỳýỹỵỷđ";
  const toChars =
    "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd";

  for (let i = 0; i < fromChars.length; i++) {
    str = str.replace(new RegExp(fromChars.charAt(i), "g"), toChars.charAt(i));
  }

  // Thay thế khoảng trắng bằng dấu gạch ngang
  return str.replace(/\s+/g, "-");
}

function getSubstringBeforeColon(inputString) {
  // Tìm vị trí của dấu ":"
  const colonIndex = inputString.indexOf(":");

  // Nếu không tìm thấy dấu ":" trong chuỗi
  if (colonIndex === -1) {
    // Trả về chuỗi ban đầu
    return inputString.trim();
  }

  // Lấy chuỗi con từ đầu đến vị trí của dấu ":"
  const trimmedSubstring = inputString.substring(0, colonIndex).trim();
  return trimmedSubstring;
}

function Detail({ id }) {
  // ----- Get Server Default -----
  const { selectedServer } = useServer();
  console.log("Selected Server - detail:", selectedServer);
  // ----- Get Server Default End -----

  const { dataDetail } = useDetailFetching(`/${selectedServer}/detail/${id}`);
  const { dataChapters } = useChapterFetching(
    `/${selectedServer}/chapters/${id}`
  );

  const navigate = useNavigate();

  const handleRead = (chapterId, title, numChapter) => {
    // Thực hiện hành động tìm kiếm với searchQuery
    console.log("Item Click:", chapterId, title, numChapter);
    // Ví dụ: redirect hoặc thực hiện tìm kiếm trong trang hiện tại
    navigate(`/story/${chapterId}/${title}/${numChapter}`);
  };
  // ----- Theme -----
  const { theme } = useTheme();
  // ----- Theme End -----

  // ----- Read first chapter -----

  const readFirstChap = (chapterId, title) => {
    // Đọc chương đầu tiên
    navigate(`/story/${chapterId}/${title}/chuong-1`);
  };
  // ----- Read first chapter end -----

  const imageUrl =
    dataDetail.image == null
      ? "https://www.huber-online.com/daisy_website_files/_processed_/8/0/csm_no-image_d5c4ab1322.jpg"
      : dataDetail.image;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        // background: `url(${dataDetail.image}) no-repeat center/cover, linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5))`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container className="d-flex justify-content-center">
        <div
          className="story-detail"
          style={{
            marginTop: "100px",
            marginBottom: "50px",
            display: "block",
            color: theme === "dark" ? "#000" : "#fff",
            padding: "0% 5%",
            backgroundColor: theme === "dark" ? "#DDF2FD" : "#1D3557",
            borderRadius: "20px",
            width: "100%",
          }}
        >
          <h2
            style={{
              color: theme === "dark" ? "#000" : "#fff",
              padding: "16px",
              fontFamily: "Monterrat, sans-serif",
              fontSize: "2em", // Tùy chỉnh kích thước font
              fontWeight: "bold", // Đậm hơn
              textDecoration: "underline",
              textUnderlineOffset: "8px",
              transition: "transform 0.3s, color 0.3s", // Thêm hiệu ứng chuyển động khi hover
              ":hover": {
                transform: "scale(1.05)", // Phóng to khi hover
                color: "#FFD700", // Thay đổi màu khi hover
              },
            }}
          >
            Thông tin truyện
          </h2>
          <div
            className="story-info container"
            style={{ padding: "0px 30px 30px 30px", display: "flex", alignItems: "center" }}
          >
            <div className="book" style={{ marginRight: "50px" }}>
              <img
                src={imageUrl}
                alt={dataDetail.title}
                style={{ height: "auto", width: "250px", borderRadius: "5px" }}
              />
            </div>
            <div style={{ flex: 1, padding: "100px" }}>
              <h2 className="story-title" style={{ padding: "20px 30px" }}>
                {dataDetail.title}
              </h2>
              <ul style={{ listStyleType: "none", fontSize: "20px" }}>
                <li>
                  Tác giả: <b>{dataDetail.author}</b>
                </li>
                <li>
                  Thể loại: <b>{dataDetail.categories}</b>
                </li>
                <li>
                  Tình trạng: <b>{dataDetail.status}</b>
                </li>
                <li>
                  Cập nhật: <b>{dataDetail.time}</b>
                </li>
                <Button
                  onClick={() =>
                    readFirstChap(
                      dataChapters[0].id,
                      vietnameseToSlug(dataDetail.title)
                    )
                  }
                  style={{ cursor: "pointer", marginTop: "20px" }}
                >
                  Đọc từ đầu
                </Button>
              </ul>
            </div>
          </div>
          <h4 style={{ color: "#DDF2FD", margin: "20px 0" }}>Giới thiệu</h4>
          <div
            className="story-description"
            dangerouslySetInnerHTML={{ __html: dataDetail.description }}
          />
          <h4 style={{ color: "#DDF2FD", margin: "40px 0 20px" }}>
            Danh sách chương
          </h4>
          <ul
            className="chapter-list"
            style={{
              margin: "20px",
              padding: "5px 10px",
              listStyleType: "none",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            {dataChapters.map((chapter, index) => (
              <li
                key={index}
                onClick={() =>
                  handleRead(
                    chapter.id,
                    vietnameseToSlug(dataDetail.title),
                    vietnameseToSlug(getSubstringBeforeColon(chapter.title))
                  )
                }
                style={{
                  fontWeight: "550",
                  cursor: "pointer",
                  margin: "3px",
                  borderBottom:
                    index < dataChapters.length - 1 ? "1px solid #ccc" : "none",
                }}
              >
                {chapter.title}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}

export default Detail;
