import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View,Image } from 'react-native';
import axios from 'axios';

export default function App() {

  const [info, setInfo] = useState<any>({});
  const [loading,setloading ] = useState(true);

  const apiUrl = 'https://fakestoreapi.com/products';
  const fetchData  = async()=> {
setloading(true);
try{
const response  = await axios.get(apiUrl);
const data = response.data;
setInfo(data);
}
catch(error: any){

  console.log(error);

}
finally{

  setloading(false);
}

  };

  useEffect(()=> {
    fetchData();
  },[]);
    return (
 
    <View>
      {loading ? <Text>Loading ..</Text> :(
 <FlatList
      data={info}
      keyExtractor={(item : any) => item.id}
      renderItem={({item})=> 
      <View style={styles.card}>
      
      <Image
      source={{uri:item.image}}
      style={[styles.visaCard ,{width: 100, height:100}]}
      />
   
     <Text style={styles.txtMain}>{item.title}</Text>
      <Text style={styles.txtDesc}>{item.price}</Text>
      <Text style={styles.txtOther}>{item.description}</Text>

</View>
      }
      />

      )}
     

    </View>
 
   
  );
}

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
visaCard:{

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
 
});
