import React from 'react';
import { Modal } from 'react-bootstrap';
import deepmerge from 'deepmerge';

/** 使用 Bootstrap 提供一個動態視窗元件 */
const ConsoleInfo = ({
  keyboard = false,
  backdrop = 'static',
  show,
  onClose,
  header,
  children,
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
      onHide={onClose}
      keyboard={keyboard} // Close the modal when escape key is pressed
      backdrop={backdrop} // 'static' for a backdrop that doesn't trigger an "onHide" when clicked.
      className='consoleInfo'
    >
      <Modal.Header>
        <div
          className='close glyphicon glyphicon-remove-circle'
          onClick={onClose}
        />
        <Modal.Title className='title'>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={bodyStyle}>{children}</Modal.Body>
    </Modal>
  );
};

export default ConsoleInfo;
