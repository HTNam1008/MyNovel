import {
  VStack,
  Image,
  Text as ChakraText,
  Heading,
  Card,
  CardHeader,
  CardBody,
  Skeleton,
  SkeletonText,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../assets/context/theme.context.js";
import { useServer } from "../../assets/context/server.context.js";
import useSearchFetching from "../../services/search.service.js";
import "../../assets/styles/style.css";
import { vietnameseToSlug } from "../../utils/function.js";

function Search({ title }) {
  const { selectedServer } = useServer();
  const [storyData, setStoryData] = useState([]);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);

  // Remove ":" from title
  title = title.replace(/:/g, "");

  // Fetch data for the current page
  const { data, loading } = useSearchFetching(
    `/${selectedServer}/search/${title}?page=${page}`
  );

  useEffect(() => {
    if (data && data.length > 0) {
      setStoryData((prevData) => [...prevData, ...data.slice(0, 12)]);
    }
  }, [data]);

  useEffect(() => {
    setFetching(loading);
  }, [loading]);

  const navigate = useNavigate();

  const handleClick = (id) => {
    console.log("Item Click:", id);
    navigate(`/detail/${id}/${vietnameseToSlug(title)}`);
  };

  const loadMore = () => {
    if (!fetching) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const { theme } = useTheme();

  return (
    <>
      <VStack
        spacing={4}
        align="stretch"
        style={{ padding: "100px 50px 50px 50px" }}
      >
        <Heading
          size="lg"
          mb={4}
          style={{
            color: "#13ABA2",
            textDecoration: "underline",
            textUnderlineOffset: "8px",
          }}
        >
          Kết quả tìm kiếm cho từ "{title}"
        </Heading>
        {fetching && page === 1
          ? Array.from({ length: 12 }).map((_, index) => (
              <Card
                key={index}
                bg={theme === "dark" ? "#DDF2FD" : "#1D3557"}
                color={theme === "dark" ? "#000" : "#fff"}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  textAlign: "left",
                  position: "relative",
                  width: "60%",
                  margin: "0 auto",
                }}
              >
                <CardHeader style={{ paddingRight: "10px" }}>
                  <Skeleton height="200px" width="200px" borderRadius="lg" />
                </CardHeader>
                <CardBody style={{ flex: 1, padding: "5px" }}>
                  <SkeletonText mt="4" noOfLines={1} spacing="4" />
                </CardBody>
              </Card>
            ))
          : storyData.map((item, index) => (
              <Card
                className="card"
                key={index}
                bg={theme === "dark" ? "#DDF2FD" : "#1D3557"}
                color={theme === "dark" ? "#000" : "#fff"}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  textAlign: "left",
                  position: "relative",
                  width: "60%",
                  margin: "0 auto",
                }}
                onClick={() =>
                  handleClick(
                    item.id,
                    item.titleUrl ? item.titleUrl : item.title
                  )
                }
              >
                <CardHeader style={{ padding: "15px" }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    borderRadius="lg"
                    width="80px"
                    height="80px"
                    style={{ border: "1px solid #053B50" }}
                    className="card-image"
                    onError={(e) => {
                      e.target.onerror = null; // Prevents infinite loop in case the fallback image also fails
                      e.target.src = `${process.env.PUBLIC_URL}/images/default-image.jpg`;
                    }}
                  />
                </CardHeader>
                <CardBody style={{ flex: 1, padding: "5px" }}>
                  <Heading size="md" mt="2">
                    {item.title}
                  </Heading>
                  <ChakraText fontSize="sm" style={{ margin: "0px" }}>
                    Số chương: {item.total_chapters}
                  </ChakraText>
                  <ChakraText fontSize="sm" style={{ margin: "0px" }}>
                    Loại truyện: {item.categories}
                  </ChakraText>
                  <ChakraText fontSize="sm">Tác giả: {item.author}</ChakraText>
                </CardBody>
              </Card>
            ))}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            
          }}
        >
          <Button
            onClick={() => loadMore()}
            isLoading={fetching}
            mt={4}
            style={{ width: "20%" }}
          >
            Xem thêm
          </Button>
        </div>
      </VStack>
    </>
  );
}

export default Search;
