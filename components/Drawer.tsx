import React, { useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Linking } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useDrawer } from "@/context/DrawerContext"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"

const { width } = Dimensions.get("window")
const APP_VERSION = "1.0.0"

const Drawer: React.FC = () => {
  const router = useRouter()
  const { isDrawerOpen, toggleDrawer } = useDrawer()
  const translateX = React.useRef(new Animated.Value(width)).current

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isDrawerOpen ? 0 : width,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [isDrawerOpen, translateX])

  const navigateTo = (route: string) => {
    router.push(route)
    toggleDrawer()
  }

  const openLink = (url: string) => {
    Linking.openURL(url)
  }

  // Placeholder functions and values (replace with actual implementations)
  const driverName = "John Doe"
  const driverInitials = "JD"
  const currentLocation = "Main Campus"
  const logout = () => {
    // Implement logout functionality
    console.log("Logout")
  }

  return (
    <>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            opacity: translateX.interpolate({
              inputRange: [0, width],
              outputRange: [1, 0],
            }),
          },
        ]}
        pointerEvents={isDrawerOpen ? "auto" : "none"}
        onTouchStart={toggleDrawer}
      />
      <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
        <LinearGradient colors={["#4ADE80", "#22C55E", "#16A34A"]} style={styles.gradient}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
              <Text style={styles.menuHeading}>Menu</Text>
              <TouchableOpacity style={styles.closeButton} onPress={toggleDrawer}>
                <Icon name="close" size={18} color="#22C55E" />
              </TouchableOpacity>
            </View>
            <View style={styles.content}>
              <View style={styles.driverInfo}>
                <BlurView intensity={80} tint="light" style={styles.avatarBlurView}>
                  <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>{driverInitials}</Text>
                  </View>
                </BlurView>
                <View style={styles.driverTextContainer}>
                  <Text style={styles.driverName}>{driverName}</Text>
                  <Text style={styles.driverRole}>Shuttle Driver</Text>
                </View>
              </View>
              <View style={styles.separator} />
              <View style={styles.locationContainer}>
                <View style={styles.locationInfo}>
                  <Icon name="map-marker" size={24} color="#ffffff" />
                  <Text style={styles.locationText}>{currentLocation}</Text>
                </View>
                <TouchableOpacity onPress={() => console.log("Change location")}>
                  <BlurView intensity={80} tint="light" style={styles.changeLocationButton}>
                    <Text style={styles.changeLocationText}>Change</Text>
                  </BlurView>
                </TouchableOpacity>
              </View>
              <View style={styles.separator} />
              <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo("/")}>
                  <Icon name="bus-stop" size={24} color="#ffffff" />
                  <Text style={styles.menuItemText}>Pickups</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo("/dashboard")}>
                  <Icon name="view-dashboard" size={24} color="#ffffff" />
                  <Text style={styles.menuItemText}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo("/history")}>
                  <Icon name="history" size={24} color="#ffffff" />
                  <Text style={styles.menuItemText}>History</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={logout}>
                  <Icon name="logout" size={24} color="#ffffff" />
                  <Text style={styles.menuItemText}>Log Out</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.footer}>
              <View style={styles.footerLinks}>
                <TouchableOpacity onPress={() => openLink("https://www.example.com")}>
                  <Text style={styles.footerLink}>ShuttleSync.com</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openLink("https://www.example.com/terms")}>
                  <Text style={styles.footerLink}>Terms & Conditions</Text>
                </TouchableOpacity>
                <Text style={styles.versionText}>Version {APP_VERSION}</Text>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  drawer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: "80%",
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 16,
    paddingLeft: 16,
    height: 60,
    paddingTop: 12,
  },
  closeButton: {
    zIndex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarBlurView: {
    borderRadius: 28,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  avatarText: {
    color: "#22C55E",
    fontSize: 20,
    fontWeight: "bold",
  },
  driverTextContainer: {
    marginLeft: 16,
  },
  driverName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  driverRole: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginVertical: 20,
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  changeLocationButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: "#ffffff",
  },
  changeLocationText: {
    color: "#22C55E",
    fontSize: 12,
    fontWeight: "600",
  },
  menuContainer: {
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  menuItemText: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  footer: {
    paddingBottom: 20,
  },
  footerLinks: {
    padding: 16,
    paddingHorizontal: 24,
    alignItems: "flex-start",
  },
  footerLink: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 6,
    textDecorationLine: "underline",
  },
  versionText: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 4,
  },
  menuHeading: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
  },
})

export default Drawer

