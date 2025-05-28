import React from "react";
import { View, FlatList, Image, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const images = [
  {
    id: "1",
    uri: "https://www.greenqueen.com.hk/wp-content/uploads/2021/07/Rental-Fashion-Causes-More-Emissions-Than-Throwing-Clothes-Away.jpg",
  },
  {
    id: "2",
    uri: "https://thegreenhubonline.com/wp-content/uploads/2021/07/My-year-of-no-new-clothes.jpg",
  },
  {
    id: "3",
    uri: "https://t3.ftcdn.net/jpg/05/25/54/06/360_F_525540629_QxKds12GbTjsbqv3WeMQTstCvpvgy6MC.jpg",
  },
];

export const ImageCards = () => {
  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image
            source={{ uri: item.uri }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.8,
    height: 250,
    borderRadius: 15,
    overflow: "hidden",
    marginHorizontal: 10,
    backgroundColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
