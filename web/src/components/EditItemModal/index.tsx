/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import api from '../../services/api';

import Modal from '../Modal';

import './styles.css';

interface Item {
  id: string;
  name: string;
  minimal_stock_alarm: string;
  total_stock: string;
}

interface EditItemModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  editItemId: string;
}

const EditItemModal: React.FC<EditItemModalProps> = ({
  isOpen,
  setIsOpen,
  items,
  setItems,
  editItemId,
}) => {
  const [name, setName] = useState('');
  const [minimalStock, setMinimalStock] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (editItemId !== '0') {
      const editItem = items.filter(item => item.id === editItemId)[0];
      setName(editItem.name);
      setMinimalStock(editItem.minimal_stock_alarm);
    }
    return () => {
      setMessage('');
      setName('');
      setMinimalStock('');
    };
  }, [items, editItemId]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const updatedItem = { name, minimal_stock_alarm: minimalStock };

    try {
      const { data } = await api.patch(`items/${editItemId}`, updatedItem);
      const updatedItems = items.map(item =>
        item.id === editItemId ? data : item,
      );
      setItems(updatedItems);
      setMessage(`O item com Id ${editItemId} foi alterado com sucesso!`);
      setName('');
      setMinimalStock('');
      setIsOpen();
    } catch (error: any) {
      setMessage(error.response.data.message);
    }
  };

  const handleOnClose = () => {
    setMessage('');
    setName('');
    setIsOpen();
  };

  const modalRef = useRef(null);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="modalContainerEditItemModal" ref={modalRef}>
        <div className="modalTitleEditItemModal">
          <h4>Editar item com Id {editItemId}</h4>
        </div>
        <form className="formEditItemModal" onSubmit={handleSubmit}>
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
          <label htmlFor="minimalStock">
            <input
              id="minimalStock"
              type="number"
              placeholder=" "
              required
              value={minimalStock}
              onChange={e => setMinimalStock(e.target.value)}
            />
            <span>Estoque minimo</span>
          </label>
          <p>{message}</p>
          <div className="footerEditItemModal">
            <button type="submit" id="confirmBtnEditItemModal">
              <FiCheck /> <div className="space" />
              <div>Confirmar</div>
              <div className="space" />
            </button>
            <button
              type="button"
              onClick={handleOnClose}
              id="cancelBtnEditItemModal"
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

export default EditItemModal;
