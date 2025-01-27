export interface PickupRequest {
  id: string
  location: string
  waitingTime: number
  requesterName: string
}

export interface AcceptedRequest extends PickupRequest {
  status: "ongoing" | "completed"
}

