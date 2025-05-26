import React from 'react';
import { View,Image,Text,StyleSheet,TouchableOpacity } from 'react-native';


type categoryCardProps = {
    image: string;
    description:string;
    onPress: () => void;
    activeCategory:boolean;
}

export const CategoryCard=({image,description,onPress,activeCategory }:categoryCardProps) =>{

   return (
      <TouchableOpacity
      onPress={onPress}
      >
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
      <Image
        source={{ uri: image}}
        style={styles.image}
        resizeMode="cover"
      />
      </View>
      <View style={styles.content}>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
   </TouchableOpacity>
  );

}

const styles = StyleSheet.create({
  card: {
    width: 140,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
   imageWrapper: {
    padding: 15,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
     borderRadius: 8,
  },
  content: {
    padding: 8,
  },
  description: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
  activeCategory: {
    backgroundColor: '#aaa',
  },
});