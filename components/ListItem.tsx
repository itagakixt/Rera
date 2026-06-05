import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

type Props = {
  item: { title: string; _key: string };
  onPress: () => void;
};

export default function ListItem({ item, onPress }: Props) {
  return (
    <TouchableHighlight onPress={onPress} underlayColor="#f0f0f0">
      <View style={styles.li}>
        <Text style={styles.liText}>{item.title}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liText: { color: '#333', fontSize: 16 },
});
