import React, { useState } from "react"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { Card } from "@/components/ui/Card"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const timeRanges = [
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
  { id: "year", label: "This Year" },
]

const data = [
  {
    shuttle: "Shuttle A",
    pickups: 24,
    rating: 4.7,
  },
  {
    shuttle: "Shuttle B",
    pickups: 13,
    rating: 4.2,
  },
  {
    shuttle: "Shuttle C",
    pickups: 18,
    rating: 4.5,
  },
  {
    shuttle: "Shuttle D",
    pickups: 27,
    rating: 4.8,
  },
]

export const DashboardScreen = () => {
  const [selectedRange, setSelectedRange] = useState("week")
  const averageRating = (data.reduce((sum, shuttle) => sum + shuttle.rating, 0) / data.length).toFixed(1)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.rangeSelector}>
          {timeRanges.map((range) => (
            <TouchableOpacity
              key={range.id}
              style={[styles.rangeButton, selectedRange === range.id && styles.rangeButtonActive]}
              onPress={() => setSelectedRange(range.id)}
            >
              <Text style={[styles.rangeButtonText, selectedRange === range.id && styles.rangeButtonTextActive]}>
                {range.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.metricsGrid}>
          <Card style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricTitle}>Total Pickups</Text>
              <View style={[styles.iconContainer, styles.blueIcon]}>
                <Icon name="truck" size={20} color="#ffffff" />
              </View>
            </View>
            <Text style={styles.metricValue}>82</Text>
          </Card>

          <Card style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricTitle}>Average Rating</Text>
              <View style={[styles.iconContainer, styles.greenIcon]}>
                <Icon name="star" size={20} color="#ffffff" />
              </View>
            </View>
            <Text style={styles.metricValue}>{averageRating}</Text>
            <Text style={styles.metricSubtext}>Out of 5 stars</Text>
          </Card>

          <Card style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricTitle}>Average Trip Time</Text>
              <View style={[styles.iconContainer, styles.orangeIcon]}>
                <Icon name="timer-outline" size={20} color="#ffffff" />
              </View>
            </View>
            <Text style={styles.metricValue}>12.3 min</Text>
          </Card>

          <Card style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricTitle}>Average Wait Time</Text>
              <View style={[styles.iconContainer, styles.redIcon]}>
                <Icon name="clock-outline" size={20} color="#ffffff" />
              </View>
            </View>
            <Text style={styles.metricValue}>8.5 min</Text>
          </Card>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  content: {
    padding: 16,
  },
  rangeSelector: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  rangeButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  rangeButtonActive: {
    backgroundColor: "#22c55e",
  },
  rangeButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
  },
  rangeButtonTextActive: {
    color: "#ffffff",
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 16,
  },
  metricCard: {
    width: "47%",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  metricTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    flexShrink: 1,
    maxWidth: "80%",
    marginRight: 8,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  blueIcon: {
    backgroundColor: "#3b82f6",
  },
  redIcon: {
    backgroundColor: "#ef4444",
  },
  orangeIcon: {
    backgroundColor: "#eab308", // Changed to a yellow color
  },
  greenIcon: {
    backgroundColor: "#22c55e",
  },
  metricValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  metricSubtext: {
    fontSize: 14,
    color: "#6b7280",
  },
})

