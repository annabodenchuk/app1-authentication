import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import mountains from "../../assets/images/mountains.png";
import { supabase } from "../../lib/supabase/client";
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const router = useRouter();
const [loading, setLoading] = useState(false);

async function handleLogin() {
  if (!email || !password) {
    Alert.alert("Error", "Please enter your email and password.");
    return;
  }

  setLoading(true);
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });
  setLoading(false);

  if (error) {
    if (error.message === "Invalid login credentials") {
      Alert.alert(
        "Login failed",
        "Email or password is wrong, or this account doesn't exist."
      );
    } else {
      Alert.alert("Login failed", error.message);
    }
    return;
  }

  router.replace("/welcome_screen");
}
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Log in</Text>
        
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

        <View style={styles.forgotRow}>
          <TouchableOpacity onPress={() => router.push("/forgot_screen")}>
            <Text style={styles.forgotText}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}>
          <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/signup_screen")}>
  <Text style={styles.signupLink}>Sign up</Text>
</TouchableOpacity>
        </View>
      </View>

      <Image
        source={mountains}
        style={styles.mountains}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  form: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    backgroundColor: "#DDEFE4",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    padding: 16,
    fontSize: 18,
    color: "#333333",
    marginBottom: 16,
  },
  forgotRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  forgotText: {
    color: "#7CB9E8",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#A8D5BA",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    padding: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  signupText: {
    color: "#333333",
    fontSize: 16,
  },
  signupLink: {
    color: "#7CB9E8",
    fontSize: 16,
  },
  mountains: {
    width: "100%",
    height: 300,
  },
});