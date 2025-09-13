"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, Eye } from "lucide-react"

const transactions = [
  {
    id: "TXN-001",
    date: "2024-01-15",
    vendor: "Academic Software Inc.",
    department: "Technology",
    amount: 25000,
    type: "expense",
    description: "Annual software licenses",
    status: "completed",
  },
  {
    id: "TXN-002",
    date: "2024-01-14",
    vendor: "Campus Facilities Corp",
    department: "Facilities",
    amount: 15000,
    type: "expense",
    description: "HVAC maintenance contract",
    status: "completed",
  },
  {
    id: "TXN-003",
    date: "2024-01-13",
    vendor: "State Education Grant",
    department: "Administration",
    amount: 100000,
    type: "income",
    description: "Q1 education funding",
    status: "completed",
  },
  {
    id: "TXN-004",
    date: "2024-01-12",
    vendor: "Office Supplies Plus",
    department: "Administration",
    amount: 3500,
    type: "expense",
    description: "Office supplies and materials",
    status: "pending",
  },
  {
    id: "TXN-005",
    date: "2024-01-11",
    vendor: "Student Activity Fund",
    department: "Student Services",
    amount: 8000,
    type: "expense",
    description: "Student event funding",
    status: "completed",
  },
]

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest financial activities</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-full ${
                    transaction.type === "income" ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
                  }`}
                >
                  {transaction.type === "income" ? (
                    <ArrowDownRight className="h-4 w-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />
                  )}
                </div>

                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{transaction.vendor}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{transaction.description}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {transaction.department}
                    </Badge>
                    <Badge variant={transaction.status === "completed" ? "default" : "outline"} className="text-xs">
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`font-semibold ${
                    transaction.type === "income"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(transaction.date).toLocaleDateString()}
                </div>
                <Button variant="ghost" size="sm" className="mt-1">
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
