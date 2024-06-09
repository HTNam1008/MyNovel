import React, { Fragment } from "react";
import { Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useDetailFetching from "../../services/detail.service.js";
import useChapterFetching from "../../services/chapter.service.js";
import { useNavigate } from "react-router";

function vietnameseToSlug(str) {
  // Chuyển đổi chuỗi thành chữ thường
  str = str.toLowerCase();
  
  // Loại bỏ các ký tự đặc biệt, ký tự có dấu
  const fromChars = "àáãạảăằắẵặẳâầấẫậẩèéẽẹẻêềếễệểìíĩịỉòóõọỏôồốỗộổơờớỡợởùúũụủưừứữựửỳýỹỵỷđ";
  const toChars =   "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd";
  
  for (let i = 0; i < fromChars.length; i++) {
    str = str.replace(new RegExp(fromChars.charAt(i), 'g'), toChars.charAt(i));
  }
  
  // Thay thế khoảng trắng bằng dấu gạch ngang
  return str.replace(/\s+/g, '-');
}

function getSubstringBeforeColon(inputString) {
  // Tìm vị trí của dấu ":"
  const colonIndex = inputString.indexOf(':');

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
  const { dataDetail, loadingDetail } = useDetailFetching(`/server1/detail/${id}`);
  const { dataChapters, loadingChapters } = useChapterFetching(`/server1/chapters/${id}` );

  const navigate = useNavigate();

  const handleRead = (chapterId,title,numChapter) => {
    // Thực hiện hành động tìm kiếm với searchQuery
    console.log("Item Click:", chapterId,title,numChapter);
    // Ví dụ: redirect hoặc thực hiện tìm kiếm trong trang hiện tại
    navigate(`/story/${chapterId}/${title}/${numChapter}`);
  }

    return (
      <div style={{ display: "block" }}>
        <h2 style={{ color: "White" }}>Chi tiết truyện</h2>
        <ul style={{ color: "White" }}>
          <li>{dataDetail.title}</li>
          <li>{dataDetail.author}</li>
          <li>{dataDetail.categories}</li>
          <li>{dataDetail.status}</li>
          <li>{dataDetail.image}</li>
          <li dangerouslySetInnerHTML={{ __html: dataDetail.description }} />
        </ul>

        {/* <Button >Đọc sách</Button> */}
        <ul style={{ color: "White" }}>
          {dataChapters.map((chapter, index) => (
            <li
              key={index}
              onClick={() => {
                handleRead(chapter.id,vietnameseToSlug(dataDetail.title),vietnameseToSlug(getSubstringBeforeColon(chapter.title)));
              }}
            >
              {chapter.title}
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default Detail;
