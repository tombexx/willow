import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useShuttle } from "@/context/ShuttleContext"

export function TopNav() {
  const navigation = useNavigation()
  const route = useRoute()
  const { newRequests, setIsNewRequestsExpanded } = useShuttle()

  const handleBellClick = () => {
    setIsNewRequestsExpanded(true)
  }

  const isActive = (routeName: string) => route.name === routeName

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shuttle+</Text>
      <View style={styles.navItems}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={[styles.navItem, isActive("Home") && styles.activeNavItem]}
        >
          <Icon name="home" size={24} color={isActive("Home") ? "#3b82f6" : "#4b5563"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Dashboard")}
          style={[styles.navItem, isActive("Dashboard") && styles.activeNavItem]}
        >
          <Icon name="view-dashboard" size={24} color={isActive("Dashboard") ? "#3b82f6" : "#4b5563"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("History")}
          style={[styles.navItem, isActive("History") && styles.activeNavItem]}
        >
          <Icon name="history" size={24} color={isActive("History") ? "#3b82f6" : "#4b5563"} />
        </TouchableOpacity>
        {newRequests.length > 0 && (
          <TouchableOpacity onPress={handleBellClick} style={styles.navItem}>
            <Icon name="bell" size={24} color="#4b5563" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{newRequests.length}</Text>
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.navItem}>
          <Icon name="account-circle" size={24} color="#4b5563" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
  },
  navItems: {
    flexDirection: "row",
  },
  navItem: {
    marginLeft: 16,
    padding: 4,
  },
  activeNavItem: {
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FF6B00",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
})

