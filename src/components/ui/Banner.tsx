import { Carousel } from "antd";
import Image from "next/image";
import React from "react";
import img1 from "../../../src/assets/images/banner/1.jpg";
import img2 from "../../../src/assets/images/banner/2.jpg";
import img3 from "../../../src/assets/images/banner/3.jpg";
import img4 from "../../../src/assets/images/banner/4.jpg";
import img5 from "../../../src/assets/images/banner/5.jpg";
import img6 from "../../../src/assets/images/banner/6.jpg";

const contentStyle: React.CSSProperties = {
  height: "600px",
  color: "#fff",
  lineHeight: "600px",
  textAlign: "center",
  background: "#364d79",
};

const images = [img1, img2, img3, img4, img5, img6];

const Banner: React.FC = () => (
  <div className="  rounded-lg">
    <Carousel autoplay>
      {images.map((image, index) => (
        <div key={index}>
          <Image
            src={image}
            alt={`Image ${index + 1}`}
            style={{ ...contentStyle, objectFit: "cover" }}
          />
        </div>
      ))}
    </Carousel>
  </div>
);

export default Banner;
