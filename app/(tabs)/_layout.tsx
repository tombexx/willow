import React from "react"
import { View, TouchableOpacity, StyleSheet, Text } from "react-native"
import { Tabs, useRouter, usePathname } from "expo-router"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

export default function TabLayout() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const pathname = usePathname()

  const HeaderRight = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity style={styles.tabItem} onPress={() => router.push("/")}>
        <Icon name="home" size={24} color={pathname === "/" ? "#3b82f6" : "#6b7280"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => router.push("/dashboard")}>
        <Icon name="view-dashboard" size={24} color={pathname === "/dashboard" ? "#3b82f6" : "#6b7280"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => router.push("/history")}>
        <Icon name="history" size={24} color={pathname === "/history" ? "#3b82f6" : "#6b7280"} />
      </TouchableOpacity>
    </View>
  )

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: { display: "none" },
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "bold",
          color: "#1f2937",
        },
        headerRight: () => <HeaderRight />,
        headerShadowVisible: true,
        headerLeftContainerStyle: {
          paddingLeft: 16,
        },
        headerRightContainerStyle: {
          paddingRight: 16,
        },
        headerStatusBarHeight: insets.top,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Shuttle+",
          headerTitle: "Shuttle+",
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          headerTitle: "Dashboard",
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          headerTitle: "History",
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabItem: {
    marginLeft: 20,
    padding: 8,
    borderRadius: 6,
  },
})

