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
import { ProductItemCard } from "../components/ProductItemCard";
import { useProducts } from "../hooks/useFakeStoreQuery";
import { ScrollView } from "react-native";
export const HomeScreen = observer(() => {
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
          <Text style={styles.headerText}>
            Please select or search for item
          </Text>
        )}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  categoryButton: {
    padding: 10,
    backgroundColor: "#ddd",
    marginRight: 8,
    borderRadius: 8,
  },
  activeCategory: {
    backgroundColor: "#aaa",
  },
  product: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#eee",
    marginBottom: 8,
    borderRadius: 8,
  },
  image: { width: 50, height: 50, resizeMode: "contain" },
  productTitle: { fontWeight: "bold" },

  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    zIndex: 10,
  },
  badge: {
    position: "absolute",
    top: -3,
    right: -3,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    marginTop: 18,
    marginBottom: 18,
  },
  searchBox: {
    padding: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    margin: 10,
    borderRadius: 25,
    backgroundColor: "#f9f9f9",
  },
  containerB: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  buttonB: {
    backgroundColor: "#1e90ff",
    height: 50,
    paddingVertical: 16,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
