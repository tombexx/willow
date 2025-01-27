import React from "react"
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native"
import { BarChart } from "react-native-chart-kit"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { Card } from "@/components/ui/Card"
import { TopNav } from "@/components/TopNav"

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

export default function DashboardPage() {
  const averageRating = (data.reduce((sum, shuttle) => sum + shuttle.rating, 0) / data.length).toFixed(1)

  return (
    <View style={styles.container}>
      <TopNav />
      <ScrollView style={styles.content}>
        {/*Removed Text style={styles.title}>Shuttle Performance Dashboard</Text> */}
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statTitle}>Total Pickups</Text>
              <Icon name="truck" size={20} color="#6b7280" />
            </View>
            <Text style={styles.statValue}>82</Text>
            <Text style={styles.statChange}>+12% from last week</Text>
          </Card>
          <Card style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statTitle}>Average Wait Time</Text>
              <Icon name="clock-outline" size={20} color="#6b7280" />
            </View>
            <Text style={styles.statValue}>8.5 min</Text>
            <Text style={styles.statChange}>-2 min from last week</Text>
          </Card>
          <Card style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statTitle}>Total Passengers</Text>
              <Icon name="account-group" size={20} color="#6b7280" />
            </View>
            <Text style={styles.statValue}>145</Text>
            <Text style={styles.statChange}>+18% from last week</Text>
          </Card>
          <Card style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statTitle}>Average Rating</Text>
              <Icon name="star" size={20} color="#6b7280" />
            </View>
            <Text style={styles.statValue}>{averageRating}</Text>
            <Text style={styles.statChange}>Out of 5 stars</Text>
          </Card>
        </View>
        <Card style={styles.chartCard}>
          <Text style={styles.chartTitle}>Shuttle Performance</Text>
          <Text style={styles.chartSubtitle}>Pickups and ratings by shuttle this week</Text>
          <BarChart
            data={{
              labels: data.map((item) => item.shuttle),
              datasets: [
                {
                  data: data.map((item) => item.pickups),
                },
              ],
            }}
            width={Dimensions.get("window").width - 32}
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(173, 250, 29, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForLabels: {
                fontSize: 12,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </Card>
      </ScrollView>
    </View>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statCard: {
    width: "48%",
    marginBottom: 16,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4b5563",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
  },
  statChange: {
    fontSize: 12,
    color: "#6b7280",
  },
  chartCard: {
    padding: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 16,
  },
})

