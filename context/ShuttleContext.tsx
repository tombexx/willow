import type React from "react"
import { createContext, useState, useContext } from "react"
import type { PickupRequest, AcceptedRequest } from "@/types/requests"

interface CompletedRequest extends AcceptedRequest {
  completedAt: Date
  driver: {
    name: string
    initials: string
  }
}

interface ShuttleContextType {
  newRequests: PickupRequest[]
  setNewRequests: React.Dispatch<React.SetStateAction<PickupRequest[]>>
  isNewRequestsExpanded: boolean
  setIsNewRequestsExpanded: React.Dispatch<React.SetStateAction<boolean>>
  completedRequests: CompletedRequest[]
  setCompletedRequests: React.Dispatch<React.SetStateAction<CompletedRequest[]>>
}

const ShuttleContext = createContext<ShuttleContextType | undefined>(undefined)

const initialNewRequests: PickupRequest[] = [
  {
    id: "1",
    location: "123 Main St",
    waitingTime: 5,
    requesterName: "John Doe",
  },
  {
    id: "2",
    location: "456 Elm St",
    waitingTime: 3,
    requesterName: "Jane Smith",
  },
  {
    id: "3",
    location: "789 Oak St",
    waitingTime: 7,
    requesterName: "Bob Johnson",
  },
]

const initialCompletedRequests: CompletedRequest[] = [
  {
    id: "c1",
    location: "101 Pine St",
    waitingTime: 10,
    status: "completed",
    requesterName: "Alice Brown",
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    driver: {
      name: "David Wilson",
      initials: "DW",
    },
  },
  {
    id: "c2",
    location: "202 Maple Ave",
    waitingTime: 15,
    status: "completed",
    requesterName: "Charlie Davis",
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    driver: {
      name: "Emma Thompson",
      initials: "ET",
    },
  },
]

export const ShuttleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [newRequests, setNewRequests] = useState<PickupRequest[]>(initialNewRequests)
  const [isNewRequestsExpanded, setIsNewRequestsExpanded] = useState(false)
  const [completedRequests, setCompletedRequests] = useState<CompletedRequest[]>(initialCompletedRequests)

  return (
    <ShuttleContext.Provider
      value={{
        newRequests,
        setNewRequests,
        isNewRequestsExpanded,
        setIsNewRequestsExpanded,
        completedRequests,
        setCompletedRequests,
      }}
    >
      {children}
    </ShuttleContext.Provider>
  )
}

export const useShuttle = () => {
  const context = useContext(ShuttleContext)
  if (context === undefined) {
    throw new Error("useShuttle must be used within a ShuttleProvider")
  }
  return context
}

