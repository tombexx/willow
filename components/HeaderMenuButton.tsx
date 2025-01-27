import React from "react"
import { TouchableOpacity, Text } from "react-native"
import { useDrawer } from "@/context/DrawerContext"

export function HeaderMenuButton() {
  const { toggleDrawer } = useDrawer()

  return (
    <TouchableOpacity onPress={toggleDrawer} style={{ marginRight: 15 }}>
      <Text style={{ fontSize: 24 }}>☰</Text>
    </TouchableOpacity>
  )
}

