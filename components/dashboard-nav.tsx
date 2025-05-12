"use client"

import { useState } from "react"
import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export function DashboardNav() {
  const router = useRouter()
  const [showNotifications, setShowNotifications] = useState(false)

  const handleLogout = () => {
    router.push("/")
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  return (
    <header className="border-b border-gray-800 bg-gray-900 text-gray-100">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="hidden md:flex md:flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search emails..."
              className="w-64 rounded-md border-gray-700 bg-gray-800 pl-8 text-gray-100 placeholder:text-gray-500 focus:border-blue-500 md:w-80 lg:w-96"
            />
          </div>
        </div>
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon" className="mr-2 text-gray-300 hover:text-gray-100">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-300 hover:text-gray-100"
              onClick={toggleNotifications}
            >
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-md border border-gray-700 bg-gray-800 p-0 shadow-lg">
                <div className="border-b border-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-100">Notifications</h4>
                    <Button variant="ghost" size="sm" className="text-xs text-gray-300 hover:text-gray-100">
                      Mark all as read
                    </Button>
                  </div>
                </div>
                <div className="max-h-80 overflow-auto">
                  <div className="border-b border-gray-700 bg-gray-700/40 p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-500" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-gray-100">New message from Sarah</p>
                        <p className="text-xs text-gray-400">Project Update: Q2 Marketing Campaign</p>
                        <p className="text-xs text-gray-500">5 minutes ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-gray-700 p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-500" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-gray-100">Weekly report available</p>
                        <p className="text-xs text-gray-400">Your weekly activity report is ready to view</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-transparent" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-gray-100">System maintenance</p>
                        <p className="text-xs text-gray-400">Scheduled maintenance in 24 hours</p>
                        <p className="text-xs text-gray-500">Yesterday</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-700 p-2">
                  <Button variant="ghost" size="sm" className="w-full text-xs text-gray-300 hover:text-gray-100">
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full text-gray-300 hover:text-gray-100">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-gray-700 bg-gray-800 text-gray-100">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="hover:bg-gray-700">Profile</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-700">Settings</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem onClick={handleLogout} className="hover:bg-gray-700">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
