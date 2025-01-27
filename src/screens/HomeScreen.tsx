import React, { useMemo, useState } from "react"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useShuttle } from "@/hooks/useShuttle"
import { Card } from "@/components/Card"
import { Button } from "@/components/Button"
import { ConfirmDialog } from "@/components/ConfirmDialog"
import type { PickupRequest } from "@/types/requests"
import { formatDistanceToNow } from "date-fns"

interface AcceptedRequest {
  id: string
  location: string
  waitingTime: number
  status: "ongoing" | "completed"
  requesterName: string
  driver: {
    name: string
    initials: string
  }
  acceptedAt: Date
  stage: "accepted" | "picked_up" | "completed"
}

export default function HomeScreen() {
  const router = useRouter()
  const { newRequests, setNewRequests, completedRequests, setCompletedRequests } = useShuttle()

  const [acceptedRequests, setAcceptedRequests] = useState<AcceptedRequest[]>([
    {
      id: "4",
      location: "101 Pine St",
      waitingTime: 10,
      status: "ongoing",
      requesterName: "Alice Brown",
      driver: { name: "John Doe", initials: "JD" },
      acceptedAt: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
      stage: "accepted",
    },
    {
      id: "5",
      location: "202 Maple Ave",
      waitingTime: 15,
      status: "ongoing",
      requesterName: "Charlie Davis",
      driver: { name: "Jane Smith", initials: "JS" },
      acceptedAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      stage: "picked_up",
    },
  ])

  const [actionRequest, setActionRequest] = useState<AcceptedRequest | null>(null)
  const [acceptingRequest, setAcceptingRequest] = useState<PickupRequest | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [confirmDialogType, setConfirmDialogType] = useState<"accept" | "pickup" | "dropoff">("accept")

  const sortedAcceptedRequests = useMemo(() => {
    return [...acceptedRequests].sort((a, b) => a.acceptedAt.getTime() - b.acceptedAt.getTime())
  }, [acceptedRequests])

  const initiateAcceptRequest = (request: PickupRequest) => {
    setAcceptingRequest(request)
    setConfirmDialogType("accept")
    setShowConfirmDialog(true)
  }

  const acceptRequest = (request: PickupRequest) => {
    const newAcceptedRequest: AcceptedRequest = {
      ...request,
      status: "ongoing",
      driver: { name: "Current Driver", initials: "CD" },
      acceptedAt: new Date(),
      stage: "accepted",
    }
    setAcceptedRequests([newAcceptedRequest, ...acceptedRequests])
    setNewRequests(newRequests.filter((r) => r.id !== request.id))
  }

  const initiatePickUp = (request: AcceptedRequest) => {
    setActionRequest(request)
    setConfirmDialogType("pickup")
    setShowConfirmDialog(true)
  }

  const pickUpUser = (request: AcceptedRequest) => {
    const updatedRequests = acceptedRequests.map((r) =>
      r.id === request.id ? { ...r, stage: "picked_up" as const } : r,
    )
    setAcceptedRequests(updatedRequests)
  }

  const initiateDropOff = (request: AcceptedRequest) => {
    setActionRequest(request)
    setConfirmDialogType("dropoff")
    setShowConfirmDialog(true)
  }

  const completeDropOff = (request: AcceptedRequest) => {
    const completedRequest = {
      ...request,
      status: "completed" as const,
      stage: "completed" as const,
      completedAt: new Date(),
    }
    setCompletedRequests([completedRequest, ...completedRequests].slice(0, 20))
    setAcceptedRequests(acceptedRequests.filter((r) => r.id !== request.id))
  }

  const handleConfirm = () => {
    if (confirmDialogType === "accept" && acceptingRequest) {
      acceptRequest(acceptingRequest)
      setAcceptingRequest(null)
    } else if (confirmDialogType === "pickup" && actionRequest) {
      pickUpUser(actionRequest)
    } else if (confirmDialogType === "dropoff" && actionRequest) {
      completeDropOff(actionRequest)
    }
    setShowConfirmDialog(false)
    setActionRequest(null)
  }

  const handleCancel = () => {
    setAcceptingRequest(null)
    setActionRequest(null)
    setShowConfirmDialog(false)
  }

  const getNameDisplay = (fullName: string) => {
    const nameParts = fullName.split(" ")
    if (nameParts.length > 1) {
      return `${nameParts[0]} ${nameParts[nameParts.length - 1][0]}.`
    }
    return fullName
  }

  const getTimeSinceAccepted = (acceptedAt: Date) => {
    return formatDistanceToNow(acceptedAt, { addSuffix: true }).replace("minutes", "mins")
  }

  const openAllRequestsModal = () => {
    router.push("/allPickupRequests")
  }

  const renderEmptyState = (type: "requests" | "queue") => (
    <View style={styles.emptyState}>
      <Icon
        name={type === "requests" ? "clipboard-text-outline" : "clipboard-check-outline"}
        size={40}
        color="#22C55E"
      />
      <Text style={styles.emptyStateTitle}>{type === "requests" ? "No New Requests" : "No Active Pickups"}</Text>
    </View>
  )

  return (
    <>
      <ScrollView style={styles.container}>
        <Card style={[styles.newRequestsCard, newRequests.length === 0 && styles.emptyStateCard]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Next Pickup Request</Text>
            <TouchableOpacity onPress={openAllRequestsModal}>
              <Text style={styles.toggleText}>Show all</Text>
            </TouchableOpacity>
          </View>
          {newRequests.length > 0 ? (
            <Card style={styles.requestCard}>
              <View style={styles.requestInfo}>
                <Icon name="account" size={20} color="#666" />
                <Text style={styles.requestText}>{getNameDisplay(newRequests[0].requesterName)}</Text>
              </View>
              <View style={styles.requestInfo}>
                <Icon name="map-marker" size={20} color="#22c55e" />
                <Text style={styles.requestText}>{newRequests[0].location}</Text>
              </View>
              <View style={styles.requestInfo}>
                <Icon name="clock-outline" size={20} color="#3b82f6" />
                <Text style={styles.requestText}>Waiting: {newRequests[0].waitingTime} mins</Text>
              </View>
              <Button
                onPress={() => initiateAcceptRequest(newRequests[0])}
                title="Accept Request"
                style={styles.acceptButton}
              />
            </Card>
          ) : (
            renderEmptyState("requests")
          )}
        </Card>

        <Card style={[styles.pickupQueueCard, sortedAcceptedRequests.length === 0 && styles.emptyStateCard]}>
          <Text style={styles.cardTitle}>Pickup Queue</Text>
          <ScrollView style={styles.queueScrollView}>
            {sortedAcceptedRequests.length > 0
              ? sortedAcceptedRequests.map((request) => (
                  <Card
                    key={request.id}
                    style={[styles.requestCard, request.status === "ongoing" && styles.ongoingRequest]}
                  >
                    <View style={styles.requestHeader}>
                      <View style={styles.requestInfo}>
                        <Icon name="account" size={20} color="#666" />
                        <Text style={styles.requestText}>{getNameDisplay(request.requesterName)}</Text>
                      </View>
                      <View style={styles.driverInfo}>
                        <Icon name="bus" size={20} color="#3b82f6" style={styles.busIcon} />
                        <View style={styles.driverInitials}>
                          <Text style={styles.driverInitialsText}>{request.driver.initials}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.requestInfo}>
                      <Icon name="map-marker" size={20} color="#22c55e" />
                      <Text style={styles.requestText}>{request.location}</Text>
                    </View>
                    <View style={styles.requestInfo}>
                      <Icon name="clock-outline" size={20} color="#3b82f6" />
                      <Text style={styles.requestText}>
                        Waiting: {request.waitingTime} mins | Accepted:{" "}
                        {getTimeSinceAccepted(request.acceptedAt).replace("minute", "min")}
                      </Text>
                    </View>
                    {request.stage === "accepted" ? (
                      <Button
                        onPress={() => initiatePickUp(request)}
                        title="Pick Up User"
                        style={styles.pickupButton}
                      />
                    ) : request.stage === "picked_up" ? (
                      <Button
                        onPress={() => initiateDropOff(request)}
                        title="Complete Drop-off"
                        style={styles.dropoffButton}
                      />
                    ) : (
                      <View style={styles.completedInfo}>
                        <Icon name="check-circle" size={20} color="#22c55e" />
                        <Text style={styles.completedText}>Completed</Text>
                      </View>
                    )}
                  </Card>
                ))
              : renderEmptyState("queue")}
          </ScrollView>
        </Card>
      </ScrollView>
      <ConfirmDialog
        visible={showConfirmDialog}
        title={
          confirmDialogType === "accept"
            ? "Accept Request"
            : confirmDialogType === "pickup"
              ? "Pick Up User"
              : "Complete Drop-off"
        }
        message={
          confirmDialogType === "accept"
            ? "Are you sure you want to accept this pickup request?"
            : confirmDialogType === "pickup"
              ? "Confirm that you have picked up the user?"
              : "Confirm that you have completed the drop-off?"
        }
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmText={
          confirmDialogType === "accept" ? "Accept" : confirmDialogType === "pickup" ? "Confirm" : "Complete"
        }
        cancelText="Cancel"
        iconName={
          confirmDialogType === "accept" ? "check" : confirmDialogType === "pickup" ? "account-check" : "flag-checkered"
        }
        confirmColor={confirmDialogType === "accept" ? "#3b82f6" : "#22C55E"}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 32,
    backgroundColor: "#f3f4f6",
  },
  newRequestsCard: {
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
  },
  pickupQueueCard: {
    flex: 1,
  },
  emptyStateCard: {
    height: 160,
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
    fontSize: 14,
    color: "#4b5563",
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
    borderLeftColor: "#22C55E",
  },
  requestHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
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
  driverInitials: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
  },
  driverInitialsText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  acceptButton: {
    backgroundColor: "#3b82f6",
    marginTop: 8,
  },
  pickupButton: {
    backgroundColor: "#22C55E",
    marginTop: 8,
  },
  dropoffButton: {
    backgroundColor: "#EAB308",
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
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B5563",
    marginTop: 12,
    marginBottom: 6,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  busIcon: {
    marginRight: 8,
  },
})

