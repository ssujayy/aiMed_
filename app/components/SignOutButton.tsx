import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function SignOutButton() {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to your desired page
      router.replace("/(auth)/sign-in");
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#6E5DD3",
        padding: 10,
        borderRadius: 10,
        marginTop: 50,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
        width: 175,
        alignSelf: "center",
      }}
      onPress={handleSignOut}
    >
      <Text
        style={{
          color: "white",
          alignSelf: "center",
          fontWeight: 700,
          fontSize: 22,
        }}
      >
        Sign out
      </Text>
    </TouchableOpacity>
  );
}
