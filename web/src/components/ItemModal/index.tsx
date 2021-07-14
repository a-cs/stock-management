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

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const ItemModal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  items,
  setItems,
}) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const item = { name };

    try {
      const { data } = await api.post('items', item);
      setItems([...items, data]);
      setMessage(`O item ${name} foi criado com sucesso!`);
      setName('');
    } catch (error) {
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
      <div className="modalContainer" ref={modalRef}>
        <div className="CloseBtn">
          <button
            type="button"
            onClick={() => {
              setIsOpen();
            }}
          >
            <FiX />
          </button>
        </div>
        <div className="title">
          <h1>Criar novo item</h1>
        </div>
        <form className="form" onSubmit={handleSubmit}>
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
          <div className="footer">
            <button type="button" onClick={handleOnClose} id="cancelBtn">
              <FiX /> Cancelar
            </button>
            <button type="submit" id="confirmBtn">
              <FiCheck /> <div>Confirmar</div>
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ItemModal;
