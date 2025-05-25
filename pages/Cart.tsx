import { observer } from "mobx-react-lite";
import { View,Text,FlatList,TextInput, TouchableOpacity, StyleSheet  } from "react-native";
import { cartStore } from "../stores/cartStore";


export const CartScreen = observer(()=>{

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.title}>Cart</Text>
      <FlatList
        data={cartStore.cart}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No items here man..</Text>}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.title}</Text>
            <Text>R{item.price}</Text>
            <TextInput
              style={styles.input}
              value={item.quantity.toString()}
              onChangeText={(text) => {
                const qty = parseInt(text, 10);
                cartStore.editCart(item.id,  qty);
              }}
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={() => cartStore.removeFromCart(item.id)}>
              <Text style={styles.remove}>Remove Item</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.total}>Total: R{cartStore.totalPrice.toFixed(2)}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  itemContainer: { marginBottom: 12, padding: 10, borderRadius: 6 },
  input: { borderBottomWidth: 1, width: 50, marginVertical: 5 },
  remove: { color: 'red', marginTop: 4 },
  total: { fontSize: 18,  marginTop: 20 },
});

