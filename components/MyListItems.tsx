import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

type Props = {
  title: string;
  price: number;
  quantity: number;
  onRemove: () => void;
  onQuantityChange: (qty: number) => void;
};

export const MyListItem = ({ title, price, quantity, onRemove, onQuantityChange }: Props) => {
  const [purchased, setPurchased] = useState(false);

  return (
    <View style={[styles.card, purchased && styles.purchased]}>
      <Text style={styles.title}>
        {title} {purchased ? '(Purchased)' : ''}
      </Text>
      <Text style={styles.price}>R {price.toFixed(2)}</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={quantity.toString()}
        onChangeText={(text) => onQuantityChange(Number(text))}
        editable={!purchased}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.remove]} onPress={onRemove}>
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.done]}
          onPress={() => setPurchased(true)}
          disabled={purchased}
        >
          <Text style={styles.buttonText}>{purchased ? 'Purchased' : 'Mark as Done'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  purchased: {
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 6,
    alignItems: 'center',
  },
  remove: {
    backgroundColor: '#dc3545',
  },
  done: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
