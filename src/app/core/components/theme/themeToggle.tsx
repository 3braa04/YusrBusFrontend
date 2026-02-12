import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/app/core/components/theme/themeProvider"
import { SidebarMenuButton } from "@/components/ui/sidebar"

export function ThemeToggle({ variant = "icon" }: { variant?: "icon" | "sidebar" }) {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {variant === "sidebar" ? (
          /* This version looks like a standard Sidebar link */
          <SidebarMenuButton className="w-full justify-start gap-2">
            <div className="relative flex items-center justify-center">
              <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            </div>
            <span>تغيير المظهر</span>
          </SidebarMenuButton>
        ) : (
          /* This is your original small square button */
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">تغيير الثمة</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          فاتح
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          داكن
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          النظام
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant="outline" size="icon">
    //       <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
    //       <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    //       <span className="sr-only">تغيير الثمة</span>
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end">
    //     <DropdownMenuItem onClick={() => setTheme("light")}>
    //       فاتح
    //     </DropdownMenuItem>
    //     <DropdownMenuItem onClick={() => setTheme("dark")}>
    //       داكن
    //     </DropdownMenuItem>
    //     <DropdownMenuItem onClick={() => setTheme("system")}>
    //       النظام
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  )
}