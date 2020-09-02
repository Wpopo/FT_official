import React from "react";
import Slider from "react-slick";
import Helper from "Lib/helper";
import ScrollAnimation from "react-animate-on-scroll";
import CONSTANTS from "Constants";
import ConsoleInfo from "Common/ConsoleInfo";
import LinkTag from "Common/LinkTag";
import ContactUs from "Components/index/ContactUs";
import LazyLoad from "react-lazyload";

class Partner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      isXsScreen: Helper.screen.isXsScreen(),
      groupBase: 6 // mobile時，幾個Icon為一個Group
    };
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.getImg = this.getImg.bind(this);
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

  handleModalOpen() {
    this.setState({ show: true });
  }

  handleModalClose() {
    this.setState({ show: false });
  }

  getImg(min, max) {
    const temp = [];
    for (let i = min; i <= max; i++) {
      temp.push(
        <div className="slideItem">
          <LazyLoad height={CONSTANTS.IMG.height} offset={CONSTANTS.IMG.offset}>
            <img src={CONSTANTS.Partner[i]} />
          </LazyLoad>
        </div>
      );
    }
    return temp;
  }

  render() {
    let settings = {
      autoplay: false,
      dots: true,
      arrows: false,
      swipe: true
    };

    const { isXsScreen, groupBase } = this.state;
    const boxNum = CONSTANTS.Partner.length; // Icon總個數
    const nGroup = Math.floor(boxNum / groupBase); // 計算一共分幾組
    const numArr = []; // [min,max]
    for (let i = 0; i <= nGroup; i++) {
      numArr.push([
        i * groupBase,
        (i === nGroup ? boxNum : i * groupBase + groupBase) - 1
      ]);
    }

    return (
      <div>
        <div className="Partner" id="partner">
          <div className="titleWrap">
            <span className="title">PARTNER</span>
            <span className="subTitle">
              <LinkTag value="Join us" handleClick={this.handleModalOpen} />
            </span>

            <div className="content">
              想成為我們的合作夥伴，一起創造台灣最多元化的生活享樂平台嗎？
              <br />
              快來和我們分享你最創意的idea吧！
            </div>
          </div>
          <div className="slideWrap">
            {!isXsScreen ? (
              CONSTANTS.Partner.map(url => (
                <div className="slideItem">
                  <ScrollAnimation className="slow" animateIn="fadeInDown">
                    <LazyLoad
                      height={CONSTANTS.IMG.height}
                      offset={CONSTANTS.IMG.offset}
                    >
                      <img src={url} />
                    </LazyLoad>
                  </ScrollAnimation>
                </div>
              ))
            ) : (
              <Slider {...settings}>
                {numArr.map(item => (
                  <div className="boxwrap">{this.getImg(item[0], item[1])}</div>
                ))}
              </Slider>
            )}
          </div>
        </div>

        <ConsoleInfo
          show={this.state.show}
          onClose={this.handleModalClose}
          header="CONTACT US"
          children={<ContactUs />}
        />
      </div>
    );
  }
}

export default Partner;
