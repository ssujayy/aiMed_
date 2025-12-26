import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [error, setError] = useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      //const errmsg = JSON.stringify(err, null, 2);
      setError(JSON.stringify(err.message, null, 2));
      //console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={{ backgroundColor: "#60479eff", flex: 1 }}>
      <Text style={styles.signintext}>Sign In</Text>
      <Text style={{ color: "white", marginBottom: 30, marginLeft: 27 }}>
        Log in to your existing account:
      </Text>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email Address"
        placeholderTextColor={"#ffffffff"}
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        style={styles.textInput}
      />
      <TextInput
        value={password}
        placeholder="Password"
        placeholderTextColor={"#ffffffff"}
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        style={styles.textInput}
      />
      <Text style={{ color: "red", alignSelf: "center", fontWeight: 700 }}>
        {error}
      </Text>
      <TouchableOpacity onPress={onSignInPress} style={styles.button1}>
        <Text style={{ color: "#43326eff", fontWeight: 500 }}>Continue</Text>
      </TouchableOpacity>
      <Link href="/sign-up" asChild>
        <TouchableOpacity style={styles.button2}>
          <Text style={{ color: "white" }}>
            Don't have an account? Sign Up Now
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  signintext: {
    //textAlign: "center",
    marginLeft: 27,
    marginTop: 150,
    marginBottom: 7,
    color: "white",
    fontSize: 38,
    fontWeight: "700",
  },
  textInput: {
    borderWidth: 1.25,
    borderColor: "#f6e7ffff",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    //backgroundColor: "#C7C3F4",
    //#C7C3F4
    marginBottom: 8,
    marginHorizontal: 25,
    color: "white",
  },
  button1: {
    display: "flex",
    flexDirection: "row",
    gap: 3,
    marginTop: 25,
    backgroundColor: "#C7C3F4",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    alignSelf: "center",
    paddingHorizontal: 137,
  },
  button2: {
    display: "flex",
    flexDirection: "row",
    gap: 3,
    marginTop: 100,
    paddingVertical: 14,
    alignItems: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    alignSelf: "center",
    paddingHorizontal: 20,
  },
});
