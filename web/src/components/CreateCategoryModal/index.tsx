/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import api from '../../services/api';

import Modal from '../Modal';

import './styles.css';

interface Category {
  id: string;
  name: string;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CreateCategoryModal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  categories,
  setCategories,
}) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [msgSucess, setmsgSucess] = useState(false);

  useEffect(() => {
    if (isOpen === true) {
      setName('');
    }
  }, [isOpen]);

  const handleOnClose = () => {
    setMessage('');
    setName('');
    setIsOpen();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const category = { name };

    try {
      const { data } = await api.post('categories', category);
      setCategories([...categories, data]);
      handleOnClose();
    } catch (error: any) {
      setmsgSucess(false);
      setMessage(error.response.data.message);
    }
  };

  const modalRef = useRef(null);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="modalContainerCreateCategoryModal" ref={modalRef}>
        <div className="modalTitleCreateCategoryModal">
          <h4>Criar novo category</h4>
        </div>
        <form className="formCreateCategoryModal" onSubmit={handleSubmit}>
          <label htmlFor="name">
            <input
              id="name"
              type="text"
              placeholder=" "
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <span>Nome</span>
          </label>
          <p className={msgSucess ? 'msgSucess' : 'msgFail'}>{message}</p>
          <div className="footerCreateCategoryModal">
            <button type="submit" id="confirmBtnCreateCategoryModal">
              <FiCheck /> <div className="space" />
              <div>Confirmar</div>
              <div className="space" />
            </button>
            <button
              type="button"
              onClick={handleOnClose}
              id="cancelBtnCreateCategoryModal"
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

export default CreateCategoryModal;
