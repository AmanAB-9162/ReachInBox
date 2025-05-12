"use client"

import type React from "react"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { deleteThread } from "@/lib/api"

interface KeyboardShortcutsContextType {
  registerThread: (threadId: string) => void
  registerReplyHandler: (handler: () => void) => void
  registerDeleteHandler: (handler: () => void) => void
}

const KeyboardShortcutsContext = createContext<KeyboardShortcutsContextType | undefined>(undefined)

export function KeyboardShortcutsProvider({ children }: { children: React.ReactNode }) {
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null)
  const [replyHandler, setReplyHandler] = useState<(() => void) | null>(null)
  const [deleteHandler, setDeleteHandler] = useState<(() => void) | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      // Only handle if not in an input or textarea
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return
      }

      // "R" key for reply
      if (event.key === "r" || event.key === "R") {
        event.preventDefault()
        if (replyHandler) {
          replyHandler()
          toast({
            title: "Keyboard shortcut",
            description: "Reply editor focused (R)",
          })
        }
      }

      // "D" key for delete
      if ((event.key === "d" || event.key === "D") && currentThreadId) {
        event.preventDefault()
        if (deleteHandler) {
          deleteHandler()
          toast({
            title: "Keyboard shortcut",
            description: "Delete thread (D)",
          })
        } else if (currentThreadId) {
          try {
            await deleteThread(currentThreadId)
            toast({
              title: "Thread deleted",
              description: "The thread has been moved to trash.",
            })
          } catch (error) {
            toast({
              variant: "destructive",
              title: "Failed to delete thread",
              description: "There was an error deleting the thread.",
            })
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentThreadId, replyHandler, deleteHandler, toast])

  const registerThread = (threadId: string) => {
    setCurrentThreadId(threadId)
  }

  const registerReplyHandler = useCallback((handler: () => void) => {
    setReplyHandler(() => handler)
  }, [])

  const registerDeleteHandler = useCallback((handler: () => void) => {
    setDeleteHandler(() => handler)
  }, [])

  return (
    <KeyboardShortcutsContext.Provider
      value={{
        registerThread,
        registerReplyHandler,
        registerDeleteHandler,
      }}
    >
      {children}
    </KeyboardShortcutsContext.Provider>
  )
}

export function useKeyboardShortcuts() {
  const context = useContext(KeyboardShortcutsContext)
  if (!context) {
    throw new Error("useKeyboardShortcuts must be used within a KeyboardShortcutsProvider")
  }
  return context
}
