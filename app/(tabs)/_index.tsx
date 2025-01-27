import React, { useMemo, useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useShuttle } from "@/context/ShuttleContext"
import { Card } from "@/components/Card"
import { Button } from "@/components/Button"
import type { PickupRequest, AcceptedRequest } from "@/types/requests"

export default function HomeScreen() {
  const {
    newRequests,
    setNewRequests,
    isNewRequestsExpanded,
    setIsNewRequestsExpanded,
    completedRequests,
    setCompletedRequests,
  } = useShuttle()

  const [acceptedRequests, setAcceptedRequests] = useState<AcceptedRequest[]>([
    { id: "4", location: "101 Pine St", waitingTime: 10, status: "ongoing", requesterName: "Alice Brown" },
    { id: "5", location: "202 Maple Ave", waitingTime: 15, status: "ongoing", requesterName: "Charlie Davis" },
  ])

  const [completingPickupId, setCompletingPickupId] = useState<string | null>(null)

  const sortedAcceptedRequests = useMemo(() => {
    return [...acceptedRequests].sort((a, b) => b.waitingTime - a.waitingTime)
  }, [acceptedRequests])

  const acceptRequest = (request: PickupRequest) => {
    const newAcceptedRequest: AcceptedRequest = { ...request, status: "ongoing" }
    setAcceptedRequests([newAcceptedRequest, ...acceptedRequests])
    setNewRequests(newRequests.filter((r) => r.id !== request.id))
    setIsNewRequestsExpanded(false)
  }

  const initiateCompletePickup = (id: string) => {
    setCompletingPickupId(id)
    Alert.alert("Complete Pickup?", "Are you sure you want to mark this pickup as completed?", [
      { text: "No", style: "cancel", onPress: () => setCompletingPickupId(null) },
      { text: "Yes", onPress: confirmCompletePickup },
    ])
  }

  const confirmCompletePickup = () => {
    if (completingPickupId) {
      const completedRequest = acceptedRequests.find((request) => request.id === completingPickupId)
      if (completedRequest) {
        const updatedCompletedRequest = {
          ...completedRequest,
          status: "completed" as const,
          completedAt: new Date(),
        }
        setCompletedRequests([updatedCompletedRequest, ...completedRequests].slice(0, 20))
        setAcceptedRequests(acceptedRequests.filter((request) => request.id !== completingPickupId))
      }
      setCompletingPickupId(null)
    }
  }

  const getFirstName = (fullName: string) => {
    return fullName.split(" ")[0]
  }

  const toggleNewRequestsExpanded = () => {
    setIsNewRequestsExpanded(!isNewRequestsExpanded)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {newRequests.length > 0 && (
          <Card style={styles.newRequestsCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>New Pickup Requests</Text>
              <TouchableOpacity onPress={toggleNewRequestsExpanded}>
                <Text style={styles.toggleText}>{isNewRequestsExpanded ? "Hide" : "Show all"}</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.requestsScrollView}>
              {(isNewRequestsExpanded ? newRequests : [newRequests[0]]).map((request) => (
                <Card key={request.id} style={styles.requestCard}>
                  <View style={styles.requestInfo}>
                    <Icon name="account" size={20} color="#666" />
                    <Text style={styles.requestText}>{getFirstName(request.requesterName)}</Text>
                  </View>
                  <View style={styles.requestInfo}>
                    <Icon name="map-marker" size={20} color="#22c55e" />
                    <Text style={styles.requestText}>{request.location}</Text>
                  </View>
                  <View style={styles.requestInfo}>
                    <Icon name="clock-outline" size={20} color="#3b82f6" />
                    <Text style={styles.requestText}>Waiting: {request.waitingTime} mins</Text>
                  </View>
                  <Button onPress={() => acceptRequest(request)} title="Accept Request" style={styles.acceptButton} />
                </Card>
              ))}
            </ScrollView>
          </Card>
        )}

        <Card style={styles.pickupQueueCard}>
          <Text style={styles.cardTitle}>Pickup Queue</Text>
          <ScrollView style={styles.queueScrollView}>
            {sortedAcceptedRequests.map((request) => (
              <Card
                key={request.id}
                style={[styles.requestCard, request.status === "ongoing" && styles.ongoingRequest]}
              >
                <View style={styles.requestInfo}>
                  <Icon name="account" size={20} color="#666" />
                  <Text style={styles.requestText}>{getFirstName(request.requesterName)}</Text>
                </View>
                <View style={styles.requestInfo}>
                  <Icon name="map-marker" size={20} color="#22c55e" />
                  <Text style={styles.requestText}>{request.location}</Text>
                </View>
                <View style={styles.requestInfo}>
                  <Icon name="clock-outline" size={20} color="#3b82f6" />
                  <Text style={styles.requestText}>Waiting: {request.waitingTime} mins</Text>
                </View>
                {request.status === "ongoing" ? (
                  <Button
                    onPress={() => initiateCompletePickup(request.id)}
                    title="Complete Pickup"
                    style={styles.completeButton}
                  />
                ) : (
                  <View style={styles.completedInfo}>
                    <Icon name="check-circle" size={20} color="#22c55e" />
                    <Text style={styles.completedText}>Completed</Text>
                  </View>
                )}
              </Card>
            ))}
          </ScrollView>
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  newRequestsCard: {
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#FF6B00",
  },
  pickupQueueCard: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  toggleText: {
    color: "#3b82f6",
    fontWeight: "600",
  },
  requestsScrollView: {
    maxHeight: 300,
  },
  queueScrollView: {
    flex: 1,
  },
  requestCard: {
    marginBottom: 12,
    padding: 12,
  },
  ongoingRequest: {
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
  },
  requestInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  requestText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#4b5563",
  },
  acceptButton: {
    backgroundColor: "#FF6B00",
    marginTop: 8,
  },
  completeButton: {
    backgroundColor: "#3b82f6",
    marginTop: 8,
  },
  completedInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  completedText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#22c55e",
    fontWeight: "600",
  },
})

