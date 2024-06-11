// components/homePage/storyBeingRead.component.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/style.css";
import { useTheme } from "../../assets/context/theme.context.js";

const StoryBeingRead = () => {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();
  const { theme } = useTheme();
  useEffect(() => {
    // Lấy dữ liệu từ LocalStorage và đảm bảo dữ liệu là một mảng
    const savedStories =
      JSON.parse(localStorage.getItem("currentReadingState")) || [];
    if (Array.isArray(savedStories)) {
      setStories(savedStories);
    } else {
      setStories([]);
    }
    console.log("Stories:", stories);
  }, []);

  const handleContinueReading = (title, chapterId, numChapter) => {
    // Điều hướng tới chương cụ thể
    navigate(`/story/${chapterId}/${title}/${numChapter}`);
  };

  return (
    <>
      <h2
        style={{
          color: theme === "dark" ? "#fff" : "#000",
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
        Truyện đang đọc
      </h2>
      <div
        className="story-being-read"
        style={{
          backgroundColor: theme === "dark" ? "#fff" : "#1D3557",
          color: theme === "dark" ? "#000" : "#fff",
          fontWeight: "bold",
        }}
      >
        <ul>
          {stories.map((story) => (
            <li
              key={story._title}
              onClick={() =>
                handleContinueReading(
                  story._title,
                  story._chapterId,
                  story._numChapter
                )
              }
              className="story-item"
            >
              <span>{story.title}</span>
              <span>&gt;</span>
              <span>{story.numChapter}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default StoryBeingRead;
