"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { EmailThread } from "@/components/email-thread"
import { ReplyEditor } from "@/components/reply-editor"
import { SmartSuggestions } from "@/components/smart-suggestions"
import { getThread } from "@/lib/api"
import type { EmailThreadType } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"

export default function ThreadPage() {
  const params = useParams()
  const threadId = params.threadId as string
  const [thread, setThread] = useState<EmailThreadType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadThread() {
      setLoading(true)
      try {
        const data = await getThread(threadId)
        setThread(data)
      } catch (error) {
        console.error("Failed to load thread:", error)
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
