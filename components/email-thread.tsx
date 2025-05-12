"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { ArrowDown, ArrowUp, Paperclip, Reply, Star, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { EmailThreadType } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useKeyboardShortcuts } from "@/components/keyboard-shortcuts-provider"

interface EmailThreadProps {
  thread: EmailThreadType
}

export function EmailThread({ thread }: EmailThreadProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const { registerReplyHandler, registerDeleteHandler } = useKeyboardShortcuts()

  useEffect(() => {
    // Register handlers after component mounts
    registerReplyHandler(() => {
      document.getElementById("reply-editor")?.focus()
    })

    registerDeleteHandler(async () => {
      if (confirm("Are you sure you want to delete this thread?")) {
        // In a real app, this would call the API
        alert("Thread deleted")
      }
    })

    // No need to return cleanup function as the provider handles this
  }, [registerReplyHandler, registerDeleteHandler])

  const toggleExpand = (messageId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{thread.subject}</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Star
              className={cn("h-5 w-5", thread.starred ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground")}
            />
            <span className="sr-only">Star</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-5 w-5" />
            <span className="sr-only">Delete</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Reply className="h-5 w-5" />
            <span className="sr-only">Reply</span>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {thread.messages.map((message, index) => (
          <div key={message.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium">{message.from.name?.[0] || message.from.email[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{message.from.name || message.from.email}</p>
                    <p className="text-xs text-muted-foreground">{message.from.email}</p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {format(new Date(message.date), "MMM d, yyyy h:mm a")}
                </div>
              </div>
              <div className="pt-2">
                <div
                  className={cn(
                    "prose prose-sm dark:prose-invert max-w-none",
                    !expanded[message.id] && index !== thread.messages.length - 1 && "max-h-24 overflow-hidden",
                  )}
                  dangerouslySetInnerHTML={{ __html: message.body }}
                />
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-4 border-t pt-4">
                    <p className="text-sm font-medium mb-2">Attachments ({message.attachments.length})</p>
                    <div className="flex flex-wrap gap-2">
                      {message.attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex items-center gap-2 rounded-md border bg-background p-2 text-sm"
                        >
                          <Paperclip className="h-4 w-4" />
                          <span>{attachment.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {index !== thread.messages.length - 1 && (
                  <Button variant="ghost" size="sm" className="mt-2" onClick={() => toggleExpand(message.id)}>
                    {expanded[message.id] ? (
                      <>
                        <ArrowUp className="mr-1 h-3 w-3" />
                        Show less
                      </>
                    ) : (
                      <>
                        <ArrowDown className="mr-1 h-3 w-3" />
                        Show more
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
