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

interface EditCategoryModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  editCategoryId: string;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  isOpen,
  setIsOpen,
  categories,
  setCategories,
  editCategoryId,
}) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isOpen === true) {
      if (editCategoryId !== '0') {
        const editCategory = categories.filter(
          category => category.id === editCategoryId,
        )[0];
        setName(editCategory.name);
      }
    }
    return () => {
      setMessage('');
      setName('');
    };
  }, [categories, editCategoryId, isOpen]);

  const handleOnClose = () => {
    setMessage('');
    setName('');
    setIsOpen();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const updatedCategory = { name };

    try {
      const { data } = await api.patch(
        `categories/${editCategoryId}`,
        updatedCategory,
      );
      const updatedCategories = categories.map(category =>
        category.id === editCategoryId ? data : category,
      );
      setCategories(updatedCategories);
      handleOnClose();
    } catch (error: any) {
      setMessage(error.response.data.message);
    }
  };

  const modalRef = useRef(null);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="modalContainerEditCategoryModal" ref={modalRef}>
        <div className="modalTitleEditCategoryModal">
          <h4>Editar category com Id {editCategoryId}</h4>
        </div>
        <form className="formEditCategoryModal" onSubmit={handleSubmit}>
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
          <p>{message}</p>
          <div className="footerEditCategoryModal">
            <button type="submit" id="confirmBtnEditCategoryModal">
              <FiCheck /> <div className="space" />
              <div>Confirmar</div>
              <div className="space" />
            </button>
            <button
              type="button"
              onClick={handleOnClose}
              id="cancelBtnEditCategoryModal"
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

export default EditCategoryModal;
