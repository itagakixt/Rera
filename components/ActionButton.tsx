import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

const ACTION_COLOR = '#24CE84';

export default function ActionButton({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <View style={styles.action}>
      <TouchableHighlight underlayColor={ACTION_COLOR} onPress={onPress}>
        <Text style={styles.actionText}>{title}</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  action: {
    backgroundColor: ACTION_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  actionText: { color: '#fff', fontSize: 16, textAlign: 'center' },
});
