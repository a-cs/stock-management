import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #18872b;
  /* margin: 64px 0 24px; */
`;

export const Card = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-grow: 0;
  border: 1px solid black;
`;

export const CardNameColumn = styled.View`
  flex-basis: 40%;
  align-items: center;
  justify-content: center;
  /* border: 1px solid red; */
`;

export const CardColumn = styled.View`
  flex-basis: 30%;
  align-items: center;
  justify-content: center;
  /* border: 1px solid red; */
`;

export const CardHeader = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #444444;
  margin: 24px 12px;
  text-align: center;
`;

export const CardFlatList = styled.FlatList`
  flex-grow: 0;
  height: 70%;
  background-color: green;
  margin-bottom: 10px;
`;

export const CardText = styled.Text`
  font-size: 24px;
  color: #ffffff;
  margin: 24px 24px;
`;
