import React from "react";
import Helper from "Lib/helper";
import { Link } from "react-router-dom";
import CONSTANTS from "Constants";

const Footer = () => {
  function scrollToDiv(hash) {
    // 防止 轉跳時 畫面尚未render完成 所以延遲300ms做check
    setTimeout(() => {
      Helper.screen.scroll(hash);
    }, 300);
  }

  return (
    <div className="ftcFooter">
      <div className="wrap">
        <div className="top">
          <div className="infoWrap">
            <div className="logo" />
            <div className="info">
              <span>新北市新店區寶強路6-3號5樓</span>
              <span>e-mail service@fullerton.com.tw</span>
            </div>
          </div>
          <div className="menuWrap">
            {CONSTANTS.FooterMenu.map(menu => (
              <div className="menu">
                {menu.map(item => (
                  <Link
                    to={"/"}
                    onClick={() =>
                      item.scrollTo
                        ? scrollToDiv(item.scrollTo)
                        : window.open(item.linkto)
                    }
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="line hidden-xs" />
        <div className="address hidden-xs">
          富爾特科技 版權所有 © 2007 copyright Fullerton TechonlogyAll Rights
        </div>
        <div className="address visible-xs">富爾特科技 版權所有 © 2007</div>
      </div>
    </div>
  );
};

export default Footer;
