import React from "react"
import { View, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { HomeScreen } from "@/screens/HomeScreen"

export default function TabHomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <HomeScreen />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
})

