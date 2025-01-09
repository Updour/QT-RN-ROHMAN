import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export default  Crud = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  // Fungsi untuk menambah item baru
  const addItem = () => {
    if (input.trim() === '') {
      Alert.alert('Error', 'Please enter a valid name');
      return;
    }

    const newItem = { id: Date.now().toString(), name: input };
    setData([...data, newItem]);
    setInput('');
  };

  // Fungsi untuk mengedit item yang sudah ada
  const editItem = (item) => {
    setEditingItem(item);
    setInput(item.name);
  };

  // Fungsi untuk memperbarui item
  const updateItem = () => {
    if (input.trim() === '') {
      Alert.alert('Error', 'Please enter a valid name');
      return;
    }

    const updatedData = data.map((item) =>
      item.id === editingItem.id ? { ...item, name: input } : item
    );
    setData(updatedData);
    setEditingItem(null);
    setInput('');
  };

  // Fungsi untuk menghapus item
  const deleteItem = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRUD Example</Text>
      
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Enter item name"
      />
      
      <Button
        title={editingItem ? 'Update Item' : 'Add Item'}
        onPress={editingItem ? updateItem : addItem}
      />
      
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => editItem(item)} style={styles.button}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem(item.id)} style={styles.button}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 18,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});
