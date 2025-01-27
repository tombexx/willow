import React, { useState } from "react"
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useShuttle } from "@/hooks/useShuttle"
import { Card } from "@/components/Card"
import { format, formatDistanceToNow } from "date-fns"

interface CompletedRequest {
  id: string
  requesterName: string
  location: string
  waitingTime: number
  acceptedAt: Date
  completedAt: Date
  driver: {
    name: string
    initials: string
  }
}

export const HistoryScreen = () => {
  const { completedRequests } = useShuttle()
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const formatDate = (date: Date) => {
    return format(date, "MMM d, yyyy h:mm a")
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

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const renderCompletedRequest = (request: CompletedRequest) => {
    const isExpanded = expandedId === request.id

    return (
      <Card key={request.id} style={styles.requestCard}>
        <TouchableOpacity onPress={() => toggleExpand(request.id)}>
          <View style={styles.requestHeader}>
            <View style={styles.requesterInfo}>
              <Icon name="account" size={20} color="#6b7280" />
              <Text style={styles.requesterName}>{getFirstName(request.requesterName)}</Text>
            </View>
            <View style={styles.expandIcon}>
              <Icon name={isExpanded ? "chevron-up" : "chevron-down"} size={20} color="#6b7280" />
            </View>
          </View>
          <View style={styles.requestInfo}>
            <Icon name="check-circle" size={20} color="#22c55e" />
            <Text style={styles.infoText}>
              Completed: {formatDistanceToNow(request.completedAt, { addSuffix: true })}
            </Text>
          </View>
          <View style={styles.requestInfo}>
            <Icon name="map-marker" size={20} color="#22c55e" />
            <Text style={styles.infoText}>{request.location}</Text>
          </View>
          {isExpanded && (
            <>
              <View style={styles.requestInfo}>
                <Icon name="clock-outline" size={20} color="#3b82f6" />
                <Text style={styles.infoText}>Waited: {request.waitingTime} mins</Text>
              </View>
              <View style={styles.requestInfo}>
                <Icon name="calendar-clock" size={20} color="#3b82f6" />
                <Text style={styles.infoText}>
                  Accepted: {formatDistanceToNow(request.acceptedAt, { addSuffix: true })}
                </Text>
              </View>
              <View style={styles.requestFooter}>
                <View style={styles.driverInfo}>
                  <Text style={styles.driverLabel}>Driver:</Text>
                  <View style={styles.driverAvatarAndName}>
                    <View style={styles.driverAvatar}>
                      <Text style={styles.driverInitials}>{request.driver.initials}</Text>
                    </View>
                    <Text style={styles.driverName}>{request.driver.name}</Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </TouchableOpacity>
      </Card>
    )
  }

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="clipboard-check-outline" size={40} color="#22C55E" />
      <Text style={styles.emptyStateTitle}>No Completed Pickups</Text>
      <Text style={styles.emptyStateDescription}>There are no completed pickup requests to display.</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <Card style={styles.searchCard}>
        <View style={styles.searchInputContainer}>
          <Icon name="magnify" size={20} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, location, or driver..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </Card>
      <Card style={styles.historyCard}>
        <Text style={styles.cardTitle}>Completed Pickups</Text>
        <ScrollView style={styles.scrollView}>
          {filteredRequests.length > 0 ? filteredRequests.map(renderCompletedRequest) : renderEmptyState()}
        </ScrollView>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 16,
    paddingTop: 32,
  },
  searchCard: {
    marginBottom: 16,
    padding: 12,
  },
  historyCard: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  scrollView: {
    flex: 1,
  },
  requestCard: {
    marginBottom: 12,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#22c55e",
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
  expandIcon: {
    padding: 4,
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
    flex: 1,
  },
  requestFooter: {
    marginTop: 12,
  },
  completedAt: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  driverLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginRight: 8,
  },
  driverAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
  driverAvatarAndName: {
    flexDirection: "row",
    alignItems: "center",
  },
  driverInitials: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
  driverName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginLeft: 4,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#1f2937",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
})

