import React, { useEffect,useState } from 'react';
import { FlatList, StyleSheet, Text, View,Image, ActivityIndicator, TouchableOpacity,Dimensions } from 'react-native';
import { useProducts } from "../hooks/useFakeStoreQuery";
import { observer } from 'mobx-react-lite';
import { listStore } from "../stores/listStore";
import {
  useNavigation,
} from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import {CategoryCard} from '../components/CategoryCard';
import {ProductItemCard} from '../components/ProductItemCard';
import Icon from 'react-native-vector-icons/Ionicons';

export const HomeScreen = observer(() =>{

const navigation = useNavigation();
const { data: products, isLoading } = useProducts();
const categoriesMap = new Map();


  const [selectedCategory, setSelectedCategory] = useState(null);
  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }
  

products.forEach((p) => {
  if (!categoriesMap.has(p.category)) {
    categoriesMap.set(p.category, p.image); 
  }
});

const categories = Array.from(categoriesMap, ([category, image]) => ({
  category,
  image,
}));


      // Filter products by selected category
  const filtered = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : [];

      return (
        <>
           <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('ShoppingList')}>
      <Icon name="list-outline" size={40} color="#fff" />
      {listStore.itemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{listStore.itemCount}</Text>
        </View>
      )}
    </TouchableOpacity>
    <View >
        
      <Text style={styles.headerText}>Select a Category</Text>

      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.category}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item }) => (  
        <CategoryCard image={item.image} description={item.category} onPress={() => setSelectedCategory(item.category)} activeCategory={selectedCategory}></CategoryCard>

        )}
      />
      {selectedCategory && (
        <>
          <Text style={styles.headerText}>{selectedCategory}</Text>
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <>
            <ProductItemCard image={item.image} title={item.title} price={item.price} onPress={() => listStore.addToList(item)}></ProductItemCard>
        
           </>

            )}
            
          />
        </>
      )}
    </View>
    </>
  );
});


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
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    zIndex: 10,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  headerText:{
  fontSize: 22,
  fontWeight: 'bold', 
  marginBottom: 10,
  textAlign: 'center',
  marginTop: 18,
  marginBottom: 18,
  }
});