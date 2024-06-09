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
} from "@chakra-ui/react";

import useSearchFetching from "../../services/search.service.js";
import { useState, useEffect } from "react";

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
      <h2 style={{ color: "White" }}>Truyện mới đăng</h2>
      <TableContainer style={{ color: "#DDF2FD" }}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th style={{ color: "White" }}>Tên</Th>
              <Th style={{ color: "White" }}>Thể loại</Th>
              <Th style={{ color: "White" }}>Số chương</Th>
              <Th style={{ color: "White" }}>Lần cuối cập nhật</Th>
            </Tr>
          </Thead>
          <Tbody>
            {storyNewData.map((item, index) => (
              <Tr key={index}>
                <Td>
                  <a href="#">{item.title}</a>
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
