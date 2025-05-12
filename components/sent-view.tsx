"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Send } from "lucide-react"

export function SentView() {
  const [sentEmails] = useState([
    {
      id: "sent-1",
      to: { email: "client@example.com", name: "Important Client" },
      subject: "Project Update: May 2023",
      date: "2023-05-15T10:30:00Z",
    },
    {
      id: "sent-2",
      to: { email: "team@example.com", name: "Project Team" },
      subject: "Weekly Status Report",
      date: "2023-05-12T16:45:00Z",
    },
    {
      id: "sent-3",
      to: { email: "support@example.com", name: "Support Team" },
      subject: "Feature Request Follow-up",
      date: "2023-05-10T09:15:00Z",
    },
  ])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Sent</h1>

      {sentEmails.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Send className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No sent emails</h3>
          <p className="text-muted-foreground mt-1">You haven't sent any emails yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sentEmails.map((email) => (
            <div
              key={email.id}
              className="flex items-center justify-between rounded-md border p-4 hover:bg-accent/50 cursor-pointer"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium">To: {email.to.name || email.to.email}</p>
                  <p className="text-xs text-muted-foreground">{format(new Date(email.date), "MMM d, yyyy")}</p>
                </div>
                <p className="truncate text-sm">{email.subject}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
