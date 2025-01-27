import * as React from "react"
import { Pressable, Text, StyleSheet, type PressableProps } from "react-native"

interface ButtonProps extends PressableProps {
  children: React.ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ children, variant = "default", style, ...props }, ref) => {
    return (
      <Pressable
        ref={ref}
        style={({ pressed }) => [styles.button, styles[variant], pressed && styles.pressed, style]}
        {...props}
      >
        <Text style={[styles.text, styles[`${variant}Text`]]}>{children}</Text>
      </Pressable>
    )
  },
)

Button.displayName = "Button"

export { Button }

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  default: {
    backgroundColor: "#3b82f6",
  },
  destructive: {
    backgroundColor: "#ef4444",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#3b82f6",
  },
  secondary: {
    backgroundColor: "#6b7280",
  },
  ghost: {
    backgroundColor: "transparent",
  },
  link: {
    backgroundColor: "transparent",
    paddingHorizontal: 0,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  defaultText: {
    color: "#ffffff",
  },
  destructiveText: {
    color: "#ffffff",
  },
  outlineText: {
    color: "#3b82f6",
  },
  secondaryText: {
    color: "#ffffff",
  },
  ghostText: {
    color: "#3b82f6",
  },
  linkText: {
    color: "#3b82f6",
  },
})

