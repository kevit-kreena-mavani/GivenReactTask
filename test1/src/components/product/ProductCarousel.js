import React from "react";
import styles from "./DetailedProduct.module.css";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const ProductCarousel = (props) => {
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={100}
      totalSlides={3}
      visibleSlides={1}
      currentSlide={1}
      className={styles["carousel__container"]}
    >
      <Slider className={styles["carousel__slider"]}>
        <Slide index={0}>
          <img src={props.imageLink} alt="" />
        </Slide>
        <Slide index={1}>
          <img src={props.imageLink} alt="" />
        </Slide>
        <Slide index={2}>
          <img src={props.imageLink} alt="" />
        </Slide>
      </Slider>
      <div className={styles.actions}>
        <ButtonBack>{"\u27F5"}</ButtonBack>
        <ButtonNext>{"\u27F6"}</ButtonNext>
      </div>
    </CarouselProvider>
  );
};

export default ProductCarousel;
