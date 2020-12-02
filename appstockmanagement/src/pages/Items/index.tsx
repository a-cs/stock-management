import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import api from '../../services/api';

import {
  Container,
  Title,
  Card,
  CardNameColumn,
  CardColumn,
  CardHeader,
  CardText,
  CardFlatList,
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
    const date = new Date();
    const { data } = await api.post('items', {
      name: `teste ${date.toISOString()}`,
    });
    setItems([...items, data]);

    console.log('saiu');
  };
  return (
    <Container>
      <Title>Lista de Items</Title>
      <Card>
        <CardNameColumn>
          <CardHeader>Nome</CardHeader>
        </CardNameColumn>
        <CardColumn>
          <CardHeader>Estoque Minimo</CardHeader>
        </CardColumn>
        <CardColumn>
          <CardHeader>Estoque Total</CardHeader>
        </CardColumn>
      </Card>

      <CardFlatList<Item>
        keyExtractor={item => {
          item.id;
        }}
        data={items}
        renderItem={({ item }) => (
          <Card>
            <CardNameColumn>
              <CardText>{item.name}</CardText>
            </CardNameColumn>
            <CardColumn>
              <CardText>{item.minimal_stock_alarm}</CardText>
            </CardColumn>
            <CardColumn>
              <CardText>{item.total_stock}</CardText>
            </CardColumn>
          </Card>
        )}
      />

      <Button title="Criar novo item" onPress={createNewItem} />
    </Container>
  );
};

export default Items;
