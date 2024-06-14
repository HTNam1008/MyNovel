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
  } from "@chakra-ui/react";
  
  import useSearchFetching from "../../services/search.service.js";
  
  import { useState, useEffect } from "react";
  
  import { useNavigate } from "react-router-dom";
  
  import { useTheme } from "../../assets/context/theme.context.js";
  
  import { useServer } from "../../assets/context/server.context.js";
  
  import "../../assets/styles/style.css";
  
  function Search({ title }) {
    const { selectedServer } = useServer();
    console.log('Search query 3:', title);
    const [storyData, setStoryData] = useState([]);
    const { data, loading } = useSearchFetching(`/${selectedServer}/search/${title}`);
  
    useEffect(() => {
      if (!loading && data && data.length > 0) {
        setStoryData(data.slice(0, 12));
      }
    }, [data, loading]);
  
    const navigate = useNavigate();
  
    const handleClick = (id) => {
      console.log("Item Click:", id);
      navigate(`/detail/${id}/${title}`);
    };
  
    const { theme } = useTheme();
    
    // Remove ":" from title
  const sanitizedTitle = title.replace(/:/g, "");

    return (
      <>
        <VStack spacing={4} align="stretch" style={{padding: "100px 50px 50px 50px", 
            }}>
            <Heading size="lg" mb={4} style={{color:"#13ABA2", textDecoration: "underline",textUnderlineOffset: "8px"}}>
                Kết quả tìm kiếm cho từ "{sanitizedTitle}"
            </Heading>
          {loading
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
                    width: "60%", // Adjust the width of the card here
                    margin: "0 auto", // Center the card horizontally
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
                    width: "60%", // Adjust the width of the card here
                    margin: "0 auto", // Center the card horizontally
                  }}
                  onClick={() => handleClick(item.id, item.titleUrl ? item.titleUrl : item.title)}
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
                    />
                  </CardHeader>
                  <CardBody style={{ flex: 1, padding: "5px" }}>
                    <Heading size="md" mt="2">
                      {item.title}
                    </Heading>
                    <ChakraText fontSize="sm" style ={{margin:"0px"}}>Số chương: {item.total_chapters}</ChakraText>
                    <ChakraText fontSize="sm">Loại truyện: {item.categories}</ChakraText>
                  </CardBody>
                </Card>
              ))}
        </VStack>
      </>
    );
  }
  
  export default Search;
  