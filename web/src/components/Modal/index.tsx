/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  children: any;
  isOpen: boolean;
  setIsOpen: () => void;
}
const Modal: React.FC<ModalProps> = ({ children, isOpen, setIsOpen }) => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  let style = {};

  if (window.innerWidth < 700) {
    style = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        // marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#F0F0F5',
        color: '#000000',
        borderRadius: '12px',
        width: '96%',
        maxWidth: '500px',
        height: 'clamp(350px, 50vh, 600px)',
        border: 'none',
      },
      overlay: {
        backgroundColor: 'rgba(200, 200, 200,.8)',
      },
    };
  } else {
    style = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        // marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#F0F0F5',
        color: '#000000',
        borderRadius: '12px',
        width: '500px',
        height: '600px',
        border: 'none',
      },
      overlay: {
        backgroundColor: 'rgba(200, 200, 200,.8)',
      },
    };
  }

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={style}
    >
      {children}
    </ReactModal>
  );
};
export default Modal;
