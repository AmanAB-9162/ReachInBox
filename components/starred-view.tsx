"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Star } from "lucide-react"

export function StarredView() {
  const [starredEmails] = useState([
    {
      id: "starred-1",
      from: { email: "boss@example.com", name: "Team Lead" },
      subject: "Quarterly Performance Review",
      date: "2023-05-14T11:20:00Z",
    },
    {
      id: "starred-2",
      from: { email: "hr@example.com", name: "HR Department" },
      subject: "New Benefits Package Information",
      date: "2023-05-10T09:45:00Z",
    },
  ])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Starred</h1>

      {starredEmails.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Star className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No starred emails</h3>
          <p className="text-muted-foreground mt-1">Star important emails to find them quickly</p>
        </div>
      ) : (
        <div className="space-y-2">
          {starredEmails.map((email) => (
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
