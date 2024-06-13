import React from 'react'
import {
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    Skeleton,
} from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import useSearchFetching from '../../services/search.service.js';
import { useNavigate } from 'react-router-dom';
import { useServer } from '../../assets/context/server.context.js';
import { useTheme } from "../../assets/context/theme.context.js";
import "../../assets/styles/style.css";

function Search({ title }) {

    // ----- Get server default -----
    const { selectedServer } = useServer();

    // ----- Get server default end -----
    console.log('Search query 3:', title)
    const [storyData, setStoryData] = useState([]);
    const { data, loading } = useSearchFetching(`/${selectedServer}/search/${title}`);

    useEffect(() => {
        if (!loading && data && data.length > 0) {
            // Lấy 5 phần tử đầu tiên từ data và cập nhật state
            setStoryData(data.slice(0, 10));
        }
    }, [data, loading]);

    const navigate = useNavigate();

    const handleClick = (id) => {
        // Thực hiện hành động khi click vào mỗi dòng
        console.log("Item Click:", id);
        // Ví dụ: redirect hoặc thực hiện tìm kiếm trong trang hiện tại
        navigate(`/detail/${id}/${title}`);
    };

    const { theme } = useTheme();

    return (
        <div style={{ marginTop: '80px' }} >
            <TableContainer style={{ color: "#DDF2FD" }}>
                <Table
                    variant="simple"
                    border="1px"
                    borderColor="#E2E8F0"
                    borderRadius="md"
                >
                    <Thead bg="#13ABA2">
                        <Tr style={{ color: theme === "dark" ? "#fff" : "#000" }}>
                            <Th>Tên</Th>
                            <Th>Thể loại</Th>
                            <Th>Số chương</Th>
                            <Th>Lần cuối cập nhật</Th>
                        </Tr>
                    </Thead>
                    <Tbody style={{ color: theme !== "dark" ? "#fff" : "#000" }}  >
                        {loading ? Array.from({ length: 1 }).map((_, index) => (
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
                            : storyData.map((item, index) => (
                                <Tr
                                    key={index}
                                    onClick={() => handleClick(item.id)}
                                    className="text-table-link"
                                    style={{ cursor: "pointer" }}
                                >
                                    <Td style={{ fontWeight: "550" }}>{item.title}</Td>
                                    <Td>{item.categories}</Td>
                                    <Td>{item.total_chapters}</Td>
                                    <Td>{item.time}</Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Search