import React from 'react';
import { View, StatusBar, Text } from 'react-native';

const App: React.FC = () => (
  <View>
    <StatusBar barStyle="light-content" backgroundColor="#ccc" />

    <View style={{ flex: 1, backgroundColor: '#999' }} />
    <Text>test</Text>
  </View>
);

export default App;
