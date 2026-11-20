import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import { supabase } from "../../lib/supabase/client";

export default function ForgotScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

 async function handleRecover() {
  if (!email) {
    Alert.alert("Error", "Please enter your email.");
    return;
  }

  setLoading(true);
  const redirectTo = Linking.createURL("reset_screen");
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo,
  });
  setLoading(false);

  if (error) {
    Alert.alert("Error", error.message);
    return;
  }

  Alert.alert(
    "Check your email",
    "We sent you a link to reset your password. Open it on this phone."
  );
}

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <View style={styles.form}>
        <Text style={styles.title}>Forgot your Password</Text>
        <Text style={styles.subtitle}>
          Enter your email and we'll send you an email confirmation
        </Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleRecover}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Recover the password</Text>
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
  backButton: {
    paddingTop: 70,
    paddingLeft: 24,
  },
  backArrow: {
    fontSize: 40,
    color: "#000000",
  },
  form: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: "#333333",
    textAlign: "center",
    marginBottom: 32,
  },
  label: {
    fontSize: 15,
    color: "#333333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#E8E8E8",
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 18,
    color: "#333333",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#7CB9E8",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
  },
});