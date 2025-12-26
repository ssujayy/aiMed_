import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import * as React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const [error, setError] = React.useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setError(JSON.stringify(err.message, null, 2));
      //console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setError(JSON.stringify(err.message, null, 2));
      //console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View style={{ backgroundColor: "#60479eff", flex: 1 }}>
        <Text style={styles.verifytext}>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor={"#ffffff"}
          onChangeText={(code) => setCode(code)}
          style={styles.verifyinput}
        />
        <Text style={{ color: "red", alignSelf: "center", fontWeight: 700 }}>
          {error}
        </Text>
        <TouchableOpacity onPress={onVerifyPress} style={styles.verifyButton}>
          <Text style={{ fontSize: 18, fontWeight: 700 }}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: "#60479eff", flex: 1 }}>
      <>
        <Text style={styles.signintext}>Sign up</Text>
        <Text style={{ color: "white", marginBottom: 30, marginLeft: 27 }}>
          Create a new account:
        </Text>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor={"#ffffff"}
          onChangeText={(email) => setEmailAddress(email)}
          style={styles.textInput}
        />
        <TextInput
          value={password}
          placeholder="Enter password"
          placeholderTextColor={"#ffffff"}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          style={styles.textInput}
        />
        <Text style={{ color: "red", alignSelf: "center", fontWeight: 700 }}>
          {error}
        </Text>
        <TouchableOpacity onPress={onSignUpPress} style={styles.button1}>
          <Text style={{ color: "#43326eff", fontWeight: 500 }}>Continue</Text>
        </TouchableOpacity>
        <Link href="/sign-in" asChild>
          <TouchableOpacity style={styles.button2}>
            <Text style={{ color: "white" }}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </Link>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  signintext: {
    //textAlign: "center",
    marginLeft: 27,
    marginTop: 200,
    marginBottom: 7,
    color: "white",
    fontSize: 38,
    fontWeight: "700",
  },
  verifytext: {
    marginLeft: 27,
    marginTop: 250,
    marginBottom: 30,
    color: "white",
    fontSize: 30,
    fontWeight: "700",
  },
  verifyinput: {
    borderWidth: 1.25,
    borderColor: "#f6e7ffff",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginHorizontal: 25,
  },
  verifyButton: {
    display: "flex",
    flexDirection: "row",
    gap: 3,
    marginTop: 25,
    backgroundColor: "#C7C3F4",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    color: "#fff",
    fontWeight: "700",
    alignSelf: "center",
    paddingHorizontal: 30,
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
