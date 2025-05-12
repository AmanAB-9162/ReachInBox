"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { EmailThread } from "@/components/email-thread"
import { ReplyEditor } from "@/components/reply-editor"
import { SmartSuggestions } from "@/components/smart-suggestions"
import { getThread } from "@/lib/api"
import type { EmailThreadType } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export default function ThreadPage() {
  const params = useParams()
  const router = useRouter()
  const threadId = params.threadId as string
  const [thread, setThread] = useState<EmailThreadType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadThread() {
      setLoading(true)
      setError(null)
      try {
        const data = await getThread(threadId)
        setThread(data)
      } catch (error) {
        console.error("Failed to load thread:", error)
        setError(`Thread not found or could not be loaded`)
      } finally {
        setLoading(false)
      }
    }

    if (threadId) {
      loadThread()
    }
  }, [threadId])

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-10 space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-bold">Error</h2>
          <p className="text-muted-foreground mt-2">{error}</p>
        </div>
        <Button onClick={() => router.push("/dashboard")}>Return to Inbox</Button>
      </div>
    )
  }

  if (!thread) {
    return <div className="text-center py-10">Thread not found</div>
  }

  return (
    <div className="space-y-6">
      <EmailThread thread={thread} />
      <ReplyEditor threadId={threadId} recipient={thread.from} subject={thread.subject} />
      <SmartSuggestions threadContent={thread.messages} />
    </div>
  )
}
