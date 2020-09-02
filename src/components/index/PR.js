import React from "react";
import Slider from "react-slick";

const PR = props => {
  let settings = {
    responsive: [
      {
        breakpoint: 767,
        settings: {
          autoplay: true,
          autoplaySpeed: 8000,
          dots: true,
          arrows: false,
          infinite: true,
          slidesToShow: 1,
          swipe: true
        }
      },
      { breakpoint: 10000, settings: "unslick" }
    ]
  };
  return (
    <div id="PR" className="PR">
      <div className="wrap">
        <div className="title">
          Fun for Life <br className="visible-xs" />
          Full of Joy !!
        </div>
        <div className="subtitle">提供生活享樂平台，創造快樂</div>
        <div className="PRSlide">
          <Slider {...settings}>
            <div className="slideItem">
              <div className="number">1</div>
              <div className="engDes">Mission</div>
              <div className="chtDes">使命</div>
              <div className="copy">
                提供生活享樂平台
                <br />
                創造快樂
              </div>
            </div>
            <div className="slideItem">
              <div className="number">2</div>
              <div className="engDes">Values</div>
              <div className="chtDes">理念</div>
              <div className="copy">
                提供平台服務．為客戶創造快樂
                <br />
                建立快樂環境．為同仁創造理想
                <br />
                經營穩健成功．為股東創造利潤
              </div>
            </div>
            <div className="slideItem">
              <div className="number">3</div>
              <div className="engDes">Culture</div>
              <div className="chtDes">文化</div>
              <div className="copy">
                開放 – 自由、創新
                <br />
                紀律 – 團隊、效能
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default PR;
