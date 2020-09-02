import React from "react";
import $ from "jquery";
import "magnific-popup";
import CONSTANTS from "../constants";
import { Carousel } from "react-bootstrap";

class ImagePopup extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    $(".ImagePopup").magnificPopup({
      delegate: "div.image",
      type: "image",
      tLoading: "Loading image #%curr%...",
      mainClass: "mfp-img-mobile",
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1]
      }
    });
  }

  render() {
    return (
      <div className="ImagePopup">
        <Carousel>
          {CONSTANTS.ImagePopup.map((imgSrc, index) => (
            <Carousel.Item key={index}>
              <div
                className="image"
                href={imgSrc}
                style={{ backgroundImage: "url(" + imgSrc + ")" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default ImagePopup;
