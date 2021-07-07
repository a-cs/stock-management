import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

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

  const handleCreateNewItem = async () => {
    const date = new Date();
    const { data } = await api.post('items', {
      name: `teste ${date.toISOString()}`,
    });
    setItems([...items, data]);
  };

  useEffect(() => {
    api.get('/items').then(response => {
      setItems(response.data);
    });
  }, []);

  return (
    <div className="container">
      <button type="button" onClick={handleCreateNewItem}>
        <FiPlus /> Criar novo item
      </button>

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
            {items.map((item: Item) => (
              <tr key={item.id}>
                <th>{item.id}</th>
                <th>{item.name}</th>
                <th>{item.minimal_stock_alarm}</th>
                <th>{item.total_stock}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemsList;
