/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import api from '../../services/api';
import InputPassword from '../InputPassword';

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
}

const ChangePasswordModal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  user,
}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [msgSucess, setmsgSucess] = useState(false);

  useEffect(() => {
    if (isOpen === true) {
      setOldPassword('');
      setPassword('');
      setPasswordConfirmation('');
    }
  }, [isOpen, user?.email]);

  const handleOnClose = () => {
    setMessage('');
    setPassword('');
    setIsOpen();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const updatedUser = {
        name: user.name,
        email: user.email,
        oldPassword,
        password,
        passwordConfirmation,
      };
      await api.put('profile', updatedUser);
      handleOnClose();
    } catch (error: any) {
      setmsgSucess(false);
      setMessage(error.response.data.message);
    }
  };

  const modalRef = useRef(null);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="modalContainerChangePasswordModal" ref={modalRef}>
        <div className="modalTitleChangePasswordModal">
          <h4>Alterar senha</h4>
        </div>
        <form className="formChangePasswordModal" onSubmit={handleSubmit}>
          <InputPassword
            text="Antiga senha"
            label="oldPassword"
            value={oldPassword}
            setValue={setOldPassword}
          />
          <InputPassword
            text="Nova senha"
            label="password"
            value={password}
            setValue={setPassword}
          />
          <InputPassword
            text="Confirmar senha"
            label="passwordConfirmation"
            value={passwordConfirmation}
            setValue={setPasswordConfirmation}
          />
          <p className={msgSucess ? 'msgSucess' : 'msgFail'}>{message}</p>
          <div className="footerChangePasswordModal">
            <button type="submit" id="confirmBtnChangePasswordModal">
              <FiCheck /> <div className="space" />
              <div>Confirmar</div>
              <div className="space" />
            </button>
            <button
              type="button"
              onClick={handleOnClose}
              id="cancelBtnChangePasswordModal"
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

export default ChangePasswordModal;
