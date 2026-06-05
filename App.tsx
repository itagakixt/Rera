import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Alert,
  Modal,
  TextInput,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import database from '@react-native-firebase/database';

import AppStatusBar from './components/StatusBar';
import ActionButton from './components/ActionButton';
import ListItem from './components/ListItem';

type Item = {
  title: string;
  _key: string;
};

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const itemsRef = database().ref('items');
    const onValue = itemsRef.on('value', snap => {
      const next: Item[] = [];
      snap.forEach(child => {
        next.push({ title: child.val().title, _key: child.key! });
        return false;
      });
      setItems(next);
    });
    return () => itemsRef.off('value', onValue);
  }, []);

  function addItem() {
    const text = inputText.trim();
    if (!text) return;
    try {
      database().ref('items').push({ title: text });
    } catch (error: any) {
      console.error('Failed to add item:', error.message);
      Alert.alert('Error', 'Could not add item. Please try again.');
    }
    setInputText('');
    setModalVisible(false);
  }

  function removeItem(key: string) {
    Alert.alert('Complete', undefined, [
      { text: 'Complete', onPress: () => database().ref(`items/${key}`).remove() },
      { text: 'Cancel', style: 'cancel' },
    ]);
  }

  return (
    <View style={styles.container}>
      <AppStatusBar title="Rera Grocery List" />

      <FlatList
        data={items}
        keyExtractor={item => item._key}
        renderItem={({ item }) => (
          <ListItem item={item} onPress={() => removeItem(item._key)} />
        )}
        style={styles.list}
      />

      <ActionButton title="Add" onPress={() => setModalVisible(true)} />

      <Modal transparent animationType="fade" visible={modalVisible}>
        <View style={styles.overlay}>
          <View style={styles.dialog}>
            <Text style={styles.dialogTitle}>Add New Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Item name"
              value={inputText}
              onChangeText={setInputText}
              autoFocus
            />
            <View style={styles.dialogButtons}>
              <TouchableHighlight
                style={styles.dialogBtn}
                underlayColor="#eee"
                onPress={() => { setModalVisible(false); setInputText(''); }}>
                <Text>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.dialogBtn, styles.dialogBtnPrimary]}
                underlayColor="#1aaa6a"
                onPress={addItem}>
                <Text style={styles.dialogBtnPrimaryText}>Add</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  list: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 24,
  },
  dialog: { backgroundColor: '#fff', borderRadius: 8, padding: 20 },
  dialogTitle: { fontSize: 17, fontWeight: '600', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  dialogButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8 },
  dialogBtn: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 6 },
  dialogBtnPrimary: { backgroundColor: '#24CE84' },
  dialogBtnPrimaryText: { color: '#fff', fontWeight: '600' },
});
