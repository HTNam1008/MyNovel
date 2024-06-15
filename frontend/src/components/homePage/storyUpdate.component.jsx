import {
  SimpleGrid,
  Image,
  Heading,
  Card,
  CardHeader,
  CardBody,
  Skeleton,
  SkeletonText,
  Button,
} from "@chakra-ui/react";

import "../../assets/styles/pagination.css";
import "../../assets/styles/homepage.css";
import useSearchFetching from "../../services/search.service.js";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useTheme } from "../../assets/context/theme.context.js";

import { useServer } from "../../assets/context/server.context.js";

import "../../assets/styles/style.css";

import { vietnameseToSlug } from "../../utils/function.js";

function StoryUpdate() {
  // ----- Get Server Default -----
  const { selectedServer } = useServer();
  console.log("Selected Server - update:", selectedServer);

  // ----- Get Server Default End -----

  // ----- get data from API -----
  const [currentPage, setCurrentPage] = useState(1);
  const [storyUpdateData, setStoryUpdateData] = useState([]);

  const fetchUrl = `/${selectedServer}/search/story-update?page=${currentPage}`;
  const { data, loading } = useSearchFetching(fetchUrl);

  useEffect(() => {
    if (!loading && data && data.length > 0) {
      setStoryUpdateData(data.slice(0, 10));
    }
  }, [data, loading, currentPage]);

  const navigate = useNavigate();

  const handleClick = (id, title) => {
    console.log("Item Click:", id,title);
    navigate(`/detail/${id}/${title}`);
  };
  // ----- get data from API end -----


  // ----- Pagination -----
  const itemsPerPage = 10;

  const handlePageChange = (page) => {
    if (page < 1) {
      return;
    }
    setCurrentPage(page);
  };

  const totalPages = Math.ceil((data?.total || 0) / itemsPerPage);
 // ----- Pagination End -----


 // ----- getTheme -----
  const { theme } = useTheme();
  // ----- getTheme End -----
  return (
    <>
      <h2
        style={{
          color: theme === "dark" ? "#fff" : "#000",
          padding: "16px",
          fontFamily: "Monterrat, sans-serif",
          fontSize: "2em",
          fontWeight: "bold",
          textDecoration: "underline",
          textUnderlineOffset: "8px",
          transition: "transform 0.3s, color 0.3s",
          ":hover": {
            transform: "scale(1.05)",
            color: "#FFD700",
          },
        }}
      >
        Truyện mới cập nhật
      </h2>
      <div className="grid-container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            className="prev-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            src={`${process.env.PUBLIC_URL}/images/previous.png`}
            style={{backgroundColor: theme === "dark" ? "#1D3557" : "#DDF2FD"}}
          >
          </Image>
        </div>

        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <Card
                  key={index}
                  bg={theme === "dark" ? "#DDF2FD" : "#1D3557"}
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
                  bg={theme === "dark" ? "#DDF2FD" : "#1D3557"}
                  color={theme === "dark" ? "#000" : "#fff"}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    position: "relative",
                  }}
                  onClick={() =>
                    handleClick(
                      item.id,
                      item.titleUrl ? item.titleUrl : item.title
                    )
                  }
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
                  </CardBody>
                </Card>
              ))}
        </SimpleGrid>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            className="next-button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}

            src={`${process.env.PUBLIC_URL}/images/next.png`}
            style={{backgroundColor: theme === "dark" ? "#1D3557" : "#DDF2FD"}}
          >
          </Image>
        </div>
      </div>
    </>
  );
}

export default StoryUpdate;
