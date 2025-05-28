import { listStore } from "../stores/listStore";
import * as MailComposer from "expo-mail-composer";
import { Alert } from "react-native";

export const sendShoppingListEmail = () => {
  const items = listStore.listItems
    .map((item) => {
      return `${item.title} - $${item.price} - Qty: ${item.quantity ?? 1}`;
    })
    .join("\n");

  const emailContent = `Here is your shopping list:\n\n${items}`;

  MailComposer.composeAsync({
    recipients: [""],
    subject: "My Shopping List",
    body: emailContent,
  }).catch((err) => {
    Alert.alert("Error", "Could not open email composer");
    console.error(err);
  });
};
