import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const slideImages = [
  {
    url: "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner_web_v2/0/0/0/3415.jpg?v=1&w=1920&h=600&quot",
  },
  {
    url: "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner_web_v2/0/0/0/3400.jpg?v=1&w=1920&h=600&quot",
  },
  {
    url: "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner_web_v2/0/0/0/3403.jpg?v=1&w=1920&h=600&quot",
  },
  {
    url: "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner_web_v2/0/0/0/3376.jpg?v=1&w=1920&h=600&quot",
  },
  {
    url: "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner_web_v2/0/0/0/3394.jpg?v=1&w=1920&h=600&quot",
  },
];

const StorySlide = () => {
  return (
    <div>
      <div className="slideshow-container">
        <Slide easing="ease">
          {slideImages.map((slideImage, index) => (
            <div key={index} className="each-slide">
              <div
                style={{
                  backgroundImage: `url(${slideImage.url})`,
                  height: "55vh",
                  backgroundSize: "100%",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
};

export default StorySlide;
