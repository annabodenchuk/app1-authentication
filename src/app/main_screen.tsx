import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function MainScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity
            style={styles.profileCircle}
            onPress={() => router.push("/profile_screen")}
>
        <View style={styles.head} />
        <View style={styles.body} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  profileCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#000000",
    overflow: "hidden",
  },
  head: {
    position: "absolute",
    top: 9,
    left: 15,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#FFFFFF",
  },
  body: {
    position: "absolute",
    top: 27,
    left: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },
});