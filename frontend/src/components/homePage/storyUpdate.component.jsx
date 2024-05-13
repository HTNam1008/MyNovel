
import { SimpleGrid,Image, Heading, Text, Button,Card, CardHeader, CardBody, CardFooter, Container } from '@chakra-ui/react';
import useSearchFetching from '../../services/search.service.js';
import {useState, useEffect} from 'react';

function StoryUpdate() {
    const [storyUpdateData, setStoryUpdateData] = useState([]);
    const { data, loading } = useSearchFetching('/search/story-update');

    useEffect(() => {
        if (!loading && data && data.length > 0) {
            // Lấy 5 phần tử đầu tiên từ data và cập nhật state
            setStoryUpdateData(data.slice(0, 5));
        }
    }, [data, loading]);
  return (
    <>  
        <h2>Story update</h2>
        <SimpleGrid  spacing={4} templateColumns='repeat(auto-fill, minmax(160px, 1fr))'>
            {storyUpdateData.map((item, index) => (
                <Card key={index}>
                    <CardHeader>
                        <Heading size='md'>{item.title}</Heading>
                    </CardHeader>
                    <CardBody>
                        <Image
                            src={item.image}
                            alt={item.title}
                            borderRadius='lg'
                        />
                        <Text>{item.title}</Text>
                        {item.is_full ? <Text>Full</Text> : <Text>Not-Full</Text>}
                    </CardBody>
                    <CardFooter>
                        <Button>View here</Button>
                    </CardFooter>
                </Card>
            ))}
        </SimpleGrid>
    </>
  )
}

export default StoryUpdate
