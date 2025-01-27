import React from "react"
import { View, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { DashboardScreen } from "@/screens/DashboardScreen"

export default function TabDashboardScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <DashboardScreen />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
})

