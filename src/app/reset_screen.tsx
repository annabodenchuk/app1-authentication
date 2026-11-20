import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import waves from "../../assets/images/waves.png";
import { supabase } from "../../lib/supabase/client";

export default function ResetScreen() {
  const router = useRouter();
  const url = Linking.useLinkingURL();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function createSession() {
      if (!url) return;

      const hash = new URLSearchParams(url.split("#")[1] ?? "");
      const accessToken = hash.get("access_token");
      const refreshToken = hash.get("refresh_token");
      const code = Linking.parse(url).queryParams?.code;

      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (!error) setReady(true);
      } else if (typeof code === "string") {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) setReady(true);
      }
    }
    createSession();
  }, [url]);

  async function handleContinue() {
    if (!password || !confirmPassword) {
      Alert.alert("Error", "Please fill in both fields.");
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
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    await supabase.auth.signOut();
    Alert.alert("Success", "Your password was changed. Please log in.", [
      { text: "OK", onPress: () => router.replace("/login_screen") },
    ]);
  }

  if (!ready) {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Checking your link...</Text>
          <Text style={styles.label}>
            Open the reset link from your email on this phone.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <View style={styles.form}>
        <Text style={styles.title}>Reset your Password</Text>

        <Text style={styles.label}>Enter your new password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          style={styles.input}
        />

        <Text style={styles.label}>Confirm password</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleContinue}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>

      <Image source={waves} style={styles.waves} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#B0D4F0",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 18,
    color: "#333333",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#7CB9E8",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
  },
  waves: {
    width: "100%",
    height: 120,
  },
});