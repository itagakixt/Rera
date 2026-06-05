import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AppStatusBar({ title }: { title: string }) {
  return (
    <View>
      <View style={styles.statusbar} />
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusbar: { backgroundColor: '#fff', height: 44 },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 44,
  },
  navbarTitle: { color: '#444', fontSize: 16, fontWeight: '500' },
});
