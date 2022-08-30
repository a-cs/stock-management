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

const ChangeNameModal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  user,
  setUser,
}) => {
  const [newName, setNewName] = useState('');
  const [message, setMessage] = useState('');
  const [msgSucess, setmsgSucess] = useState(false);

  useEffect(() => {
    if (isOpen === true) {
      setNewName(user.name);
    }
  }, [isOpen, user?.name]);

  const handleOnClose = () => {
    setMessage('');
    setNewName('');
    setIsOpen();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const updatedUser = { ...user, name: newName };

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
      <div className="modalContainerChangeNameModal" ref={modalRef}>
        <div className="modalTitleChangeNameModal">
          <h4>Alterar nome</h4>
        </div>
        <form className="formChangeNameModal" onSubmit={handleSubmit}>
          <label htmlFor="newName">
            <input
              id="newName"
              type="text"
              placeholder={newName}
              required
              value={newName}
              onChange={e => setNewName(e.target.value)}
            />
            <span>Novo nome</span>
          </label>
          <p className={msgSucess ? 'msgSucess' : 'msgFail'}>{message}</p>
          <div className="footerChangeNameModal">
            <button type="submit" id="confirmBtnChangeNameModal">
              <FiCheck /> <div className="space" />
              <div>Confirmar</div>
              <div className="space" />
            </button>
            <button
              type="button"
              onClick={handleOnClose}
              id="cancelBtnChangeNameModal"
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

export default ChangeNameModal;
