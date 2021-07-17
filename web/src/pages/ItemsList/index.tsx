import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ItemModal from '../../components/ItemModal';

import api from '../../services/api';

import './styles.css';

interface Item {
  id: string;
  name: string;
  minimal_stock_alarm: string;
  total_stock: string;
}

const ItemsList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  useEffect(() => {
    api.get('/items').then(response => {
      setItems(response.data);
    });
  }, []);

  return (
    <div className="container">
      <Header />
      <ItemModal
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        items={items}
        setItems={setItems}
      />

      <div className="wrapper">
        <div className="content">
          <div className="upper">
            <h2>Estoque</h2>
            <div className="createItem">
              <button
                type="button"
                className="createItemBtn"
                onClick={toggleModal}
              >
                <FiPlus /> Criar novo item
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
              </tr>
            </thead>
            <tbody>
              {items
                .sort((a, b) => Number(a.id) - Number(b.id))
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
                  </tr>
                ))}
            </tbody>
          </table>
          {items.length === 0 ? <p>Nenhum item cadastrado</p> : <div />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemsList;
