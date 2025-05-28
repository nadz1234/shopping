import { observer } from "mobx-react-lite";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { listStore } from "../stores/listStore";
import { MyListItem } from "../components/MyListItems";
import { sendShoppingListEmail } from "../hooks/useMailComposer";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export const ShoppingListScreen = observer(() => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, padding: 8 }}>
      <FlatList
        data={listStore.listItems}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No items here man..</Text>}
        renderItem={({ item }) => (
          <MyListItem
            id={item.id}
            title={item.title}
            price={item.price}
            quantity={item.quantity}
            onRemove={() => listStore.removeFromList(item.id)}
            onQuantityChange={(qty) => listStore.editList(item.id, qty)}
            purchasedItem={item.purchased}
          ></MyListItem>
        )}
      />
      <View style={styles.bottomBar}>
        <Icon name="scan" size={40} color="#000" />

        <Text style={styles.total}>
          Total: R{listStore.totalPrice.toFixed(2)}
        </Text>
        <TouchableOpacity onPress={sendShoppingListEmail}>
          <Icon name="mail" size={40} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  itemContainer: { marginBottom: 12, padding: 10, borderRadius: 6 },
  input: { borderBottomWidth: 1, width: 50, marginVertical: 5 },
  remove: { color: "red", marginTop: 4 },
  total: { fontSize: 22, marginTop: 10, marginBottom: 15, fontWeight: "bold" },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
