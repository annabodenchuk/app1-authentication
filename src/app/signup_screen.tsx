import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import cloud1 from "../../assets/images/cloud1.png";
import cloud2 from "../../assets/images/cloud2.png";
import { supabase } from "../../lib/supabase/client";

export default function SignUpScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    if (!fullName || !preferredName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          preferred_name: preferredName.trim(),
        },
      },
    });
    setLoading(false);

    if (error) {
      Alert.alert("Sign up failed", error.message);
      return;
    }

    Alert.alert("Success", "Account created! You can log in now.", [
      { text: "OK", onPress: () => router.replace("/login_screen") },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Image source={cloud1} style={styles.cloudTop} />
      </View>

      <View style={styles.form}>
        <Text style={styles.title}>Create your account</Text>

        <TextInput
          placeholder="Full name"
          placeholderTextColor="#B0B8C4"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />

        <TextInput
          placeholder="Preferred name"
          placeholderTextColor="#B0B8C4"
          value={preferredName}
          onChangeText={setPreferredName}
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#B0B8C4"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#B0B8C4"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#B0B8C4"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
          style={styles.input}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <Image source={cloud2} style={styles.cloudBottom} />
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
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  backButton: {
    paddingTop: 70,
    paddingLeft: 24,
  },
  backArrow: {
    fontSize: 40,
    color: "#000000",
  },
  cloudTop: {
    width: 230,
    height: 136,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 28,
  },
  input: {
    backgroundColor: "rgba(200, 182, 255, 0.4)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    padding: 16,
    fontSize: 18,
    color: "#333333",
    marginBottom: 16,
  },
  buttonRow: {
    alignItems: "center",
    marginTop: 16,
  },
  button: {
    backgroundColor: "#C8B6FF",
    borderRadius: 16,
    width: "80%",
    height:50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  cloudBottom: {
    width: 200,
    height: 150,
  },
});