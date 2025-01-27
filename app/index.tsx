import React, { useMemo, useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/Card"
import { AlertDialog } from "@/components/ui/alert-dialog"
import type { PickupRequest, AcceptedRequest } from "@/types/requests"
import { useShuttle } from "@/context/ShuttleContext"

export default function PickupsScreen() {
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

  const cancelCompletePickup = () => {
    setCompletingPickupId(null)
  }

  const getFirstName = (fullName: string) => {
    return fullName.split(" ")[0]
  }

  const toggleNewRequestsExpanded = () => {
    setIsNewRequestsExpanded(!isNewRequestsExpanded)
  }

  return (
    <View style={styles.container}>
      {newRequests.length > 0 && (
        <>
          <TouchableOpacity
            style={[
              styles.overlay,
              {
                opacity: isNewRequestsExpanded ? 0.5 : 0,
                zIndex: isNewRequestsExpanded ? 40 : -1,
              },
            ]}
            onPress={() => setIsNewRequestsExpanded(false)}
          />
          <Card style={[styles.newPickupsCard, isNewRequestsExpanded && styles.expandedCard]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>New Pickup Requests</Text>
              <TouchableOpacity onPress={toggleNewRequestsExpanded}>
                <Text style={styles.toggleText}>{isNewRequestsExpanded ? "Hide" : "Show all"}</Text>
                <Icon name={isNewRequestsExpanded ? "chevron-up" : "chevron-down"} size={20} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={[styles.scrollView, isNewRequestsExpanded && styles.expandedScrollView]}>
              {(isNewRequestsExpanded ? newRequests : [newRequests[0]]).map((request) => (
                <Card key={request.id} style={styles.requestCard}>
                  <View style={styles.requestInfo}>
                    <Icon name="account" size={20} color="#6b7280" />
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
                  <Button onPress={() => acceptRequest(request)} style={styles.acceptButton}>
                    Accept Pickup
                  </Button>
                </Card>
              ))}
            </ScrollView>
          </Card>
        </>
      )}

      <Card style={styles.pickupQueueCard}>
        <Text style={styles.cardTitle}>Pickup Queue</Text>
        <ScrollView style={styles.scrollView}>
          {sortedAcceptedRequests.map((request) => (
            <Card key={request.id} style={[styles.requestCard, request.status === "ongoing" && styles.ongoingRequest]}>
              <View style={styles.requestInfo}>
                <Icon name="account" size={20} color="#6b7280" />
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
                <Button onPress={() => initiateCompletePickup(request.id)} style={styles.completeButton}>
                  Complete Pickup
                </Button>
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

      <AlertDialog
        isOpen={!!completingPickupId}
        onClose={cancelCompletePickup}
        title="Complete Pickup?"
        description="Are you sure you want to mark this pickup as completed?"
        confirmLabel="Yes"
        cancelLabel="No"
        onConfirm={confirmCompletePickup}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f3f4f6",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
  },
  newPickupsCard: {
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#FF6B00",
  },
  expandedCard: {
    position: "absolute",
    top: 80,
    left: 16,
    right: 16,
    bottom: 16,
    zIndex: 50,
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
  },
  toggleText: {
    color: "#3b82f6",
    fontWeight: "600",
  },
  scrollView: {
    maxHeight: 300,
  },
  expandedScrollView: {
    maxHeight: undefined,
  },
  pickupQueueCard: {
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

