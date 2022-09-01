/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import api from '../../services/api';

import Modal from '../Modal';

import './styles.css';

interface User {
  name: string;
  email: string;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const ChangeEmailModal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  user,
  setUser,
}) => {
  const [newEmail, setNewEmail] = useState('');
  const [message, setMessage] = useState('');
  const [msgSucess, setmsgSucess] = useState(false);

  useEffect(() => {
    if (isOpen === true) {
      setNewEmail(user.email);
    }
  }, [isOpen, user?.email]);

  const handleOnClose = () => {
    setMessage('');
    setNewEmail('');
    setIsOpen();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const updatedUser = { ...user, email: newEmail };

    try {
      const { data } = await api.put('profile', updatedUser);
      const { name, email } = data;
      setUser({ name, email });
      handleOnClose();
    } catch (error: any) {
      setmsgSucess(false);
      setMessage(error.response.data.message);
    }
  };

  const modalRef = useRef(null);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="modalContainerChangeEmailModal" ref={modalRef}>
        <div className="modalTitleChangeEmailModal">
          <h4>Alterar email</h4>
        </div>
        <form className="formChangeEmailModal" onSubmit={handleSubmit}>
          <label htmlFor="newEmail">
            <input
              id="newEmail"
              type="email"
              placeholder={newEmail}
              required
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
            />
            <span>Novo email</span>
          </label>
          <p className={msgSucess ? 'msgSucess' : 'msgFail'}>{message}</p>
          <div className="footerChangeEmailModal">
            <button type="submit" id="confirmBtnChangeEmailModal">
              <FiCheck /> <div className="space" />
              <div>Confirmar</div>
              <div className="space" />
            </button>
            <button
              type="button"
              onClick={handleOnClose}
              id="cancelBtnChangeEmailModal"
            >
              <FiX />
              <div className="space" />
              <div>Cancelar</div>
              <div className="space" />
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ChangeEmailModal;
