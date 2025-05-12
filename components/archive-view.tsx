"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Archive } from "lucide-react"

export function ArchiveView() {
  const [archivedEmails] = useState([
    {
      id: "archived-1",
      from: { email: "newsletter@example.com", name: "Weekly Newsletter" },
      subject: "Industry Updates - May 2023",
      date: "2023-05-08T08:30:00Z",
    },
    {
      id: "archived-2",
      from: { email: "events@example.com", name: "Events Team" },
      subject: "Invitation: Annual Conference",
      date: "2023-04-25T14:15:00Z",
    },
  ])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Archive</h1>

      {archivedEmails.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Archive className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No archived emails</h3>
          <p className="text-muted-foreground mt-1">Archive emails to keep your inbox clean</p>
        </div>
      ) : (
        <div className="space-y-2">
          {archivedEmails.map((email) => (
            <div
              key={email.id}
              className="flex items-center justify-between rounded-md border p-4 hover:bg-accent/50 cursor-pointer"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium">{email.from.name || email.from.email}</p>
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
