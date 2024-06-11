import {
  SimpleGrid,
  Image,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,

} from "@chakra-ui/react";

import useSearchFetching from "../../services/search.service.js";

import { useState, useEffect } from "react";

import { useNavigate } from 'react-router-dom';

import { useTheme } from "../../assets/context/theme.context.js";

import { useServer } from "../../assets/context/server.context.js";

function StoryUpdate() {
  // ----- Get Server Default -----
  const {selectedServer}=useServer();
  console.log('Selected Server - update:', selectedServer)

  // ----- Get Server Default End -----

  // ----- Story Update -----
  const [storyUpdateData, setStoryUpdateData] = useState([]);
  const { data, loading } = useSearchFetching(`/${selectedServer}/search/story-update`);

  useEffect(() => {
    if (!loading && data && data.length > 0) {
      // Lấy 5 phần tử đầu tiên từ data và cập nhật state
      setStoryUpdateData(data.slice(0, 12));
    }
  }, [data, loading]);

    const navigate = useNavigate();

    const handleClick = (id) => {
      console.log("Item Click:", id);
      navigate(`/detail/${id}`);
    };
  // ----- Story Update End -----

  // ----- Theme -----
  const {theme}=useTheme();

  // ----- Theme End -----

  return (
    <>
      <h2 style={{ color: theme === "dark" ? "#fff" : "#000" }}>Truyện mới cập nhật</h2>

      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {storyUpdateData.map((item, index) => (
          <Card
            key={index}
            onClick={() => handleClick(item.id)}
            bg={theme === "dark" ? "#fff" : "#1D3557"} // Đặt màu nền tùy thuộc vào chủ đề
            color={theme === "dark" ? "#000" : "#fff"} //
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
