import { User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="flex justify-between items-center py-4 px-4 bg-white shadow-sm">
      <h1 className="text-xl font-bold">Shuttle+</h1>
      <div className="flex gap-2">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menu</span>
        </Button>
      </div>
    </header>
  )
}

