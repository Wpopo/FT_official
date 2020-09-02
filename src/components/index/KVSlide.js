import React from "react";
import Slider from "react-slick";
import Helper from "Lib/helper";
import CONSTANTS from "Constants";

class KVSlide extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isXsScreen: Helper.screen.isXsScreen()
    };
  }

  componentDidMount() {
    Helper.onResize(
      () => {
        if (this.state.isXsScreen !== Helper.screen.isXsScreen()) {
          this.setState({ isXsScreen: Helper.screen.isXsScreen() });
        }
      },
      { detect_width: true }
    );
  }

  render() {
    let settings = {
      autoplay: true,
      autoplaySpeed: 6000,
      dots: true,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      swipe: true
    };
    const { isXsScreen } = this.state;
    return (
      <div className="KVSlide">
        <div className="wrap">
          <Slider {...settings}>
            {CONSTANTS.Banner.map(v => (
              <div
                className="image"
                key={v.id}
                style={{
                  backgroundImage: `url(${!isXsScreen ? v.imgUrl : v.imgUrl_m})`
                }}
              />
            ))}
          </Slider>
          <div className="decoration" />
        </div>
      </div>
    );
  }
}

export default KVSlide;
