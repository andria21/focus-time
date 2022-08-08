import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default FocusHistory = ({ history }) => {
  if (!history || !history.length)
    return <Text style={styles.title}>We haven't focused on anything yet! </Text>;

  const renderItem = ({ item }) => <Text style={styles.item}>- {item}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Things we've focused on:</Text>
      <FlatList data={history} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  item: {
    color: '#fff',
    fontSize: 16,
    paddingTop: 8,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    padding: 16,
    fontWeight: 'bold',
  },
});

//   white: '#fff',
//   darkBlue: '#1C2833',
//   purple: '#800080',
