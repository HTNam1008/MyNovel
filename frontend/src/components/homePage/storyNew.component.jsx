import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Tfoot,
  Skeleton,
} from "@chakra-ui/react";

import useSearchFetching from "../../services/search.service.js";
import { useState, useEffect } from "react";
import styles from "../../assets/styles/style.css";

function StoryNew() {
  const [storyNewData, setStoryNewData] = useState([]);
  const { data, loading } = useSearchFetching("/server1/search/story-new");

  useEffect(() => {
    if (!loading && data && data.length > 0) {
      // Lấy 5 phần tử đầu tiên từ data và cập nhật state
      setStoryNewData(data.slice(0, 10));
    }
  }, [data, loading]);
  return (
    <div>
      <h2 style={{
        color: "white",
        padding: '16px',
        fontFamily:  'Monterrat, sans-serif',
        fontSize: "2em", // Tùy chỉnh kích thước font
        fontWeight: "bold", // Đậm hơn
        textDecoration:"underline",
        textUnderlineOffset:"8px",
        transition: "transform 0.3s, color 0.3s", // Thêm hiệu ứng chuyển động khi hover
        ':hover': {
          transform: "scale(1.05)", // Phóng to khi hover
          color: "#FFD700" // Thay đổi màu khi hover
        }
      }}>
        Truyện mới đăng
      </h2>
      <TableContainer style={{ color: "#DDF2FD"}}>
        <Table variant="simple" border="1px" borderColor="#E2E8F0" borderRadius="md">
          <Thead bg="#13ABA2">
            <Tr>
              <Th style={{ color: "#DDF2FD", fontSize:'14px' }}>Tên</Th>
              <Th style={{ color: "#DDF2FD", fontSize:'14px' }}>Thể loại</Th>
              <Th style={{ color: "#DDF2FD", fontSize:'14px' }}>Số chương</Th>
              <Th style={{ color: "#DDF2FD", fontSize:'14px' }}>Lần cuối cập nhật</Th>
            </Tr>
          </Thead>
          <Tbody>
          {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <Tr key={index}>
                  <Td><Skeleton height="20px" /></Td>
                  <Td><Skeleton height="20px" /></Td>
                  <Td><Skeleton height="20px" /></Td>
                  <Td><Skeleton height="20px" /></Td>
                </Tr>
              ))
            ) : (
              storyNewData.map((item, index) => (
                <Tr key={index}>
                  <Td>
                    <a href="#" className={styles["table-link"]} style={{ textDecoration: "none", color: "#DDF2FD" }}>
                      {item.title}
                    </a>
                  </Td>
                  <Td>{item.categories}</Td>
                  <Td>{item.total_chapters}</Td>
                  <Td>{item.time}</Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>

    </div>
  );
}

export default StoryNew;
