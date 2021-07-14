import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
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
      <ItemModal
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        items={items}
        setItems={setItems}
      />
      <div className="createItem">
        <button type="button" className="createItemBtn" onClick={toggleModal}>
          <FiPlus /> Criar novo item
        </button>
      </div>

      <div className="content">
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
                  <th>{Number(item.id).toLocaleString('pt-BR')}</th>
                  <th>{item.name}</th>
                  <th>
                    {Number(item.minimal_stock_alarm).toLocaleString('pt-BR', {
                      minimumFractionDigits: 3,
                    })}
                  </th>
                  <th>
                    {Number(item.total_stock).toLocaleString('pt-BR', {
                      minimumFractionDigits: 3,
                    })}
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
        {items.length === 0 ? <p>Nenhum item cadastrado</p> : <div />}
      </div>
    </div>
  );
};

export default ItemsList;
