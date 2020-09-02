import React from "react";
import Slider from "react-slick";
import ScrollAnimation from "react-animate-on-scroll";
import LinkTag from "Common/LinkTag";
import LazyLoad from "react-lazyload";
import CONSTANTS from "Constants";

const Group = () => {
  let settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          autoplay: false,
          dots: true,
          arrows: false,
          swipe: true
        }
      },
      { breakpoint: 10000, settings: "unslick" }
    ]
  };

  return (
    <div className="Group" id="group">
      <div className="titleWrap">
        <span className="title text-center">GROUP</span>
        <div className="content">
          集結了最多在地資源，整合跨產業的娛樂多元性，
          <br />
          提供給消費者最符合潮流的娛樂生活體驗。
        </div>
      </div>

      <div className="boxWrap">
        <Slider {...settings}>
          {CONSTANTS.Group.map(item => (
            <div className="box">
              <ScrollAnimation className="slow" animateIn="fadeInDown">
                <div className="logo">
                  <LazyLoad
                    height={CONSTANTS.IMG.height}
                    offset={CONSTANTS.IMG.offset}
                  >
                    <div className={`${item.imageClass}`} />{" "}
                  </LazyLoad>
                </div>

                <div className="desc">
                  <p className="title">{item.title}</p>
                  <span>{item.content}</span>
                  <LinkTag
                    className="link"
                    url={item.link}
                    value={item.linkValue}
                  />
                </div>
              </ScrollAnimation>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Group;
