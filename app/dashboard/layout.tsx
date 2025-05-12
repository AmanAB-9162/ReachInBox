import type React from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { Sidebar } from "@/components/sidebar"
import { KeyboardShortcutsProvider } from "@/components/keyboard-shortcuts-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <KeyboardShortcutsProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <DashboardNav />
          <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </KeyboardShortcutsProvider>
  )
}
