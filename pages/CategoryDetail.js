import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useProducts } from "../hooks/useFakeStoreQuery";


export const CategoryDetailScreen = ({ props }) =>{
  const { category } = props.params;
  const { data: products, isLoading } = useProducts();

  if (isLoading || !products) return <Text>Loading...</Text>;

  const filtered = products.filter((p) => p.category === category);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products in "{category}"</Text>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={styles.name}>{item.title}</Text>
              <Text>R{item.price.toFixed(2)}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  product: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
  },
  image: { width: 60, height: 60, resizeMode: 'contain' },
  name: { fontWeight: 'bold' },
});
