import React, { Component } from 'react';
import Helper from 'Lib/helper';
import CONSTANTS from '../constants';

class EventAll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      isLoading: true,
      eventList: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    Helper.fetch.fetchJsonp(
      CONSTANTS.API.Event,
      cb => {
        this.setState({ eventList: cb, isLoading: false });
        Helper.screen.scroll(window.location.hash.split('#')[2]);
      },
      () =>
        this.setState({
          error: true,
          isLoading: false
        })
    );
  }

  render() {
    const { error, isLoading, eventList, isXXlScreen, isSmScreen } = this.state;
    if (error || isLoading)
      return (
        <div className='EventWrap'>
          <div className='titleWrap'>
            <span className='title text-center'>Event</span>
            <div className='content'>目前無相關資訊</div>
          </div>
        </div>
      );
    return (
      <div className='EventWrap'>
        <div className='titleWrap'>
          <span className='title'>Event</span>
        </div>
        {eventList.map(event => (
          <Box info={event} />
        ))}
      </div>
    );
  }
}

const Box = ({ info }) => (
  <div id={info.id} className='boxWrap'>
    <div className='col-xl-4 col-sm-5 col-xs-12 box'>
      <img className='' src={info.img1} />
    </div>
    <div className='col-xl-8 col-sm-7 col-xs-12 description'>
      <p className='category'>{info.category}</p>
      <p className='subject'>{info.subject}</p>
      <p
        className='content hidden-xs'
        dangerouslySetInnerHTML={Helper.data.createMarkup(info.content)}
      />
      <p className='info'>
        <span className='glyphicon glyphicon-time hidden-xs'>
          <span className='text'>{`${Helper.datetime.MsToformat(
            info.begin_date
          )}~${Helper.datetime.MsToformat(info.end_date)}`}</span>
        </span>
        <button
          className='btn_event'
          onClick={() => {
            window.open(info.url);
          }}
        >
          活動詳情
        </button>
      </p>
    </div>
  </div>
);
export default EventAll;
