import React, { useEffect,useState } from 'react';
import { FlatList, StyleSheet, Text, View,Image, ActivityIndicator, TouchableOpacity,Dimensions } from 'react-native';
import { useProducts } from "../hooks/useFakeStoreQuery";
import { observer } from 'mobx-react-lite';
import { listStore } from "../stores/listStore";
import {
  useNavigation,
} from '@react-navigation/native';
import { Button } from '@react-navigation/elements';

export const HomeScreen = observer(() =>{

const navigation = useNavigation();
const { data: products, isLoading } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState(null);
  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }
    const categories = [...new Set(products.map((p) => p.category))];


      // Filter products by selected category
  const filtered = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : [];

      return (
        <>
        <Button style={styles.center} onPress={() => navigation.navigate('ShoppingList')}>
       <Text>Go to my List</Text> 
      </Button>
    <View style={styles.container}>
        
      <Text style={styles.title}>Select a Category</Text>

      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              item === selectedCategory && styles.activeCategory,
            ]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedCategory && (
        <>
          <Text style={styles.subtitle}>Products in "{selectedCategory}"</Text>
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <>
            <ProductItem product={item} />

            <TouchableOpacity
              style={styles.button}
              onPress={() => listStore.addToList(item)}
            >
              <Text style={styles.buttonText}>Add to List</Text>
            </TouchableOpacity>
</>

            )}
            
          />
        </>
      )}
    </View>
    </>
  );
});


const ProductItem = ({ product }) => (
  <View style={styles.item}>
    <Image source={{ uri: product.image }} style={styles.image} />
    <View style={{ flex: 1, marginLeft: 10 }}>
      <Text style={styles.title}>{product.title}</Text>
      <Text>R{product.price.toFixed(2)}</Text>
    </View>
  </View>
);

  const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  categoryButton: {
    padding: 10,
    backgroundColor: '#ddd',
    marginRight: 8,
    borderRadius: 8,
  },
  activeCategory: {
    backgroundColor: '#aaa',
  },
  product: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#eee',
    marginBottom: 8,
    borderRadius: 8,
  },
  image: { width: 50, height: 50, resizeMode: 'contain' },
  productTitle: { fontWeight: 'bold' },

    fab: {
     position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    width: width - 40,
    backgroundColor: '#6200ee',
    paddingVertical: 16,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
});