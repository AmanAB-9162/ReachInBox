export interface EmailAddress {
  email: string
  name?: string
}

export interface EmailAttachment {
  id: string
  name: string
  size: number
  type: string
  url: string
}

export interface EmailMessageType {
  id: string
  from: EmailAddress
  to: EmailAddress[]
  cc?: EmailAddress[]
  bcc?: EmailAddress[]
  subject: string
  body: string
  date: string
  read: boolean
  attachments?: EmailAttachment[]
}

export interface EmailThreadType {
  id: string
  subject: string
  from: EmailAddress
  preview: string
  date: string
  read: boolean
  starred: boolean
  hasAttachments: boolean
  messages: EmailMessageType[]
}

export interface ReplyData {
  from: EmailAddress
  to: EmailAddress
  subject: string
  body: string
}
