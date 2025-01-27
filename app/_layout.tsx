import React from "react"
import { Stack } from "expo-router"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ShuttleProvider } from "@/context/ShuttleContext"

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ShuttleProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ShuttleProvider>
    </SafeAreaProvider>
  )
}

