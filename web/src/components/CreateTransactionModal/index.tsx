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

interface Transaction {
  id: string;
  item_quantity: string;
  type: string;
  item: Item;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const CreateTransactionModal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  transactions,
  setTransactions,
}) => {
  const [id, setId] = useState('');
  const [quantity, setQuantity] = useState('0');
  const [type, setType] = useState('in');
  const [message, setMessage] = useState('');
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (isOpen === true) {
      api
        .get('/items')
        .then(response => {
          setItems(response.data);
          setId(response.data[0].id);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [isOpen]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const transaction = { item_id: id, item_quantity: Number(quantity), type };

    try {
      const { data } = await api.post('transactions', transaction);
      setTransactions([...transactions, data]);
      setMessage(`A transação ${data.id} foi criada com sucesso!`);
    } catch (error: any) {
      setMessage(error.response.data.message);
    }
  };

  const handleOnClose = () => {
    setMessage('');
    setId('');
    setIsOpen();
  };

  const modalRef = useRef(null);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="modalContainer" ref={modalRef}>
        <div className="modalTitle">
          <h1>Criar nova transação</h1>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="id">
            <h6 className="selectTitle">Nome</h6>
            <select
              id="id"
              required
              value={id}
              onChange={e => setId(e.target.value)}
            >
              {items.map((item: Item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="item_quantity">
            <input
              id="item_quantity"
              type="number"
              placeholder=" "
              min="1"
              required
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
            />
            <span>Quantidade</span>
          </label>
          <label htmlFor="type">
            <h6 className="selectTitle">Tipo</h6>
            <select
              id="type"
              required
              value={type}
              onChange={e => setType(e.target.value)}
            >
              <option value="in">Entrada</option>
              <option value="out">Saida</option>
            </select>
          </label>
          <p>{message}</p>
          <div className="footer">
            <button type="submit" id="confirmBtn">
              <FiCheck /> <div className="space" />
              <div>Confirmar</div>
              <div className="space" />
            </button>
            <button type="button" onClick={handleOnClose} id="cancelBtn">
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

export default CreateTransactionModal;
