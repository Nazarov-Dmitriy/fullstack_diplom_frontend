import React from "react";
import Slider from "react-slick";
import uuid from "react-uuid";
import styles from "./SliderComponent.module.less";

function SliderComponent({ images, url }: { images: string[]; url: string }) {
  function SampleArrow(props: { className: any; style: any; onClick: any }) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "#00CED1",
          paddingTop: "2px",
        }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: true,
    initialSlide: 0,
    infinite: true,
    nextArrow: (
      <SampleArrow
        className={undefined}
        style={undefined}
        onClick={undefined}
      />
    ),
    prevArrow: (
      <SampleArrow
        className={undefined}
        style={undefined}
        onClick={undefined}
      />
    ),
  };

  return (
    <div className={styles.container}>
      <Slider {...settings}>
        {images &&
          images.map((item) => {
            return (
              <div key={uuid()}>
                <img className={styles.img} src={url + item} alt={item} />
              </div>
            );
          })}
      </Slider>
    </div>
  );
}

export default SliderComponent;
