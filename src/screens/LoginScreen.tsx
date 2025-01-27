import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useShuttle } from "@/hooks/useShuttle"

const APP_VERSION = "1.0.0"

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useShuttle()

  const handlePhoneNumberChange = (text: string) => {
    // Only allow numbers
    const numbersOnly = text.replace(/[^0-9]/g, "")
    // Limit to 10 digits
    const truncated = numbersOnly.slice(0, 10)
    setPhoneNumber(truncated)
  }

  const handleLogin = () => {
    if (phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit phone number")
      return
    }
    if (!password.trim()) {
      setError("Please enter your password")
      return
    }
    login(phoneNumber, password)
  }

  const openLink = (url: string) => {
    Linking.openURL(url)
  }

  const handleForgotPassword = () => {
    // Implement forgot password functionality
    console.log("Forgot password")
  }

  return (
    <LinearGradient colors={["#4ADE80", "#22C55E", "#16A34A"]} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.logoContainer}>
            <View style={styles.logoPlaceholder}>
              <Image
                source={{
                  uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Transparent-Wdd73BZCQU11Tq9Yj9luu8q0oWypob.png",
                }}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.phoneInputWrapper}>
                <Text style={styles.phonePrefix}>+1</Text>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Phone Number (10 digits)"
                  placeholderTextColor="#666"
                  value={phoneNumber}
                  onChangeText={handlePhoneNumberChange}
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Need to reset or change your password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => openLink("https://www.oobeo.com")}>
              <Text style={styles.footerLink}>Oobeo.com</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink("https://www.oobeo.com/terms")}>
              <Text style={styles.footerLink}>Terms & Conditions</Text>
            </TouchableOpacity>
            <Text style={styles.versionText}>Version {APP_VERSION}</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 160,
    marginBottom: 60,
  },
  logoPlaceholder: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 300,
    height: 90,
  },
  formContainer: {
    paddingHorizontal: 30,
  },
  inputContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 8,
    marginBottom: 15,
    height: 50,
  },
  phoneInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  phonePrefix: {
    fontSize: 16,
    color: "#000000",
    paddingLeft: 15,
    paddingRight: 8,
  },
  phoneInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#000000",
    paddingRight: 15,
  },
  input: {
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#000000",
  },
  loginButton: {
    backgroundColor: "#000000",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPasswordButton: {
    alignItems: "center",
    marginTop: 15,
  },
  forgotPasswordText: {
    color: "#ffffff",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  errorText: {
    color: "#FF3B30",
    marginBottom: 10,
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 8,
    borderRadius: 4,
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
    paddingBottom: 20,
  },
  footerLink: {
    fontSize: 14,
    color: "#ffffff",
    marginBottom: 8,
    textDecorationLine: "underline",
  },
  versionText: {
    fontSize: 12,
    color: "#ffffff",
    marginTop: 8,
  },
})

