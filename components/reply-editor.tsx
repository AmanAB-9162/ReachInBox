"use client"

import { useState } from "react"
import { Bold, Italic, Link, Send, Underline, Variable } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { sendReply } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

interface ReplyEditorProps {
  threadId: string
  recipient: {
    email: string
    name?: string
  }
  subject: string
}

export function ReplyEditor({ threadId, recipient, subject }: ReplyEditorProps) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSend = async () => {
    if (!content.trim()) {
      toast({
        variant: "destructive",
        title: "Cannot send empty reply",
        description: "Please enter a message before sending.",
      })
      return
    }

    setIsSubmitting(true)
    try {
      // Format content as HTML
      const htmlContent = `<div>${content.replace(/\n/g, "<br/>")}</div>`

      await sendReply(threadId, {
        from: { email: "user@example.com" },
        to: recipient,
        subject: `Re: ${subject}`,
        body: htmlContent,
      })

      toast({
        title: "Reply sent",
        description: "Your reply has been sent successfully.",
      })

      setContent("")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send reply",
        description: "There was an error sending your reply. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const insertVariable = () => {
    const variables = ["{{first_name}}", "{{last_name}}", "{{company}}", "{{meeting_time}}"]

    // Show a simple dropdown for variables
    const variable = prompt("Select a variable to insert:", variables.join(", "))

    if (variable && variables.includes(variable)) {
      setContent((prev) => prev + " " + variable + " ")
    }
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-4 sm:p-6">
        <div className="mb-4">
          <p className="text-sm font-medium">
            Reply to: <span className="text-muted-foreground">{recipient.name || recipient.email}</span>
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 border-b pb-2">
            <Button variant="ghost" size="sm">
              <Bold className="h-4 w-4" />
              <span className="sr-only">Bold</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Italic className="h-4 w-4" />
              <span className="sr-only">Italic</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Underline className="h-4 w-4" />
              <span className="sr-only">Underline</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Link className="h-4 w-4" />
              <span className="sr-only">Link</span>
            </Button>
            <Button variant="outline" size="sm" className="ml-auto" onClick={insertVariable}>
              <Variable className="mr-1 h-4 w-4" />
              Variables
            </Button>
          </div>
          <Textarea
            id="reply-editor"
            placeholder="Type your reply here..."
            className="min-h-32 resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline">Save Draft</Button>
            <Button onClick={handleSend} disabled={isSubmitting}>
              <Send className="mr-1 h-4 w-4" />
              {isSubmitting ? "Sending..." : "Send Reply"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
