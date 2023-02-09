/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { FiCheck, FiClipboard, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../services/api';
import InputPassword from '../InputPassword';

import Modal from '../Modal';

import './styles.css';

interface User {
  id: string;
  name: string;
  email?: string;
  is_admin: boolean;
  is_allowed: boolean;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  user: User;
}

const ResetPasswordModal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  user,
}) => {
  const [adminPassword, setAdminPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (isOpen === true) {
      setAdminPassword('');
      setNewPassword('');
    }
  }, [isOpen]);

  const handleOnClose = () => {
    setNewPassword('');
    setAdminPassword('');
    setIsOpen();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { email } = user;
    const body = { email, adminPassword };

    try {
      const { data } = await api.post('users/reset-password', body);
      setNewPassword(data.newPassword);
      toast.success('Senha resetada com sucesso.');
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  function copyToClipBoard(): void {
    navigator.clipboard.writeText(newPassword);
    toast.success('Senha copiada com sucesso.');
  }

  const closeAndCopy = () => {
    copyToClipBoard();
    handleOnClose();
  };

  const modalRef = useRef(null);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="modalContainerResetPasswordModal" ref={modalRef}>
        <div className="modalTitleResetPasswordModal">
          <h4>Criar novo category</h4>
        </div>
        <form className="formResetPasswordModal" onSubmit={handleSubmit}>
          <div className="InputPassword">
            {!newPassword ? (
              <InputPassword
                text="Senha do Administrador"
                label="adminPassword"
                value={adminPassword}
                setValue={setAdminPassword}
              />
            ) : (
              <>
                <label htmlFor="newPassword" className="inputPassword">
                  <input
                    className="newPasswordInput"
                    id="newPassword"
                    type="text"
                    placeholder=" "
                    readOnly
                    value={newPassword}
                    onClick={copyToClipBoard}
                  />
                  <span className="newPasswordSpan">
                    A nova senha do usuário é:
                  </span>
                  <button
                    className="newPasswordButton"
                    tabIndex={-1}
                    type="button"
                    onClick={copyToClipBoard}
                  >
                    <FiClipboard size="22px" strokeWidth="2" />
                  </button>
                </label>
              </>
            )}
          </div>

          <div className="footerResetPasswordModal">
            {!newPassword ? (
              <>
                <button type="submit" id="confirmBtnResetPasswordModal">
                  <FiCheck /> <div className="space" />
                  <div>Confirmar</div>
                  <div className="space" />
                </button>
                <button
                  type="button"
                  onClick={handleOnClose}
                  id="cancelBtnResetPasswordModal"
                >
                  <FiX />
                  <div className="space" />
                  <div>Cancelar</div>
                  <div className="space" />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={closeAndCopy}
                id="confirmBtnResetPasswordModal"
              >
                <FiCheck /> <div className="space" />
                <div>Copiar e Sair</div>
                <div className="space" />
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ResetPasswordModal;
