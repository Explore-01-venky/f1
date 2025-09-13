"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User } from "lucide-react"

const mockResponses = [
  "Based on your spending patterns, the Technology department is 20% under budget this quarter. Consider reallocating funds to the Academics department which is approaching its limit.",
  "I notice unusual spending in the Facilities department. The HVAC maintenance contract seems higher than previous quarters. Would you like me to analyze this further?",
  "Your overall budget utilization is at 72%. This is within the healthy range of 70-80% for this time of year.",
  "The Student Services department has increased spending by 15% compared to last month, primarily due to increased event funding.",
]

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your financial AI assistant. I can help you analyze spending patterns, identify budget anomalies, and provide insights about your financial data. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const quickQuestions = [
    "Budget utilization summary",
    "Unusual spending patterns",
    "Department comparisons",
    "Vendor analysis",
  ]

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-600" />
          AI Financial Assistant
        </CardTitle>
        <CardDescription>Get insights and analysis of your financial data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-2 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div
                  className={`p-1 rounded-full ${message.type === "user" ? "bg-blue-100 dark:bg-blue-900" : "bg-gray-100 dark:bg-gray-800"}`}
                >
                  {message.type === "user" ? (
                    <User className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <Bot className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                  )}
                </div>
                <div
                  className={`p-3 rounded-lg text-sm ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 justify-start">
              <div className="p-1 rounded-full bg-gray-100 dark:bg-gray-800">
                <Bot className="h-3 w-3 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question) => (
              <Badge
                key={question}
                variant="outline"
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setInput(question)}
              >
                {question}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Ask about your finances..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
