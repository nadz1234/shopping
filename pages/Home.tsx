import React from "react";
import { FlatList, StyleSheet, Text, View,Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useProducts } from "../hooks/useFakeStoreQuery";
import { observer } from 'mobx-react-lite';
import { cartStore } from "../stores/cartStore";

export const HomeScreen = observer(() =>{

 const { data, error, isLoading } = useProducts();

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error fetching data</Text>
      </View>
    );
  }

    return (
 
    <View>
      {isLoading ? (<Text>Loading ..</Text>) 
        :(
      <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item})=> 
      <View style={styles.card}>
      
      <Image
      source={{uri:item.image}}
      style={[styles.imgCard ,{width: 100, height:100}]}
      />
   
     <Text style={styles.txtMain}>{item.title}</Text>
      <Text style={styles.txtDesc}>{item.price}</Text>
      <Text style={styles.txtOther}>{item.description}</Text>
      <TouchableOpacity
              style={styles.button}
              onPress={() => cartStore.addToCart(item)}
            >
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>

     </View>
      }
      />
    )
}
 </View>

  )});


const styles = StyleSheet.create({
  card:{
    marginTop:55,
    backgroundColor: '#fff',
    borderRadius:10,
    shadowColor:'#000',
    shadowOffset:{width:0, height:1},
    shadowRadius:1,
elevation:2,
margin:10,
padding:10,
justifyContent:'center',
alignItems:'center'
  },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
imgCard:{

borderRadius: 100/2,
justifyContent:'center',
alignItems:'center'
},
txtMain:{
  fontSize:20,
  fontWeight:'bold',
  marginTop:10
},
txtDesc:{
  fontSize:15,
  marginTop:10
},
txtOther:{
  fontSize:10,
  marginTop:10
},
  button: { backgroundColor: '#007bff', marginTop: 8, padding: 8, borderRadius: 4 },
  buttonText: { color: 'white' },
 
});