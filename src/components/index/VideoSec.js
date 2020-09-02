import React from "react";
import $ from "jquery";
import "magnific-popup";

class VideoSec extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    $(".VideoSec a").magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,

      fixedContentPos: false
    });
  }
  render() {
    return (
      <div className="VideoSec" id="videoSec">
        <a href="http://www.youtube.com/watch?v=kzwBgjB_ZLs" />
      </div>
    );
  }
}

export default VideoSec;
