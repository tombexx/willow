import React from "react"
import { Stack } from "expo-router"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ShuttleProvider } from "@/context/ShuttleContext"
import Drawer from "@/components/Drawer"
import { DrawerProvider } from "@/context/DrawerContext"
import { HeaderMenuButton } from "@/components/HeaderMenuButton"

function StackNavigator() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f3f4f6",
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerRight: () => <HeaderMenuButton />,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Pickups" }} />
      <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Stack.Screen name="history" options={{ title: "History" }} />
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <DrawerProvider>
      <SafeAreaProvider>
        <ShuttleProvider>
          <StackNavigator />
          <Drawer />
        </ShuttleProvider>
      </SafeAreaProvider>
    </DrawerProvider>
  )
}

