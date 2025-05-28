import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
