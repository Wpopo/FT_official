import React from "react";
import $ from "jquery";
import isMobile from "ismobilejs";

const Item = (props) => (
  <div className="item">
    <div className="cate">{props.cate}</div>
    <div>
      <div className="parm">
        <span className="se">{props.parm}</span>
        {props.float && <span className="se">{props.float}</span>}
      </div>
      {props.small && <small>{props.small}</small>}
      {props.unit && <span className="unit">{props.unit}</span>}
    </div>
  </div>
);

class Milestone extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // 數字效果
    let flag = true;
    let actualNumbers = [];
    if (!isMobile.any) {
      $(".se").each(function (i) {
        actualNumbers[i] = $(this).text();
        $(this).text(0);
      });
    }
    $(window).scroll(function () {
      if (
        flag &&
        !isMobile.any &&
        $(window).scrollTop() +
          window.innerHeight -
          $(".Milestone").height() / 2 >
          $(".Milestone").offset().top
      ) {
        $(".se").each(function (i) {
          let _this = $(this);
          let increament = actualNumbers[i] / 50;
          _this.text(0);
          var intervalID = setInterval(increase, 50);

          function increase() {
            let temp = Number(_this.text());
            _this.text(Math.ceil((temp += increament)));
            if (temp > actualNumbers[i]) {
              _this.text(actualNumbers[i]);
              clearInterval(intervalID);
            }
          }
        });
        flag = false;
      }
    });
  }
  render() {
    return (
      <div className="Milestone">
        <div className="bg" />
        <Item cate="創立年份" parm="1992" small="4月" />
        <Item cate="上市年份" parm="2003" small="8月" />
        <Item cate="掛牌代號" parm="6136" />
        <Item cate="員工人數" parm="96" small="人" />
        <Item cate="資本總額" parm="11" float="55" unit="億" />
      </div>
    );
  }
}

export default Milestone;
