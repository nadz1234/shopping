import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

type productItemCardProps = {
  image: string;
  title: string;
  price: number;
  onPress: () => void;
};

export const ProductItemCard = ({
  image,
  title,
  price,
  onPress,
}: productItemCardProps) => {
  return (
    <View style={styles.cardProdList}>
      <Image
        source={{ uri: image }}
        style={styles.imageList}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.titleList} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.price}>R {price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.buttonList} onPress={onPress}>
          <Text style={styles.buttonTextList}>Add to my list</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardProdList: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    alignItems: "center",
  },
  imageList: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  titleList: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  buttonList: {
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  buttonTextList: {
    color: "#fff",
    fontWeight: "bold",
  },
});
