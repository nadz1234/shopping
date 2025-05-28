import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { observer } from "mobx-react-lite";
import { listStore } from "../stores/listStore";
import { useNavigation } from "@react-navigation/native";
import { CategoryCard } from "../components/CategoryCard";
import { ImageCards } from "../components/ImageCards";
import { ProductItemCard } from "../components/ProductItemCard";
import { useProducts } from "../hooks/useFakeStoreQuery";
import { ScrollView } from "react-native";
import { styles } from "./styles/HomeStyles.styles";
export const HomeScreen = observer(() => {
  const navigation = useNavigation();
  const { data: products, isLoading } = useProducts();
  const categoriesMap = new Map();
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
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

  const filtered = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : [];

  return (
    <View style={{ flex: 1, padding: 8 }}>
      <View style={styles.containerB}>
        <TouchableOpacity
          style={styles.buttonB}
          onPress={() => navigation.navigate("ShoppingList")}
        >
          <Text style={styles.buttonText}>My List</Text>
          {listStore.itemCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{listStore.itemCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <TextInput
          placeholder="Search..."
          value={listStore.searchQuery}
          onChangeText={(text) => listStore.setSearchQuery(text)}
          style={styles.searchBox}
        />

        <Text style={styles.headerText}>Select a Category</Text>

        <FlatList
          data={categories}
          horizontal
          keyExtractor={(item) => item.category}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CategoryCard
              image={item.image}
              description={item.category}
              onPress={() => setSelectedCategory(item.category)}
              activeCategory={selectedCategory}
            />
          )}
        />

        {listStore.searchQuery ? (
          listStore.filteredList.map((item) => (
            <ProductItemCard
              key={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              onPress={() => listStore.addToList(item)}
            />
          ))
        ) : selectedCategory ? (
          <>
            <Text style={styles.headerText}>{selectedCategory}</Text>
            {filtered.map((item) => (
              <ProductItemCard
                key={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                onPress={() => listStore.addToList(item)}
              />
            ))}
          </>
        ) : (
          <>
            <Text style={styles.headerText}>Some ideas</Text>
            <ImageCards></ImageCards>
          </>
        )}
      </ScrollView>
    </View>
  );
});
