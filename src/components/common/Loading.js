import React from 'react';
import { Modal } from 'react-bootstrap';
import deepmerge from 'deepmerge';

/** 使用 Bootstrap 提供一個動態視窗元件 */
const Loading = ({
  keyboard = false,
  backdrop = 'static',
  show,
  customBodyStyle
}) => {
  const defaultBodyStyle = {};
  const bodyStyle = deepmerge(
    defaultBodyStyle,
    customBodyStyle === undefined ? {} : customBodyStyle
  );

  if (show) {
  }

  return (
    <Modal
      show={show}
      keyboard={keyboard} // Close the modal when escape key is pressed
      backdrop={backdrop} // 'static' for a backdrop that doesn't trigger an "onHide" when clicked.
      className='LoadingModal'
    >
      <Modal.Body style={bodyStyle}>{<div className='loading' />}</Modal.Body>
    </Modal>
  );
};

export default Loading;
