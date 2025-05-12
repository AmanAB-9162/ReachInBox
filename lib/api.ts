import type { EmailThreadType, ReplyData } from "./types"

// Mock data for threads
const mockThreads: EmailThreadType[] = [
  {
    id: "thread-1",
    subject: "Project Update: Q2 Marketing Campaign",
    from: { email: "sarah@example.com", name: "Sarah Johnson" },
    preview: "Here's the latest update on our Q2 marketing campaign...",
    date: "2023-05-15T10:30:00Z",
    read: false,
    starred: true,
    hasAttachments: true,
    messages: [
      {
        id: "msg-1",
        from: { email: "sarah@example.com", name: "Sarah Johnson" },
        to: [{ email: "user@example.com", name: "You" }],
        subject: "Project Update: Q2 Marketing Campaign",
        body: `
          <p>Hi there,</p>
          <p>I wanted to share the latest update on our Q2 marketing campaign. We've made significant progress in the last week:</p>
          <ul>
            <li>Finalized the creative assets for social media</li>
            <li>Scheduled the email newsletter sequence</li>
            <li>Confirmed partnerships with three influencers</li>
          </ul>
          <p>Please review the attached documents and let me know if you have any questions or suggestions.</p>
          <p>Best regards,<br>Sarah</p>
        `,
        date: "2023-05-15T10:30:00Z",
        read: false,
        attachments: [
          {
            id: "attach-1",
            name: "Q2_Marketing_Plan.pdf",
            size: 2500000,
            type: "application/pdf",
            url: "#",
          },
          {
            id: "attach-2",
            name: "Campaign_Assets.zip",
            size: 15000000,
            type: "application/zip",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "thread-2",
    subject: "Meeting Invitation: Product Roadmap Discussion",
    from: { email: "alex@example.com", name: "Alex Chen" },
    preview: "I'd like to invite you to a discussion about our product roadmap for the next quarter...",
    date: "2023-05-14T15:45:00Z",
    read: true,
    starred: false,
    hasAttachments: false,
    messages: [
      {
        id: "msg-2",
        from: { email: "alex@example.com", name: "Alex Chen" },
        to: [{ email: "user@example.com", name: "You" }],
        subject: "Meeting Invitation: Product Roadmap Discussion",
        body: `
          <p>Hello,</p>
          <p>I'd like to invite you to a discussion about our product roadmap for the next quarter. We'll be covering:</p>
          <ul>
            <li>Current development progress</li>
            <li>Feature prioritization</li>
            <li>Resource allocation</li>
          </ul>
          <p>The meeting is scheduled for Thursday at 2 PM in the main conference room. Please let me know if you can attend.</p>
          <p>Thanks,<br>Alex</p>
        `,
        date: "2023-05-14T15:45:00Z",
        read: true,
      },
    ],
  },
  {
    id: "thread-3",
    subject: "Invoice #1234 for April Services",
    from: { email: "billing@example.com", name: "Billing Department" },
    preview: "Please find attached the invoice for services provided in April...",
    date: "2023-05-13T09:15:00Z",
    read: true,
    starred: false,
    hasAttachments: true,
    messages: [
      {
        id: "msg-3",
        from: { email: "billing@example.com", name: "Billing Department" },
        to: [{ email: "user@example.com", name: "You" }],
        subject: "Invoice #1234 for April Services",
        body: `
          <p>Dear Client,</p>
          <p>Please find attached the invoice #1234 for services provided in April 2023.</p>
          <p>Payment is due within 30 days. You can pay via bank transfer or credit card through our client portal.</p>
          <p>If you have any questions regarding this invoice, please don't hesitate to contact us.</p>
          <p>Regards,<br>Billing Department</p>
        `,
        date: "2023-05-13T09:15:00Z",
        read: true,
        attachments: [
          {
            id: "attach-3",
            name: "Invoice_1234_April.pdf",
            size: 1200000,
            type: "application/pdf",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "thread-4",
    subject: "Weekly Team Update",
    from: { email: "manager@example.com", name: "Team Manager" },
    preview: "Here's a summary of what our team accomplished this week...",
    date: "2023-05-12T16:20:00Z",
    read: true,
    starred: true,
    hasAttachments: false,
    messages: [
      {
        id: "msg-4",
        from: { email: "manager@example.com", name: "Team Manager" },
        to: [{ email: "user@example.com", name: "You" }],
        cc: [{ email: "team@example.com", name: "Team" }],
        subject: "Weekly Team Update",
        body: `
          <p>Team,</p>
          <p>Here's a summary of what we accomplished this week:</p>
          <ul>
            <li>Completed the user authentication module</li>
            <li>Fixed 12 critical bugs in the reporting system</li>
            <li>Started work on the new analytics dashboard</li>
          </ul>
          <p>Next week, we'll focus on finalizing the analytics dashboard and starting the mobile app redesign.</p>
          <p>Have a great weekend!</p>
          <p>Best,<br>Team Manager</p>
        `,
        date: "2023-05-12T16:20:00Z",
        read: true,
      },
    ],
  },
  {
    id: "thread-5",
    subject: "New Feature Request: Export to CSV",
    from: { email: "customer@example.com", name: "Jane Customer" },
    preview: "We would like to request a new feature for exporting data to CSV format...",
    date: "2023-05-11T11:05:00Z",
    read: true,
    starred: false,
    hasAttachments: false,
    messages: [
      {
        id: "msg-5",
        from: { email: "customer@example.com", name: "Jane Customer" },
        to: [
          { email: "support@example.com", name: "Support" },
          { email: "user@example.com", name: "You" },
        ],
        subject: "New Feature Request: Export to CSV",
        body: `
          <p>Hello Support Team,</p>
          <p>We would like to request a new feature for exporting data to CSV format. Currently, we can only export to PDF, but our team needs to be able to work with the data in spreadsheets.</p>
          <p>This feature would be very valuable for our data analysis workflows and would save us a lot of time.</p>
          <p>Could you please consider adding this to your roadmap?</p>
          <p>Thank you,<br>Jane</p>
        `,
        date: "2023-05-11T11:05:00Z",
        read: true,
      },
    ],
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Authentication function
export async function loginUser(email: string, password: string): Promise<{ success: boolean }> {
  await delay(1000) // Simulate network delay

  // In a real app, this would validate credentials against a backend
  if (email && password.length >= 6) {
    return { success: true }
  }

  throw new Error("Invalid credentials")
}

// Get all threads
export async function getThreads(): Promise<EmailThreadType[]> {
  await delay(1000) // Simulate network delay
  return [...mockThreads]
}

// Get a specific thread by ID
export async function getThread(threadId: string): Promise<EmailThreadType> {
  await delay(800) // Simulate network delay

  const thread = mockThreads.find((t) => t.id === threadId)

  if (!thread) {
    throw new Error(`Thread with ID ${threadId} not found`)
  }

  return { ...thread }
}

// Delete a thread
export async function deleteThread(threadId: string): Promise<{ success: boolean }> {
  await delay(500) // Simulate network delay

  // In a real app, this would send a DELETE request to the backend
  return { success: true }
}

// Send a reply to a thread
export async function sendReply(threadId: string, replyData: ReplyData): Promise<{ success: boolean }> {
  await delay(1200) // Simulate network delay

  // In a real app, this would send a POST request to the backend
  return { success: true }
}

// Generate smart reply suggestions
export async function generateSmartReplies(messages: any[]): Promise<string[]> {
  await delay(1500) // Simulate network delay

  // In a real app, this would call an AI service to generate contextual replies
  return [
    "Thank you for the update. I'll review the documents and get back to you with my feedback by tomorrow.",
    "I appreciate the information. Could you please provide more details about the timeline for this project?",
  ]
}
// Simulate API delay

export async function fetchThreads(): Promise<EmailThreadType[]> {
  await delay(1000) // Simulate network delay
  return [...mockThreads]
}
