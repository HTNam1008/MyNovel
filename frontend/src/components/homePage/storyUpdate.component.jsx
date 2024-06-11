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
 
 
import "../../assets/styles/style.css";


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
      <h2 style={{
        color: "white",
        padding: '16px',
        fontFamily:  'Monterrat, sans-serif',
        fontSize: "2em", // Tùy chỉnh kích thước font
        fontWeight: "bold", // Đậm hơn
        textDecoration:"underline",
        textUnderlineOffset:"8px",
        transition: "transform 0.3s, color 0.3s", // Thêm hiệu ứng chuyển động khi hover
        ':hover': {
          transform: "scale(1.05)", // Phóng to khi hover
          color: "#FFD700" // Thay đổi màu khi hover
        }
      }}>
        Truyện mới cập nhật
      </h2>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {storyUpdateData.map((item, index) => (
          <Card
            className="card"
            key={index}
            style={{ backgroundColor: "#DDF2FD", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",position: "relative"}}
            onClick={() => handleClick(item.id)}
            
          >
            <CardHeader style ={{paddingBottom:'0px'}}>
              {item.is_full ? (
                <Image src={`${process.env.PUBLIC_URL}/images/full.png`} alt="Full" boxSize="50px" style={{ position: "absolute", // Đặt vị trí của ảnh là absolute
                  top: "0", // Căn đỉnh của ảnh với đỉnh của thẻ
                  right: "0", // Căn phải của ảnh với phải của thẻ
                  marginTop: "1px",
                  marginRight: "2px", // Thêm margin phải cho ảnh
                  
                  }}/>
              ) : (
                <Image src={`${process.env.PUBLIC_URL}/images/not_full.png`} alt="Not Full" boxSize="50px" style={{ position: "absolute", // Đặt vị trí của ảnh là absolute
                  top: "0", // Căn đỉnh của ảnh với đỉnh của thẻ
                  right: "0", // Căn phải của ảnh với phải của thẻ
                  marginTop: "1px",
                  marginRight: "2px", // Thêm margin phải cho ảnh
                  
                  }}/>
              )}
              <Image
                src={item.image}
                alt={item.title}
                borderRadius="lg"
                width="200px" // Đặt chiều rộng của hình ảnh là 200px
                height="200px" // Đặt chiều cao của hình ảnh là 200px
                style={{border: "1px solid #053B50"}}
                className="card-image"
              />
            </CardHeader>
            <CardBody style={{ flex: 1, padding: '5px' }}>
            <Heading size="md" mt="2">{item.title}</Heading>
            
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
