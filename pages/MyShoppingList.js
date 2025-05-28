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
import { styles } from "./styles/MyShoppingListStyle.styles";

export const ShoppingListScreen = observer(() => {
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
