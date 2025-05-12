"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Archive, ChevronDown, Inbox, Mail, Menu, PanelLeft, Send, Star, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      // Auto-collapse sidebar on small screens
      if (window.innerWidth < 768) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }

    // Set initial state
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const mainItems = [
    {
      title: "Inbox",
      icon: Inbox,
      href: "/dashboard",
      badge: 24,
    },
    {
      title: "Starred",
      icon: Star,
      href: "/dashboard/starred",
      badge: 3,
    },
    {
      title: "Sent",
      icon: Send,
      href: "/dashboard/sent",
    },
    {
      title: "Drafts",
      icon: Mail,
      href: "/dashboard/drafts",
      badge: 2,
    },
    {
      title: "Archive",
      icon: Archive,
      href: "/dashboard/archive",
    },
    {
      title: "Trash",
      icon: Trash,
      href: "/dashboard/trash",
    },
  ]

  const labels = [
    { name: "Important", color: "bg-red-500" },
    { name: "Work", color: "bg-blue-500" },
    { name: "Personal", color: "bg-green-500" },
    { name: "Travel", color: "bg-yellow-500" },
    { name: "Finance", color: "bg-purple-500" },
  ]

  const SidebarContent = (
    <div className={cn("flex h-full flex-col bg-gray-900 text-gray-100", className)}>
      <div className="flex h-14 items-center border-b border-gray-800 px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:flex hidden text-gray-300 hover:text-gray-100"
        >
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <div className="flex items-center gap-2 font-semibold text-gray-100">
          <Mail className="h-5 w-5 text-blue-500" />
          {isOpen && <span>Reachinbox</span>}
        </div>
      </div>
      <ScrollArea className="flex-1 px-2 py-4">
        <div className="space-y-2">
          <Button className={cn("compose-button", !isOpen && "justify-center px-2")}>
            <Mail className="h-4 w-4" />
            {isOpen && <span>Compose</span>}
          </Button>
          <div className="space-y-1 pt-2">
            {mainItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={cn("sidebar-item", pathname === item.href && "active", !isOpen && "justify-center px-2")}
              >
                <item.icon className="h-4 w-4" />
                {isOpen && (
                  <>
                    <span className="flex-1">{item.title}</span>
                    {item.badge && <span className="badge">{item.badge}</span>}
                  </>
                )}
              </Link>
            ))}
          </div>
          {isOpen && (
            <>
              <div className="py-2">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-300">
                    <ChevronDown className="h-4 w-4" />
                    <span>Labels</span>
                  </div>
                </div>
                <div className="space-y-1 pl-2">
                  {labels.map((label) => (
                    <div key={label.name} className="sidebar-item">
                      <div className={cn("label-dot", label.color)} />
                      <span>{label.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  )

  return (
    <>
      <aside
        className={cn(
          "hidden border-r border-gray-800 bg-gray-900 transition-all duration-300 md:block",
          isOpen ? "w-64" : "w-14",
        )}
      >
        {SidebarContent}
      </aside>
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden text-gray-300 hover:text-gray-100">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 border-r border-gray-800 bg-gray-900">
          {SidebarContent}
        </SheetContent>
      </Sheet>
    </>
  )
}
