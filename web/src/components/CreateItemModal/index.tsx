/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { FiAlertCircle, FiCheck, FiX } from 'react-icons/fi';
import api from '../../services/api';

import Modal from '../Modal';

import loadingImg from '../../assets/loading1.gif';

import './styles.css';

const units: string[] | undefined =
  process.env.REACT_APP_ITEMS_UNITS!.split(', ');

interface Category {
  id: string;
  name: string;
}

interface Item {
  id: string;
  name: string;
  unit: string;
  category: Category;
  minimal_stock_alarm: string;
  total_stock: string;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const CreateItemModal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  items,
  setItems,
}) => {
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [message, setMessage] = useState('');
  const [msgSucess, setmsgSucess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen === true) {
      setLoading(true);
      setName('');
      setUnit(units[0]);
      setErrorMsg(false);
      api
        .get('/categories')
        .then(response => {
          setCategories(response.data);
          setCategoryId(response.data[0].id);
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
    setIsOpen();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const item = { name, unit, category_id: categoryId };

    try {
      const { data } = await api.post('items', item);
      setItems([...items, data]);
      handleOnClose();
    } catch (error: any) {
      setmsgSucess(false);
      setMessage(error.response.data.message);
    }
  };

  const modalRef = useRef(null);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="modalContainerCreateItemModal" ref={modalRef}>
        <div className="modalTitleCreateItemModal">
          <h4>Criar novo item</h4>
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
              <form className="formCreateItemModal" onSubmit={handleSubmit}>
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
                <select
                  id="categoryId"
                  required
                  value={categoryId}
                  onChange={e => setCategoryId(e.target.value)}
                >
                  {categories.map((category: Category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <select
                  id="unit"
                  required
                  value={unit}
                  onChange={e => setUnit(e.target.value)}
                >
                  {units.map((itemUnit: string) => (
                    <option value={itemUnit} key={itemUnit}>
                      {itemUnit}
                    </option>
                  ))}
                </select>
                <p className={msgSucess ? 'msgSucess' : 'msgFail'}>{message}</p>
                <div className="footerCreateItemModal">
                  <button type="submit" id="confirmBtnCreateItemModal">
                    <FiCheck /> <div className="space" />
                    <div>Confirmar</div>
                    <div className="space" />
                  </button>
                  <button
                    type="button"
                    onClick={handleOnClose}
                    id="cancelBtnCreateItemModal"
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

export default CreateItemModal;
