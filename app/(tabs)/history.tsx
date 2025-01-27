import React from "react"
import { View, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { HistoryScreen } from "@/screens/HistoryScreen"

export default function TabHistoryScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <HistoryScreen />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
})

