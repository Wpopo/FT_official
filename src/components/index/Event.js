import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import Helper from "Lib/helper";
import CONSTANTS from "../constants";
class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      isLoading: true,
      eventList: [],
      index: 0,
      direction: null,
      isXXlScreen: Helper.screen.isXXlScreen(),
      isSmScreen: Helper.screen.isSmScreen()
    };

    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidMount() {
    Helper.onResize(
      () => {
        if (this.state.isXXlScreen !== Helper.screen.isXXlScreen()) {
          this.setState({ isXXlScreen: Helper.screen.isXXlScreen() });
        }
        if (this.state.isSmScreen !== Helper.screen.isSmScreen()) {
          this.setState({ isSmScreen: Helper.screen.isSmScreen() });
        }
      },
      { detect_width: true }
    );

    this.fetchData();
  }

  fetchData() {
    Helper.fetch.fetchJsonp(
      CONSTANTS.API.Event,
      cb => this.setState({ eventList: cb, isLoading: false }),
      () =>
        this.setState({
          error: true,
          isLoading: false
        })
    );
  }

  processData(result) {
    return result.map(item => {
      const { id, subject, img1 } = item;
      return { id, subject, image: img1 };
    });
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  render() {
    const {
      error,
      isLoading,
      eventList,
      index,
      direction,
      isXXlScreen,
      isSmScreen
    } = this.state;

    if (error || isLoading) return null;
    const items = this.processData(eventList);
    const maxNum = items.length - 1; // Event的總數量
    let imageIndex = 0; // 紀錄目前應該輸出哪張Event
    let nIndex = 0; // 紀錄密前已輸出幾張Event

    // 計算Carousel該回傳的index，並偵測是否超過陣列回傳0或者+1
    let getIndex = () => {
      let num = imageIndex;

      nIndex += 1;
      if (imageIndex === maxNum) {
        imageIndex = 0;
      } else {
        imageIndex += 1;
      }
      return num;
    };

    return (
      <div className="Event" id="event">
        <div className="content">
          <div className="titleWrap">
            <span className="title">EVENT</span>
            <span className="subTitle">
              <Link className="LinkTag" to="/EventAll">
                View all
              </Link>
            </span>
          </div>
          <Carousel
            activeIndex={index}
            direction={direction}
            onSelect={this.handleSelect}
            className="container"
          >
            {items.map((item, i, arr) => {
              if (nIndex > maxNum) return null;

              return (
                <Carousel.Item key={item.id}>
                  <div className="row row-centered">
                    <EventImage
                      id={arr[imageIndex].id}
                      img_src={arr[getIndex()].image}
                    />

                    {isSmScreen ? (
                      <EventImage
                        id={arr[imageIndex].id}
                        img_src={arr[getIndex()].image}
                      />
                    ) : null}

                    {isXXlScreen ? (
                      <EventImage
                        id={arr[imageIndex].id}
                        img_src={arr[getIndex()].image}
                      />
                    ) : null}
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      </div>
    );
  }
}

const EventImage = ({ id, img_src }) => (
  <Link to={`/EventAll#${id}`}>
    <img className="col-centered box" src={img_src} />
  </Link>
);
export default Event;
