
import { TableContainer, Table, TableCaption, Thead, Tr, Th, Td, Tbody, Tfoot } from '@chakra-ui/react';
import useSearchFetching from '../../services/search.service.js';
import {useState, useEffect} from 'react';

function StoryNew() {
    const [storyNewData, setStoryNewData] = useState([]);
    const { data, loading } = useSearchFetching('/search/story-new');

    useEffect(() => {
        if (!loading && data && data.length > 0) {
            // Lấy 5 phần tử đầu tiên từ data và cập nhật state
            setStoryNewData(data.slice(0, 10));
        }
    }, [data, loading]);
  return (
    <> 
        <h2>Story new</h2>
        <TableContainer>
            <Table variant='simple'>
                    <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Category</Th>
                        <Th>Chapter</Th>
                        <Th>Last Update</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {storyNewData.map((item, index) => (
                        <Tr key={index}>
                            <Td><a href='#'>{item.title}</a></Td>
                            <Td>{item.categories}</Td>
                            <Td>{item.total_chapters}</Td>
                            <Td>{item.time}</Td>
                        </Tr>
                    ))}
                    </Tbody>  
            </Table>
            </TableContainer>
    </>
  )
}

export default StoryNew
