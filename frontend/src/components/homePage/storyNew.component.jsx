import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Skeleton,
} from "@chakra-ui/react";

import { vietnameseToSlug } from "../../utils/function.js";

import useSearchFetching from "../../services/search.service.js";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useTheme } from "../../assets/context/theme.context.js";

import { useServer } from "../../assets/context/server.context.js";


function StoryNew() {
  // ----- Get Server Default -----
  const {selectedServer}=useServer();
  console.log('Selected Server - new:', selectedServer)
  // ----- Get Server Default End -----

  // ----- Story new -----
  const [storyNewData, setStoryNewData] = useState([]);
  const { data, loading } = useSearchFetching(`/${selectedServer}/search/story-new`);

  useEffect(() => {
    if (!loading && data && data.length > 0) {
      // Lấy 5 phần tử đầu tiên từ data và cập nhật state
      setStoryNewData(data.slice(0, 10));
    }
  }, [data, loading]);

  const navigate = useNavigate();

  const handleClick = (id,title) => {
    console.log("Item Click:", id);
    navigate(`/detail/${id}/${title}`);
  };
  // ----- Story new End -----
  // ----- Theme -----
  const { theme } = useTheme();
  // ----- Theme End -----

  return (
    <div style={{marginBottom: '50px'}}>
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
        Truyện mới đăng
      </h2>
      <TableContainer style={{ color: "#DDF2FD" }}>
        <Table
          variant="simple"
          border="1px"
          borderColor="#E2E8F0"
          borderRadius="md"
        >
          <Thead bg="#13ABA2">
            <Tr>
              <Th style={{ color: theme === "dark" ? "#fff" : "#000" }}>Tên</Th>
              <Th style={{ color: theme === "dark" ? "#fff" : "#000" }}>Thể loại</Th>
              <Th style={{ color: theme === "dark" ? "#fff" : "#000" }}>Số chương</Th>
              <Th style={{ color: theme === "dark" ? "#fff" : "#000" }}>
                Lần cuối cập nhật
              </Th>
            </Tr>
          </Thead>
          <Tbody style={{color: theme === "dark" ? "#fff" : "#000"}}  >
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <Tr key={index}>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                  </Tr>
                ))
              : storyNewData.map((item, index) => (

                  <Tr key={index} className="text-table-link">
                    <Td onClick={() => handleClick(item.id,item.titleUrl ? item.titleUrl : vietnameseToSlug(item.title))}>
                      <a
                        href="#"
                        style={{ textDecoration: "none" }}
                      >
                        {item.title}
                      </a>
                    </Td>
                    <Td>{item.categories}</Td>
                    <Td>{item.total_chapters}</Td>
                    <Td>{item.time}</Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default StoryNew;
