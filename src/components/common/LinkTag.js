import React from 'react';

// 檢查URL是否合法
const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
// 檢查是否有是否有protocol
const pat = /^https?:\/\//i;
const regex = new RegExp(expression);

const LinkTag = ({ url = '', value = '', className = '', handleClick }) => {
  // 判斷是否有文字，若無文字，則顯示網址
  const text = value === '' ? url : value;
  const classStyle = `${className !== '' ? className : 'LinkTag'}`;

  let jsx = null;

  if (url.match(regex)) {
    if (pat.test(url)) {
      jsx = (
        <a
          className={classStyle}
          href={url}
          target='_blank'
          onClick={handleClick !== undefined ? handleClick : ''}
        >
          {text}
        </a>
      );
    } else {
      /* 加上//讓網址自動自找protocol */
      jsx = (
        <a className={classStyle} href={`//${url}`} target='_blank'>
          {text}
        </a>
      );
    }
  } else {
    /* 非URL直接回傳純文字 */
    jsx = (
      <div
        className={classStyle}
        onClick={handleClick !== undefined ? handleClick : ''}
      >
        {text}
      </div>
    );
  }

  return jsx;
};

export default LinkTag;
