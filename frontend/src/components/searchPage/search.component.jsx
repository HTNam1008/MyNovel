import React from 'react'
import { TableContainer,Table, Thead, Tr, Th, Td, Tbody } from '@chakra-ui/react';
import {useState, useEffect} from 'react';
import useSearchFetching from '../../services/search.service.js';


function Search({title}) {
    console.log('Search query 3:', title )
    const [storyData, setStoryData] = useState([]);
    const { data, loading } = useSearchFetching(`/search/${title}`);

    useEffect(() => {
        if (!loading && data && data.length > 0) {
            // Lấy 5 phần tử đầu tiên từ data và cập nhật state
            setStoryData(data.slice(0, 10));
        }
    }, [data, loading]);
  return (
    <>  
        <h2>Search Story</h2>
        <TableContainer>
            <Table variant='simple'>
                {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                    <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Category</Th>
                        <Th>Chapter</Th>
                        <Th>Last Update</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {storyData.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item.title}</Td>
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

export default Search