import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

import "Style/main.sass";
import "Style/img/sprites.png";
import "Style/bootstrap/3.3.7/css/bootstrap.css";
import "Style/animate.css";

import Header from "Common/Header.js";
import Index from "./index/Index.js";
import EventArticle from "./event/Article.js";
import EventAll from "./index/EventAll.js";
import IOT from "./index/IOT.js";
import Footer from "Common/Footer.js";
import Privacy from "Common/Privacy.js";
import Cookies from "js-cookie";

const App = (props) => (
  <Router hashType="hashbang">
    <div>
      {checkCookie() ? <Privacy /> : null}
      <Header />
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/article/:id" component={EventArticle} />
        <Route path="/EventAll" component={EventAll} />
        <Route path="/IOT" component={IOT} />
        <Route component={NoMatch} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

const NoMatch = ({ location }) => (
  <div className="NoMatch">
    <h3>您輸入的網址不正確，請查明後再嘗試。</h3>
  </div>
);

const checkCookie = () => {
  if (Cookies.get("ftcCookie") !== "ftc") {
    return true;
  } else {
    return false;
  }
};

ReactDOM.render(<App />, document.getElementById("root"));
