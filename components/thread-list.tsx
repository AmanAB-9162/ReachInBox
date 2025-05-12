"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Paperclip, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import type { EmailThreadType } from "@/lib/types"
import { useKeyboardShortcuts } from "@/components/keyboard-shortcuts-provider"

interface ThreadListProps {
  threads: EmailThreadType[]
  onThreadClick: (threadId: string) => void
}

export function ThreadList({ threads, onThreadClick }: ThreadListProps) {
  const router = useRouter()
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null)
  const { registerThread } = useKeyboardShortcuts()

  const handleThreadSelect = (threadId: string) => {
    setSelectedThreadId(threadId)
    registerThread(threadId)
    router.push(`/dashboard/thread/${threadId}`)
  }

  if (threads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <p>No emails found</p>
      </div>
    )
  }

  return (
    <div className="email-list rounded-lg border border-gray-800 bg-gray-900 overflow-hidden">
      {threads.map((thread) => (
        <div
          key={thread.id}
          className={cn("email-item", !thread.read && "unread", selectedThreadId === thread.id && "bg-gray-800")}
          onClick={() => handleThreadSelect(thread.id)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleThreadSelect(thread.id)
            }
          }}
        >
          <div className="flex-shrink-0">
            <Star className={cn("h-5 w-5", thread.starred ? "fill-yellow-400 text-yellow-400" : "text-gray-500")} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <p className={cn("email-sender", !thread.read && "font-semibold")}>
                {thread.from.name || thread.from.email}
              </p>
              <p className="email-time">{format(new Date(thread.date), "MMM d")}</p>
            </div>
            <p className="email-subject">{thread.subject}</p>
            <div className="flex items-center gap-2">
              <p className="email-preview">{thread.preview}</p>
              {thread.hasAttachments && <Paperclip className="h-3 w-3 text-gray-500" />}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
