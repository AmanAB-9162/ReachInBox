"use client"

import { useState } from "react"
import { Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { EmailMessageType } from "@/lib/types"
import { generateSmartReplies } from "@/lib/api"

interface SmartSuggestionsProps {
  threadContent: EmailMessageType[]
}

export function SmartSuggestions({ threadContent }: SmartSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  // Generate suggestions when component mounts
  useState(() => {
    const generateSuggestions = async () => {
      setLoading(true)
      try {
        const replies = await generateSmartReplies(threadContent)
        setSuggestions(replies)
      } catch (error) {
        console.error("Failed to generate suggestions:", error)
      } finally {
        setLoading(false)
      }
    }

    generateSuggestions()
  })

  const handleUseSuggestion = (suggestion: string) => {
    // Find the reply editor textarea and set its value
    const replyEditor = document.getElementById("reply-editor") as HTMLTextAreaElement
    if (replyEditor) {
      replyEditor.value = suggestion
      replyEditor.dispatchEvent(new Event("input", { bubbles: true }))
      replyEditor.focus()
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-1">
            <Lightbulb className="h-4 w-4 text-yellow-500" />
            Smart Suggestions
          </CardTitle>
          <CardDescription className="text-xs">Generating AI-powered reply suggestions...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-16 w-full animate-pulse rounded-md bg-muted"></div>
            <div className="h-16 w-full animate-pulse rounded-md bg-muted"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-1">
          <Lightbulb className="h-4 w-4 text-yellow-500" />
          Smart Suggestions
        </CardTitle>
        <CardDescription className="text-xs">AI-generated replies based on the email context</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="rounded-md border bg-muted/50 p-3 text-sm hover:bg-muted">
              <p className="line-clamp-2">{suggestion}</p>
              <Button variant="ghost" size="sm" className="mt-2" onClick={() => handleUseSuggestion(suggestion)}>
                Use this reply
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
