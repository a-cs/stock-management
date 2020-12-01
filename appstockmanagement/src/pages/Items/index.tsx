import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import api from '../../services/api';

import {
  Container,
  Title,
  Card,
  CardColumn,
  CardHeader,
  CardText,
} from './styles';

interface Item {
  id: string;
  name: string;
  minimal_stock_alarm: string;
  total_stock: string;
}

const Items: React.FC = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getItems(): Promise<void> {
      const { data } = await api.get('items');
      setItems(data);
    }
    getItems();
  }, []);

  const createNewItem = async () => {
    // const { data } = await api.get('items');
    // setItems(data);
    // data.map(item =>
    //   console.log(
    //     `${item.name} ${item.minimal_stock_alarm} ${item.total_stock}`,
    //   ),
    // );

    console.log('saiu');
  };
  return (
    <Container>
      <Title>Lista de Items</Title>
      <Card>
        <CardColumn>
          <CardHeader>Nome</CardHeader>
        </CardColumn>
        <CardColumn>
          <CardHeader>Estoque Minimo</CardHeader>
        </CardColumn>
        <CardColumn>
          <CardHeader>Estoque Total</CardHeader>
        </CardColumn>
      </Card>

      {items.map((item: Item) => (
        <Card key={item.id}>
          <CardColumn>
            <CardText>{item.name}</CardText>
          </CardColumn>
          <CardColumn>
            <CardText>{item.minimal_stock_alarm}</CardText>
          </CardColumn>
          <CardColumn>
            <CardText>{item.total_stock}</CardText>
          </CardColumn>
        </Card>
      ))}

      <Button title="Criar novo item" onPress={createNewItem} />
    </Container>
  );
};

export default Items;
