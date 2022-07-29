/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { FiAlertCircle, FiCheck, FiX } from 'react-icons/fi';
import api from '../../services/api';

import Modal from '../Modal';

import loadingImg from '../../assets/loading1.gif';

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
  const [msgSucess, setmsgSucess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (isOpen === true) {
      setLoading(true);
      setErrorMsg(false);
      setQuantity('0');
      setType('in');
      api
        .get('/items')
        .then(response => {
          setItems(response.data);
          setId(response.data[0].id);
          setLoading(false);
        })
        .catch(() => {
          setErrorMsg(true);
          setLoading(false);
        });
    }
  }, [isOpen]);

  const handleOnClose = () => {
    setMessage('');
    setId('');
    setIsOpen();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const transaction = { item_id: id, item_quantity: Number(quantity), type };

    try {
      const { data } = await api.post('transactions', transaction);
      setTransactions([...transactions, data]);
      handleOnClose();
    } catch (error: any) {
      setmsgSucess(false);
      setMessage(error.response.data.message);
    }
  };

  const modalRef = useRef(null);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="modalContainerCreateTransactionModal" ref={modalRef}>
        <div className="modalTitleCreateTransactionModal">
          <h4>Criar nova transação</h4>
        </div>
        {loading ? (
          <div className="loadingCreateTransactionModal">
            <img src={loadingImg} alt="Loading" />
            <h4>Loading ...</h4>
          </div>
        ) : (
          <div className="modalContentCreateTransactionModal">
            {errorMsg ? (
              <div className="modalErrorMsgCreateTransactionModal">
                <button type="button" onClick={() => window.location.reload()}>
                  <FiAlertCircle size="40px" />{' '}
                  <h4>
                    Não foi possivel conectar ao servidor, clique aqui para
                    tentar novamente
                  </h4>
                </button>
              </div>
            ) : (
              <form
                className="formCreateTransactionModal"
                onSubmit={handleSubmit}
              >
                <label htmlFor="id">
                  <h6 className="selectTitleCreateTransactionModal">Nome</h6>
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
                    step="0.001"
                    min="0.001"
                    required
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                  />
                  <span>Quantidade</span>
                </label>
                <label htmlFor="type">
                  <h6 className="selectTitleCreateTransactionModal">Tipo</h6>
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
                <p className={msgSucess ? 'msgSucess' : 'msgFail'}>{message}</p>
                <div className="footerCreateTransactionModal">
                  <button type="submit" id="confirmBtnCreateTransactionModal">
                    <FiCheck /> <div className="space" />
                    <div>Confirmar</div>
                    <div className="space" />
                  </button>
                  <button
                    type="button"
                    onClick={handleOnClose}
                    id="cancelBtnCreateTransactionModal"
                  >
                    <FiX />
                    <div className="space" />
                    <div>Cancelar</div>
                    <div className="space" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CreateTransactionModal;
