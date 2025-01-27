import type React from "react"
import { createContext, useContext, useState } from "react"

type DrawerContextType = {
  isDrawerOpen: boolean
  toggleDrawer: () => void
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined)

export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev)
  }

  return <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawer }}>{children}</DrawerContext.Provider>
}

export const useDrawer = () => {
  const context = useContext(DrawerContext)
  if (context === undefined) {
    throw new Error("useDrawer must be used within a DrawerProvider")
  }
  return context
}

