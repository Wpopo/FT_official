import React from 'react';
import LinkTag from '../common/LinkTag';
import Helper from 'Lib/helper';

const IOT = () => {
  const items = [
    {
      title: 'Profile',
      subTitle: [
        {
          key: 'ISDN Transceiver Ics​​',
          value: [
            {
              type: 'link',
              value: {
                text: 'XHFC Series​',
                url: 'https://www.colognechip.com/telecoms/isdn/xhfc-series'
              }
            },
            {
              type: 'link',
              value: {
                text: 'HFC Series​',
                url: 'https://www.colognechip.com/telecoms/isdn/hfc-series'
              }
            }
          ]
        },
        {
          key: 'ASIC IP Cores​​​',
          value: [
            {
              type: 'link',
              value: {
                text: 'C3-PLL-2​',
                url:
                  'https://www.colognechip.com/telecoms/asic-ip-cores/c3-pll-2'
              }
            },
            {
              type: 'link',
              value: {
                text: 'C3-CODEC-G712-4​​',
                url:
                  'https://www.colognechip.com/telecoms/asic-ip-cores/c3-codec-g712-4'
              }
            }
          ]
        }
      ]
    },
    { title: 'Application', subTitle: 'Telecoms​' },
    {
      title: 'Contact',
      subTitle: {
        type: 'mail',
        value: {
          text: 'vivian.lee@Fullerton.com.tw​​',
          url: 'mailto:vivian.lee@Fullerton.com.tw​'
        }
      }
    }
  ];
  return (
    <div className='IOTWrap' onClick={Helper.screen.scrollToTop()}>
      <div className='banner IOT'>
        <div className='bannerTextWrap'>
          <span class='txt'>IOT</span>
        </div>
      </div>
      <div className='contentWrap'>
        <div className='titleWrap'>
          <p className='title h3'>Product</p>
          <p className='h1'>Cologne Chip</p>
          <LinkTag
            url='http://www.colognechip.com​​'
            value='http://www.colognechip.com​​'
            className='LinkTag_IOT'
          />
        </div>

        <div className='text'>
          Starting in 1994,Cologne Chip follows the latest developments in
          broadband access technologies, providing its ISDN transceivers to all
          kinds of Residential Gateways for the Central European market. In this
          way the company has an important share in the transition to IP
          telephony.
          <div className='info'>
            <span className='bold'>Manufacturer : </span>Cologne Chip
            <br />
            <span className='bold'>Area : </span>Taiwan , China, H.K
          </div>
        </div>

        <div className='boxWrap'>
          {items.map(item => (
            <div className='itemWrap'>
              <p className='title h3'>{item.title}</p>

              {!Array.isArray(item.subTitle) ? (
                <ProcessValue item={item.subTitle} />
              ) : (
                item.subTitle.map(sub => (
                  <div className='subWrap'>
                    <p className='h4'>{sub.key}</p>
                    <p className='subItem'>
                      {sub.value.map(elm => (
                        <ProcessValue item={elm} />
                      ))}
                    </p>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProcessValue = ({ item }) => {
  if (typeof item !== 'object') {
    return <p className='subTitle h4'>{item}</p>;
  } else {
    if (item.type === 'link') {
      const { text, url } = item.value;
      return (
        <p>
          <LinkTag url={url} value={`- ${text}`} className='LinkTag_IOT' />
        </p>
      );
    } else if (item.type === 'mail') {
      const { text, url } = item.value;
      return (
        <a className='mailLink' href={url}>
          {text}
        </a>
      );
    } else {
      return null;
    }
  }
};

export default IOT;
