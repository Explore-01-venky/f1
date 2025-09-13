"use client"

import { useState } from "react"
import { CheckCircle, XCircle, Clock, AlertTriangle, User, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Transaction {
  id: string
  amount: number
  description: string
  department: string
  vendor: string
  submittedBy: string
  submittedDate: string
  priority: "low" | "medium" | "high"
  category: string
}

export default function TransactionApproval() {
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null)
  const [comment, setComment] = useState("")
  const [bulkAction, setBulkAction] = useState("")

  const pendingTransactions: Transaction[] = [
    {
      id: "TXN-001",
      amount: 25000,
      description: "Office Equipment Purchase - Q4 2024",
      department: "IT Department",
      vendor: "TechCorp Solutions",
      submittedBy: "Sarah Johnson",
      submittedDate: "2024-01-10",
      priority: "high",
      category: "Equipment",
    },
    {
      id: "TXN-002",
      amount: 1200,
      description: "Monthly Software Licenses",
      department: "Marketing",
      vendor: "SoftwareCorp",
      submittedBy: "Mike Chen",
      submittedDate: "2024-01-12",
      priority: "medium",
      category: "Software",
    },
    {
      id: "TXN-003",
      amount: 850,
      description: "Office Supplies Restock",
      department: "Administration",
      vendor: "OfficeMax",
      submittedBy: "Lisa Wong",
      submittedDate: "2024-01-14",
      priority: "low",
      category: "Supplies",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-3 w-3" />
      case "medium":
        return <Clock className="h-3 w-3" />
      case "low":
        return <CheckCircle className="h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Transaction Approvals</h2>
          <p className="text-gray-600">{pendingTransactions.length} transactions pending approval</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={bulkAction} onValueChange={setBulkAction}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Bulk Actions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="approve-all">Approve All</SelectItem>
              <SelectItem value="reject-all">Reject All</SelectItem>
              <SelectItem value="export">Export List</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Apply</Button>
        </div>
      </div>

      {/* Pending Transactions */}
      <div className="grid gap-4">
        {pendingTransactions.map((transaction) => (
          <Card key={transaction.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-lg">{transaction.id}</CardTitle>
                  <Badge className={getPriorityColor(transaction.priority)}>
                    <div className="flex items-center gap-1">
                      {getPriorityIcon(transaction.priority)}
                      {transaction.priority.toUpperCase()}
                    </div>
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">${transaction.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{transaction.category}</p>
                </div>
              </div>
              <CardDescription>{transaction.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Submitted by</p>
                    <p className="font-medium">{transaction.submittedBy}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium">{transaction.submittedDate}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Department</p>
                  <p className="font-medium">{transaction.department}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t">
                <Button size="sm" className="flex-1">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button size="sm" variant="destructive" className="flex-1">
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Comment */}
      <Card>
        <CardHeader>
          <CardTitle>Add Approval Comment</CardTitle>
          <CardDescription>Add a comment that will be visible in the audit trail</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            placeholder="Enter your approval comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex gap-2">
            <Button>Save Comment</Button>
            <Button variant="outline">Clear</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
