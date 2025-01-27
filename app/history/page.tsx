import React, { useState } from "react"
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useShuttle } from "@/context/ShuttleContext"
import { Card } from "@/components/ui/Card"
import { TopNav } from "@/components/TopNav"

export default function HistoryPage() {
  const { completedRequests } = useShuttle()
  const [searchQuery, setSearchQuery] = useState("")

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getFirstName = (fullName: string) => {
    return fullName.split(" ")[0]
  }

  const filteredRequests = completedRequests.filter(
    (request) =>
      request.requesterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.driver.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <View style={styles.container}>
      <TopNav />
      <View style={styles.content}>
        {/* <Text style={styles.title}>Request History</Text> */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, location, or driver..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <ScrollView>
          {filteredRequests.slice(0, 20).map((request) => (
            <Card key={request.id} style={styles.requestCard}>
              <View style={styles.requestHeader}>
                <View style={styles.requesterInfo}>
                  <Icon name="account" size={20} color="#6b7280" />
                  <Text style={styles.requesterName}>{getFirstName(request.requesterName)}</Text>
                </View>
                <View style={styles.completedStatus}>
                  <Icon name="check-circle" size={20} color="#22c55e" />
                  <Text style={styles.completedText}>Completed</Text>
                </View>
              </View>
              <View style={styles.requestInfo}>
                <Icon name="map-marker" size={20} color="#22c55e" />
                <Text style={styles.infoText}>{request.location}</Text>
              </View>
              <View style={styles.requestInfo}>
                <Icon name="clock-outline" size={20} color="#3b82f6" />
                <Text style={styles.infoText}>Waited: {request.waitingTime} mins</Text>
              </View>
              <View style={styles.requestFooter}>
                <Text style={styles.completedAt}>Completed at: {formatDate(request.completedAt)}</Text>
                <View style={styles.driverInfo}>
                  <Text style={styles.driverLabel}>Driver:</Text>
                  <View style={styles.driverAvatar}>
                    <Text style={styles.driverInitials}>{request.driver.initials}</Text>
                  </View>
                  <Text style={styles.driverName}>{request.driver.name}</Text>
                </View>
              </View>
            </Card>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  content: {
    flex: 1,
    padding: 16,
    paddingTop: 32, // Add this line
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  requestCard: {
    marginBottom: 16,
  },
  requestHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  requesterInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  requesterName: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  completedStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  completedText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#22c55e",
    fontWeight: "600",
  },
  requestInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#4b5563",
  },
  requestFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  completedAt: {
    fontSize: 12,
    color: "#6b7280",
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  driverLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginRight: 4,
  },
  driverAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
  driverInitials: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4b5563",
  },
  driverName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1f2937",
  },
})

