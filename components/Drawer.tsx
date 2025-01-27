import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { useDrawer } from "@/context/DrawerContext"

type DrawerProps = {
  isOpen: boolean
  onClose: () => void
}

const Drawer: React.FC = () => {
  const router = useRouter()
  const { isDrawerOpen, toggleDrawer } = useDrawer()

  const navigateTo = (route: string) => {
    router.push(route)
    toggleDrawer()
  }

  if (!isDrawerOpen) return null

  return (
    <View style={styles.container}>
      <View style={styles.drawer}>
        <TouchableOpacity style={styles.closeButton} onPress={toggleDrawer}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo("/")}>
          <Text style={styles.menuItemText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo("/pickups")}>
          <Text style={styles.menuItemText}>Pickups</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo("/profile")}>
          <Text style={styles.menuItemText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo("/dashboard")}>
          <Text style={styles.menuItemText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo("/history")}>
          <Text style={styles.menuItemText}>History</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  drawer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: "70%",
    backgroundColor: "white",
    padding: 20,
    paddingTop: 40,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  menuItemText: {
    fontSize: 18,
  },
})

export default Drawer

