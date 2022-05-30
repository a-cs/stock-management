/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { FiAlertCircle, FiCheck, FiX } from 'react-icons/fi';
import api from '../../services/api';

import Modal from '../Modal';

import loadingImg from '../../assets/loading1.gif';

import './styles.css';

interface Category {
  id: string;
  name: string;
}

interface Item {
  id: string;
  name: string;
  category: Category;
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
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [message, setMessage] = useState('');
  const [msgSucess, setmsgSucess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen === true) {
      if (editItemId !== '0') {
        setLoading(true);
        setErrorMsg(false);
        api
          .get('/categories')
          .then(response => {
            setCategories(response.data);
            setLoading(false);
          })
          .catch(() => {
            setErrorMsg(true);
            setLoading(false);
          });
        const editItem = items.filter(item => item.id === editItemId)[0];
        setName(editItem.name);
        setMinimalStock(editItem.minimal_stock_alarm);
        setCategoryId(editItem.category.id);
      }
    }
    return () => {
      setMessage('');
      setName('');
      setMinimalStock('');
    };
  }, [items, editItemId, isOpen]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const updatedItem = {
      name,
      category_id: categoryId,
      minimal_stock_alarm: minimalStock,
    };

    try {
      const { data } = await api.patch(`items/${editItemId}`, updatedItem);
      const updatedItems = items.map(item =>
        item.id === editItemId ? data : item,
      );
      setItems(updatedItems);
      setmsgSucess(true);
      setMessage(`O item com Id ${editItemId} foi alterado com sucesso!`);
      // setName('');
      // setMinimalStock('');
      // setCategoryId('0');
      // setIsOpen();
    } catch (error: any) {
      setmsgSucess(false);
      setMessage(error.response.data.message);
    }
  };

  const handleOnClose = () => {
    setMessage('');
    setmsgSucess(false);
    setName('');
    setMinimalStock('');
    setCategoryId('0');
    setIsOpen();
  };

  const modalRef = useRef(null);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="modalContainerEditItemModal" ref={modalRef}>
        <div className="modalTitleEditItemModal">
          <h4>Editar item com Id {editItemId}</h4>
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
                <select
                  id="id"
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
                <p className={msgSucess ? 'msgSucess' : 'msgFail'}>{message}</p>
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
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default EditItemModal;
