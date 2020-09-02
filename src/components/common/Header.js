import $ from "jquery";
import React from "react";
import Helper from "Lib/helper";
import { Link } from "react-router-dom";
import ConsoleInfo from "Common/ConsoleInfo";
import ContactUs from "Components/index/ContactUs";
import CONSTANTS from "Constants";
// import Privacy from "Common/Privacy.js";
// import Cookies from "js-cookie";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { headerStyle: "" };
    this.scrollHeader = this.scrollHeader.bind(this);
    this.scrollToDiv = this.scrollToDiv.bind(this);
    // this.state = {
    //   isPrivacy: false,
    // };
  }

  componentDidMount() {
    // Header 根據Scroll位置呈現 動畫效果
    window.onscroll = this.scrollHeader;

    // if (Cookies.get("ftcCookie") !== "ftc") {
    //   this.setState({
    //     isPrivacy: true,
    //   });
    // }
  }

  componentDidUpdate() {
    //若子頁面為EventAll 則不用判斷
    const { headerStyle } = this.state;
    if (window.location.hash.includes("/EventAll")) {
      if (headerStyle !== "dynamic") {
        window.onscroll = null;
        this.setState({
          headerStyle: "dynamic",
        });
      }
    } else {
      // Header 根據Scroll位置呈現 動畫效果
      window.onscroll = this.scrollHeader;
    }
  }

  // 判斷Scroll位置
  scrollHeader() {
    if (
      document.body.scrollTop > 400 ||
      document.documentElement.scrollTop > 400
    ) {
      this.setState({ headerStyle: "dynamic" });
    } else {
      this.setState({ headerStyle: "" });
    }
    this.onScroll();
  }

  onScroll() {
    $("#menu-center a").each(function () {
      const scrollPos = $(document).scrollTop();
      const currLink = $(this);
      const refElement = document.getElementById(this.dataset.id);
      if (refElement === null) return;
      if (refElement.offsetTop - 100 <= scrollPos) {
        $("#menu-center li a").removeClass("active");
        currLink.addClass("active");
      } else {
        currLink.removeClass("active");
      }
    });
  }

  scrollToDiv(hash) {
    // 防止 轉跳時 畫面尚未render完成 所以延遲300ms做check
    setTimeout(() => {
      Helper.screen.scroll(hash);
    }, 300);
  }

  render() {
    const { headerStyle } = this.state;
    return (
      <div className={`ftcHeader ${headerStyle}`}>
        {/* {this.state.isPrivacy ? <Privacy /> : null} */}
        <Logo scrollToDiv={this.scrollToDiv} />
        <Menu scrollToDiv={this.scrollToDiv} />
      </div>
    );
  }
}
class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isShowMenu: false };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.menuhandleClick = this.menuhandleClick.bind(this);
  }

  menuhandleClick(hash) {
    this.props.scrollToDiv(hash);
    this.setState({ isShowMenu: false });
  }

  toggleMenu() {
    this.setState({
      isShowMenu: !this.state.isShowMenu,
    });
  }
  render() {
    const { isShowMenu } = this.state;
    return (
      <div className="Nav">
        <div className={isShowMenu ? "wrap" : "wrap off"}>
          <ul id="menu-center" className="Menu">
            {CONSTANTS.HeaderMenu.map((menu) => (
              <li className={menu.className}>
                <Link
                  data-id={menu.hash}
                  to="/"
                  onClick={() =>
                    menu.hash
                      ? this.menuhandleClick(menu.hash)
                      : window.open(menu.linkto)
                  }
                >
                  {menu.title}
                </Link>
              </li>
            ))}
          </ul>
          <Email />
        </div>

        <div
          className={isShowMenu ? "toggle close" : "toggle open"}
          onClick={this.toggleMenu}
        />
      </div>
    );
  }
}

const Logo = (props) => (
  <h1 className="Logo" id="logo">
    <Link to="/" onClick={() => props.scrollToDiv("logo")}>
      富爾特科技股份有限公司
    </Link>
  </h1>
);

class Email extends React.Component {
  constructor(props) {
    super(props);

    this.state = { show: false };
  }
  render() {
    return (
      <div className="Email">
        <a onClick={() => this.setState({ show: true })} />
        <ConsoleInfo
          show={this.state.show}
          onClose={() => this.setState({ show: false })}
          header="CONTACT US"
          children={<ContactUs />}
        />
      </div>
    );
  }
}

const Lang = (props) => (
  <div className="Lang">
    <a href="javascript:;">繁</a>
    <a href="javascript:;">簡</a>
    <a href="javascript:;">EN</a>
  </div>
);

export default Header;
