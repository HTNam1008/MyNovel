import {
  SimpleGrid,
  Image,
  Heading,
  Text,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Container,
} from "@chakra-ui/react";

import useSearchFetching from "../../services/search.service.js";

import { useState, useEffect } from "react";

import { useNavigate } from 'react-router-dom';



function StoryUpdate() {
  const [storyUpdateData, setStoryUpdateData] = useState([]);
  const { data, loading } = useSearchFetching("/server1/search/story-update");

  useEffect(() => {
    if (!loading && data && data.length > 0) {
      // Lấy 5 phần tử đầu tiên từ data và cập nhật state
      setStoryUpdateData(data.slice(0, 12));
    }
  }, [data, loading]);

    const navigate = useNavigate();

    const handleClick = (id) => {
      // Thực hiện hành động tìm kiếm với searchQuery
      console.log("Item Click:", id);
      // Ví dụ: redirect hoặc thực hiện tìm kiếm trong trang hiện tại
      navigate(`/detail/${id}`);
    };

  return (
    <>
      <h2 style={{ color: "White" }}>Truyện mới cập nhật</h2>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {storyUpdateData.map((item, index) => (
          <Card
            key={index}
            style={{ backgroundColor: "#DDF2FD" }}
            onClick={() => handleClick(item.id)}
            
          >
            <CardHeader>
              <Image
                src={item.image}
                alt={item.title}
                borderRadius="lg"
                width="200px" // Đặt chiều rộng của hình ảnh là 200px
                height="200px" // Đặt chiều cao của hình ảnh là 200px
              />
            </CardHeader>
            <CardBody>
              <Heading size="md">{item.title}</Heading>

              {item.is_full ? <Text>Full</Text> : <Text>Not-Full</Text>}
            </CardBody>

            {/* <CardFooter>
                <Button  >View here</Button>
            </CardFooter> */}
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}

export default StoryUpdate;
