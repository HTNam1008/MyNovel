import {
  SimpleGrid,
  Image,
  Heading,
  Card,
  CardHeader,
  CardBody,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

import useSearchFetching from "../../services/search.service.js";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useTheme } from "../../assets/context/theme.context.js";

import { useServer } from "../../assets/context/server.context.js";

import "../../assets/styles/style.css";




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
      <h2
        style={{
          color: theme === "dark" ? "#fff" : "#000" ,
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
        Truyện mới cập nhật
      </h2>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <Card
                key={index}
                bg={theme === "dark" ? "#fff" : "#1D3557"} 
                color={theme === "dark" ? "#000" : "#fff"}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <CardHeader style={{ paddingBottom: "0px" }}>
                  <Skeleton height="200px" width="200px" borderRadius="lg" />
                </CardHeader>
                <CardBody style={{ flex: 1, padding: "5px" }}>
                  <SkeletonText mt="4" noOfLines={1} spacing="4" />
                </CardBody>
              </Card>
            ))
          : storyUpdateData.map((item, index) => (
              <Card
                className="card"
                key={index}
                bg={theme === "dark" ? "#fff" : "#1D3557"} 
                color={theme === "dark" ? "#000" : "#fff"}

                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  position: "relative",
                }}
                onClick={() => handleClick(item.id)}
              >
                <CardHeader style={{ paddingBottom: "0px" }}>
                  {item.is_full ? (
                    <Image
                      src={`${process.env.PUBLIC_URL}/images/full.png`}
                      alt="Full"
                      boxSize="50px"
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        marginTop: "1px",
                        marginRight: "2px",
                      }}
                    />
                  ) : (
                    <Image
                      src={`${process.env.PUBLIC_URL}/images/not_full.png`}
                      alt="Not Full"
                      boxSize="50px"
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        marginTop: "1px",
                        marginRight: "2px",
                      }}
                    />
                  )}
                  <Image
                    src={item.image}
                    alt={item.title}
                    borderRadius="lg"
                    width="200px"
                    height="200px"
                    style={{ border: "1px solid #053B50" }}
                    className="card-image"
                  />
                </CardHeader>
                <CardBody style={{ flex: 1, padding: "5px" }}>
                  <Heading size="md" mt="2">
                    {item.title}
                  </Heading>
                </CardBody>
              </Card>
            ))}
      </SimpleGrid>
    </>
  );
}

export default StoryUpdate;
