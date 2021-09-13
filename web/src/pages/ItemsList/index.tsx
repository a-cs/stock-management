import React, { useEffect, useState } from 'react';
import { FiPlus, FiEdit, FiAlertCircle } from 'react-icons/fi';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import CreateItemModal from '../../components/CreateItemModal';
import EditItemModal from '../../components/EditItemModal';

import api from '../../services/api';

import loadingImg from '../../assets/loading1.gif';

import './styles.css';

interface Item {
  id: string;
  name: string;
  minimal_stock_alarm: string;
  total_stock: string;
}

const ItemsList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [editItemId, setEditItemId] = useState('0');
  const [modalOpenCreateItem, setModalOpenCreateItem] = useState(false);
  const [modalOpenEditItem, setModalOpenEditItem] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  function toggleCreateItemModal(): void {
    setModalOpenCreateItem(!modalOpenCreateItem);
  }
  function toggleEditItemModal(): void {
    setModalOpenEditItem(!modalOpenEditItem);
  }

  useEffect(() => {
    setLoading(true);
    api
      .get('/items')
      .then(response => {
        setErrorMsg(false);
        setLoading(false);
        setItems(response.data);
      })
      .catch(() => {
        setLoading(false);
        setErrorMsg(true);
      });
  }, []);

  return (
    <div className="container">
      <Header selectedMenu="Items" />
      <CreateItemModal
        isOpen={modalOpenCreateItem}
        setIsOpen={toggleCreateItemModal}
        items={items}
        setItems={setItems}
      />
      <EditItemModal
        isOpen={modalOpenEditItem}
        setIsOpen={toggleEditItemModal}
        items={items}
        setItems={setItems}
        editItemId={editItemId}
      />

      <div className="wrapper">
        <div className="content">
          <div className="upper">
            <h2>Estoque</h2>
            <div className="createItem">
              <button
                type="button"
                className="createItemBtn"
                onClick={toggleCreateItemModal}
              >
                <FiPlus /> Criar novo item
              </button>
              <button
                type="button"
                className="createItemBtnMobile"
                onClick={toggleCreateItemModal}
              >
                <FiPlus size="40px" />
              </button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Estoque mínimo</th>
                <th>Estoque total</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {items
                // .sort((a, b) => Number(a.id) - Number(b.id))
                .map((item: Item) => (
                  <tr key={item.id}>
                    <td data-label="Id">
                      {Number(item.id).toLocaleString('pt-BR')}
                    </td>
                    <td data-label="Nome">{item.name}</td>
                    <td data-label="Estoque mínimo">
                      {Number(item.minimal_stock_alarm).toLocaleString(
                        'pt-BR',
                        {
                          minimumFractionDigits: 3,
                        },
                      )}
                    </td>
                    <td data-label="Estoque total">
                      {Number(item.total_stock).toLocaleString('pt-BR', {
                        minimumFractionDigits: 3,
                      })}
                    </td>
                    <td data-label="Editar" className="editItem">
                      <button
                        className="editButton"
                        type="button"
                        onClick={() => {
                          setEditItemId(item.id);
                          toggleEditItemModal();
                        }}
                      >
                        <FiEdit size="20px" strokeWidth="2" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="errorMsg">
            {loading ? (
              <>
                <img src={loadingImg} alt="Loading" />
                <h4>Loading ...</h4>
              </>
            ) : (
              <div />
            )}
            {errorMsg ? (
              <button type="button" onClick={() => window.location.reload()}>
                <FiAlertCircle size="40px" />{' '}
                <h4>
                  Não foi possivel conectar ao servidor, clique aqui para tentar
                  novamente
                </h4>
              </button>
            ) : (
              <div />
            )}
            {items.length === 0 && !errorMsg && !loading ? (
              <h4>Nenhum item cadastrado</h4>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemsList;
