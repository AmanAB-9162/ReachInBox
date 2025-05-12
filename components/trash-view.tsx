"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TrashView() {
  const [trashedEmails] = useState([
    {
      id: "trash-1",
      from: { email: "spam@example.com", name: "Marketing" },
      subject: "Limited Time Offer!",
      date: "2023-05-13T12:10:00Z",
    },
    {
      id: "trash-2",
      from: { email: "no-reply@example.com", name: "Notification Service" },
      subject: "Your account has been updated",
      date: "2023-05-09T16:30:00Z",
    },
  ])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Trash</h1>
        {trashedEmails.length > 0 && (
          <Button variant="destructive" size="sm">
            Empty Trash
          </Button>
        )}
      </div>

      {trashedEmails.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Trash className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Trash is empty</h3>
          <p className="text-muted-foreground mt-1">Items in trash will be automatically deleted after 30 days</p>
        </div>
      ) : (
        <div className="space-y-2">
          {trashedEmails.map((email) => (
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
