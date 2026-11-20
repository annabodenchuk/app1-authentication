import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import leaves from "../../assets/images/leaves.png";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.leavesRow}>
        <Image source={leaves} style={styles.leaves} />
      </View>

      <View style={styles.content}>
        <View style={styles.circle}>
          <Text style={styles.check}>✓</Text>
        </View>

        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>
          Your account was created successfully
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/main_screen")}
        >
          <Text style={styles.buttonText}>Start</Text>
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
  leavesRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  leaves: {
    width: 220,
    height: 190,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  circle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#7DC383",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  check: {
    fontSize: 80,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#9DC8EC",
    borderRadius: 8,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#000000",
    fontSize: 22,
    fontWeight: "bold",
  },
});