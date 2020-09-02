import React from "react";
import Slider from "react-slick";
import ScrollAnimation from "react-animate-on-scroll";
import CONSTANTS from "../constants";
import LinkTag from "Common/LinkTag";
import LazyLoad from "react-lazyload";

const FtcTeam = () => {
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
    <div className="FtcTeam">
      <div className="titleWrap">
        <span className="title">TEAM</span>
        <span className="subTitle">
          <LinkTag
            url="https://www.104.com.tw/jobbank/custjob/index.php?r=cust&j=3c4a44274c463e2248323c1d1d1d1d5f2443a363189j99"
            value="Join us"
            className="LinkTag white"
          />
        </span>
        <div className="content">
          如果你總是有許多不同新奇的idea，並樂於將這些特別想法分享給大家，
          <br />
          那你就是我們要找的人。還等什麼？現在就趕快加入我們吧！
        </div>
      </div>
      <div className="memberWrap">
        <Slider {...settings}>
          {CONSTANTS.TEAM.map(member => (
            <div className="people">
              <ScrollAnimation className="slow" animateIn="fadeInDown">
                <LazyLoad
                  height={CONSTANTS.IMG.height}
                  offset={CONSTANTS.IMG.offset}
                >
                  <img src={member.img} />
                </LazyLoad>

                <div className={`descwrap ${member.gender}`}>
                  <div className="desc">
                    <p className="name">{member.name}</p>
                    <p className="dept">{member.dept}</p>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FtcTeam;
