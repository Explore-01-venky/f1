"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Building,
  User,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export default function TransactionDetailPage({ params }: { params: { id: string } }) {
  const [comment, setComment] = useState("")

  // Mock transaction data
  const transaction = {
    id: params.id,
    amount: 25000,
    description: "Office Equipment Purchase - Q4 2024",
    department: "IT Department",
    vendor: "TechCorp Solutions",
    date: "2024-01-15",
    status: "pending",
    category: "Equipment",
    approver: "John Smith",
    submittedBy: "Sarah Johnson",
    submittedDate: "2024-01-10",
    attachments: ["invoice_001.pdf", "purchase_order.pdf"],
    auditTrail: [
      { action: "Submitted", user: "Sarah Johnson", date: "2024-01-10 09:30", note: "Initial submission" },
      { action: "Under Review", user: "System", date: "2024-01-10 09:31", note: "Automatic review assignment" },
      { action: "Requested Info", user: "John Smith", date: "2024-01-12 14:20", note: "Need additional vendor quotes" },
    ],
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/transactions">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Transactions
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Transaction Details</h1>
            <p className="text-gray-600">Transaction ID: {transaction.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Transaction Information</CardTitle>
                  <Badge className={getStatusColor(transaction.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(transaction.status)}
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className="font-semibold">${transaction.amount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Transaction Date</p>
                      <p className="font-semibold">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Department</p>
                      <p className="font-semibold">{transaction.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Vendor</p>
                      <p className="font-semibold">{transaction.vendor}</p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-gray-600 mb-2">Description</p>
                  <p className="text-gray-900">{transaction.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Audit Trail */}
            <Card>
              <CardHeader>
                <CardTitle>Audit Trail</CardTitle>
                <CardDescription>Complete history of this transaction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transaction.auditTrail.map((entry, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">{entry.action}</span>
                          <span className="text-sm text-gray-500">by {entry.user}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{entry.note}</p>
                        <p className="text-xs text-gray-500">{entry.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="default">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Transaction
                </Button>
                <Button className="w-full" variant="destructive">
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Transaction
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Request Information
                </Button>
              </CardContent>
            </Card>

            {/* Attachments */}
            <Card>
              <CardHeader>
                <CardTitle>Attachments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {transaction.attachments.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-700">{file}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add Comment */}
            <Card>
              <CardHeader>
                <CardTitle>Add Comment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  placeholder="Add a comment or note..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button className="w-full">Add Comment</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
