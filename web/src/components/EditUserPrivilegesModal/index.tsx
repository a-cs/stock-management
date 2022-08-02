/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import api from '../../services/api';

import Modal from '../Modal';
import ToggleSwitch from '../ToggleSwitch';

import './styles.css';

interface User {
  id: string;
  name: string;
  is_allowed: boolean;
  is_admin: boolean;
}

interface EditUserPrivilegesModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  editUserId: string;
}

const EditUserPrivilegesModal: React.FC<EditUserPrivilegesModalProps> = ({
  isOpen,
  setIsOpen,
  users,
  setUsers,
  editUserId,
}) => {
  const [name, setName] = useState('');
  const [isAllowed, setIsAllowed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isOpen === true) {
      if (editUserId !== '0') {
        const editUser = users.filter(user => user.id === editUserId)[0];
        setName(editUser.name);
        setIsAllowed(editUser.is_allowed);
        setIsAdmin(editUser.is_admin);
      }
    }
    return () => {
      setMessage('');
      setName('');
      setIsAllowed(false);
      setIsAdmin(false);
    };
  }, [users, editUserId, isOpen]);

  const handleOnClose = () => {
    setMessage('');
    setName('');
    setIsOpen();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const updatedUserPrivileges = { is_allowed: isAllowed, is_admin: isAdmin };

    try {
      const { data } = await api.patch(
        `users/${editUserId}`,
        updatedUserPrivileges,
      );

      const updatedUsers = users.map(user =>
        user.id === editUserId ? data : user,
      );
      setUsers(updatedUsers);
      handleOnClose();
    } catch (error: any) {
      setMessage(error.response.data.message);
    }
  };

  const modalRef = useRef(null);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="modalContainerEditUserPrivilegesModal" ref={modalRef}>
        <div className="modalTitleEditUserPrivilegesModal">
          <h4>
            Editar privilégios de:
            <br /> {name}
          </h4>
        </div>
        <form className="formEditUserPrivilegesModal" onSubmit={handleSubmit}>
          <ToggleSwitch
            inputName="Admin"
            value={isAdmin}
            setValue={setIsAdmin}
          />
          <ToggleSwitch
            inputName="Permitido"
            value={isAllowed}
            setValue={setIsAllowed}
          />
          <p>{message}</p>
          <div className="footerEditUserPrivilegesModal">
            <button type="submit" id="confirmBtnEditUserPrivilegesModal">
              <FiCheck /> <div className="space" />
              <div>Confirmar</div>
              <div className="space" />
            </button>
            <button
              type="button"
              onClick={handleOnClose}
              id="cancelBtnEditUserPrivilegesModal"
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

export default EditUserPrivilegesModal;
