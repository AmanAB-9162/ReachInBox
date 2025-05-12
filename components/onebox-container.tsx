"use client"

import { useState, useEffect } from "react"
import { fetchThreads } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

interface Thread {
  id: string
  title: string
  content: string
}

export default function OneboxContainer() {
  const [threads, setThreads] = useState<Thread[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  /**
   * Enhanced loadThreads function with better error handling
   */
  const loadThreads = async () => {
    try {
      setLoading(true)
      setError(null)

      // fetchThreads already has fallback handling built in
      const data = await fetchThreads()

      setThreads(data)

      // Only show success toast when we actually got data from the API
      // (not the mock data fallback)
      if (data && data.length > 0 && !data[0].isMockData) {
        toast({
          title: "Threads loaded successfully",
          description: `Loaded ${data.length} threads`,
        })
      }
    } catch (error) {
      // This catch is a safety net in case fetchThreads throws despite its internal error handling
      console.error("Error in loadThreads:", error)
      setError("Failed to load threads. Using cached data instead.")

      // Show informative toast message to the user
      toast({
        variant: "destructive",
        title: "Connection issue",
        description: "Using offline data while we try to reconnect.",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadThreads()

    // Optional: Set up a refresh interval
    const intervalId = setInterval(() => {
      loadThreads()
    }, 60000) // Try to refresh every minute

    return () => clearInterval(intervalId)
  }, [])

  // Retry handler for user-initiated retry
  const handleRetry = () => {
    toast({
      title: "Retrying connection",
      description: "Attempting to reconnect to the server...",
    })
    loadThreads()
  }

  return (
    <div className="p-4 rounded-lg border">
      <h2 className="text-xl font-bold mb-4">Discussion Threads</h2>

      {/* Error message with retry button */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4 flex justify-between items-center">
          <span>{error}</span>
          <button onClick={handleRetry} className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm">
            Retry
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full"></div>
        </div>
      ) : (
        /* Thread list */
        <div className="space-y-4">
          {threads.map((thread) => (
            <div key={thread.id} className="p-4 border rounded-md hover:bg-gray-50">
              <h3 className="font-medium">{thread.title}</h3>
              <p className="text-gray-600 mt-1">{thread.content}</p>
            </div>
          ))}

          {threads.length === 0 && !error && (
            <div className="text-center p-8 text-gray-500">No threads available at the moment.</div>
          )}
        </div>
      )}
    </div>
  )
}
