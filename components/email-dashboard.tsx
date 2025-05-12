"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getThreads } from "@/lib/api"
import type { EmailThreadType } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"
import { ThreadList } from "@/components/thread-list"

export function EmailDashboard() {
  const router = useRouter()
  const [threads, setThreads] = useState<EmailThreadType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadThreads() {
      setLoading(true)
      try {
        const data = await getThreads()
        setThreads(data)
      } catch (error) {
        console.error("Failed to load threads:", error)
        setError("Failed to load email threads. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    loadThreads()
  }, [])

  const handleThreadClick = (threadId: string) => {
    router.push(`/dashboard/thread/${threadId}`)
  }

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full bg-gray-800" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold text-gray-100">Inbox</h1>
      <ThreadList threads={threads} onThreadClick={handleThreadClick} />
    </div>
  )
}
