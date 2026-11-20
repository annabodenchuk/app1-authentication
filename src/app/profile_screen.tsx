import { useRouter } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "../../lib/supabase/client";

export default function ProfileScreen() {
  const router = useRouter();

  function handleLogout() {
    Alert.alert("Log out", "Would you really like to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Continue",
        onPress: async () => {
          await supabase.auth.signOut();
          router.replace("/login_screen");
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingTop: 100,
    paddingHorizontal: 24,
    alignItems: "flex-end",
  },
  logoutText: {
    color: "#E53935",
    fontSize: 20,
    
  },
});