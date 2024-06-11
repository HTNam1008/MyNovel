import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from "@chakra-ui/react";

import useSearchFetching from "../../services/search.service.js";
import { useState, useEffect } from "react";
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

  // ----- Story new End -----
  // ----- Theme -----
  const { theme } = useTheme();
  // ----- Theme End -----
  return (
    <div>
      <h2 style={{ color: theme === "dark" ? "#fff" : "#000" }}>Truyện mới đăng</h2>
      <TableContainer>
        <Table variant="simple">
          <Thead >
            <Tr >
              <Th style={{ color: theme === "dark" ? "#fff" : "#000" }}>Tên</Th>
              <Th style={{ color: theme === "dark" ? "#fff" : "#000" }}>Thể loại</Th>
              <Th style={{ color: theme === "dark" ? "#fff" : "#000" }}>Số chương</Th>
              <Th style={{ color: theme === "dark" ? "#fff" : "#000" }}>Lần cuối cập nhật</Th>
            </Tr>
          </Thead>
          <Tbody style={{ color: theme === "dark" ? "#fff" : "#000" }}>
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
