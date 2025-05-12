"use client"

import { useState } from "react"
import { Edit, File } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DraftsView() {
  const [drafts, setDrafts] = useState([
    {
      id: "draft-1",
      subject: "Meeting follow-up",
      lastEdited: "2023-05-15T14:30:00Z",
    },
    {
      id: "draft-2",
      subject: "Project proposal",
      lastEdited: "2023-05-14T09:15:00Z",
    },
  ])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Drafts</h1>
        <Button>
          <Edit className="mr-2 h-4 w-4" />
          New Draft
        </Button>
      </div>

      {drafts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <File className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No drafts</h3>
          <p className="text-muted-foreground mt-1">You don't have any saved drafts</p>
        </div>
      ) : (
        <div className="space-y-2">
          {drafts.map((draft) => (
            <div
              key={draft.id}
              className="flex items-center justify-between rounded-md border p-4 hover:bg-accent/50 cursor-pointer"
            >
              <div>
                <p className="font-medium">{draft.subject}</p>
                <p className="text-sm text-muted-foreground">
                  Last edited: {new Date(draft.lastEdited).toLocaleString()}
                </p>
              </div>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
