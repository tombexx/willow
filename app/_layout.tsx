import React from "react"
import { Stack } from "expo-router"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ShuttleProvider } from "@/context/ShuttleContext"
import { TouchableOpacity, Text } from "react-native"
import Drawer from "@/components/Drawer"
import { DrawerProvider, useDrawer } from "@/context/DrawerContext"

function StackNavigator() {
  const { toggleDrawer } = useDrawer()

  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={toggleDrawer} style={{ marginRight: 15 }}>
            <Text style={{ fontSize: 24 }}>☰</Text>
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: "#f3f4f6",
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="pickups" options={{ title: "Pickups" }} />
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
      <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Stack.Screen name="history" options={{ title: "History" }} />
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

