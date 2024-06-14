import React, { useState, useEffect, useRef } from "react";
import { Button, Container } from "react-bootstrap";
import useDetailFetching from "../../services/detail.service.js";
import useChapterFetching from "../../services/chapter.service.js";
import { useNavigate } from "react-router";
import { useServer } from "../../assets/context/server.context.js";
import { useTheme } from "../../assets/context/theme.context.js";
import "../../assets/styles/style.css";
import { vietnameseToSlug, getSubstringBeforeColon } from "../../utils/function.js";
import StoryDescription from "./description.component.jsx";
import ExportButton from "./export.component.jsx";

function Detail({ id, title }) {
  let _title = title;
  const { selectedServer } = useServer();
  const { dataDetail } = useDetailFetching(`/${selectedServer}/detail/${id}/${title}`);
  const { dataChapters } = useChapterFetching(`/${selectedServer}/chapters/${id}/${title}`);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const descriptionRef = useRef(null);

  const handleDescriptionResize = () => {
    if (descriptionRef.current) {
      setDescriptionHeight(descriptionRef.current.scrollHeight);
    }
  };

  useEffect(() => {
    handleDescriptionResize();
  }, [dataDetail]);

  const handleRead = (chapterId, _title, numChapter) => {
    navigate(`/story/${chapterId}/${_title}/${numChapter}`);
  };

  const readFirstChap = (chapterId, _title) => {
    navigate(`/story/${chapterId}/${_title}/chuong-1`);
  };


  const imageUrl = dataDetail?.image
    ? dataDetail.image
    : "https://www.huber-online.com/daisy_website_files/_processed_/8/0/csm_no-image_d5c4ab1322.jpg";




  return (
    <div
      style={{
        width: "100%",
        height: "100%",
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
              fontSize: "2em",
              fontWeight: "bold",
              textDecoration: "underline",
              textUnderlineOffset: "8px",
              transition: "transform 0.3s, color 0.3s",
              ":hover": {
                transform: "scale(1.05)",
                color: "#FFD700",
              },
            }}
          >
            Thông tin truyện
          </h2>
          <div
            className="story-info container"
            style={{ padding: "30px 30px 30px 30px", display: "flex", alignItems: "center" }}
          >
            <div className="book" style={{ marginRight: "70px" }}>
              <img
                src={imageUrl}
                alt={dataDetail?.title}
                style={{ height: "auto", width: "250px", borderRadius: "0px", border: "1px solid #000", borderLeft: "5px solid #000" }}
              />
            </div>
            <div style={{ flex: 1, color: theme === "dark" ? "#000" : "#fff" }}>
              <h2 className="story-title" style={{ borderBottom: "1px solid #13ABA2", paddingBottom: "20px", fontFamily: "'Black Ops One', sans-serif", fontSize: "2rem" }}>
                {dataDetail?.title}
              </h2>
              <ul style={{ paddingLeft: "0rem" }}>
                <div className="detail-list-container" style={{ borderBottom: "1px solid #13ABA2", paddingBottom: "20px" }}>
                  <span className={`detail-list-label `} style={{ color: theme === "dark" ? "#1D3557" : "#DDF2FD" }}>Tác giả</span>
                  <span className={`detail-list-label `} style={{ color: theme === "dark" ? "#1D3557" : "#DDF2FD" }}>Thể loại</span>
                  <span className={`detail-list-label `} style={{ color: theme === "dark" ? "#1D3557" : "#DDF2FD" }}>Tình trạng</span>
                  <span className={`detail-list-label `} style={{ color: theme === "dark" ? "#1D3557" : "#DDF2FD" }}>Cập nhật</span>

                  <span className={`detail-list-value `} style={{ color: theme === "dark" ? "#000" : "#fff" }}>{dataDetail?.author}</span>
                  <span className={`detail-list-value`} style={{ color: theme === "dark" ? "#000" : "#fff" }}>{dataDetail?.categories}</span>
                  <span className={`detail-list-value `} style={{ color: theme === "dark" ? "#000" : "#fff" }}>{dataDetail?.status}</span>
                  <span className={`detail-list-value`} style={{ color: theme === "dark" ? "#000" : "#fff" }}>{dataDetail?.time}</span>
                </div>

                <div style={{display: 'flex', justifyContent: "space-between"}}>

                <Button className="custom-button"
                  onClick={() => readFirstChap(dataChapters[0].id, _title)}
                >
                  <span style={{ display: 'inline-flex', alignItems: "center", fontWeight: "500", fontSize: "1rem" }}>
                    <img src={`${process.env.PUBLIC_URL}/images/read_book.png`} style={{ marginRight: "8px", width: "20px", height: "20px" }} />
                    Đọc truyện
                  </span>
                </Button>

                <div style={{marginTop:'20px', marginLeft:'20px'}}>
                    <ExportButton data={dataDetail} title={_title} />
                </div>
                </div>

              </ul>
            </div>
          </div>
          <div style={{ display: "flex", padding:" 20px 0px"}}>
            <div style={{ flex: "1" }}>
              <h4 style={{ color: theme === "dark" ? "#000" : "#DDF2FD", paddingLeft:"40px" }}>
                Giới thiệu
              </h4>
              <div ref={descriptionRef}>
                <StoryDescription description={dataDetail?.description} maxLength={500} onToggle={handleDescriptionResize} />
              </div>
            </div>

            <div style={{ flex: "0.5" }}>
              <h4 style={{ color: theme === "dark" ? "#000" : "#DDF2FD" }}>
                Danh sách chương
              </h4>
              <ul
                className="chapter-list"
                style={{
                  listStyleType: "none",
                  backgroundColor: theme === "dark" ? "#DDF2FD" : "#1D3557",
                  borderRadius: "5px",
                  border: '1px solid #13ABA2',
                  height: `${descriptionHeight}px`,
                }}
              >
                {dataChapters?.map((chapter, index) => (
                  <li
                    key={index}
                    onClick={() => handleRead(
                      chapter.id,
                      _title,
                      vietnameseToSlug(getSubstringBeforeColon(chapter.title))
                    )}
                    style={{
                      fontWeight: "500",
                      cursor: "pointer",
                      margin: "3px",
                      borderBottom: index < dataChapters.length - 1 ? "1px solid #ccc" : "none",
                    }}
                  >
                    {chapter.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Detail;
