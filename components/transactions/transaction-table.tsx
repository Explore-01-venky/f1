"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

const transactions = [
  {
    id: "TXN-001",
    date: "2024-01-15",
    vendor: "Academic Software Inc.",
    department: "Technology",
    amount: 25000,
    type: "expense",
    description: "Annual software licenses for educational platforms",
    status: "completed",
    category: "Software",
    approvedBy: "John Smith",
  },
  {
    id: "TXN-002",
    date: "2024-01-14",
    vendor: "Campus Facilities Corp",
    department: "Facilities",
    amount: 15000,
    type: "expense",
    description: "HVAC maintenance contract - Q1 2024",
    status: "completed",
    category: "Maintenance",
    approvedBy: "Sarah Johnson",
  },
  {
    id: "TXN-003",
    date: "2024-01-13",
    vendor: "State Education Grant",
    department: "Administration",
    amount: 100000,
    type: "income",
    description: "Q1 education funding from state government",
    status: "completed",
    category: "Grant",
    approvedBy: "Michael Brown",
  },
  {
    id: "TXN-004",
    date: "2024-01-12",
    vendor: "Office Supplies Plus",
    department: "Administration",
    amount: 3500,
    type: "expense",
    description: "Office supplies and materials for administrative staff",
    status: "pending",
    category: "Supplies",
    approvedBy: "Pending",
  },
  {
    id: "TXN-005",
    date: "2024-01-11",
    vendor: "Student Activity Fund",
    department: "Student Services",
    amount: 8000,
    type: "expense",
    description: "Student event funding for spring semester activities",
    status: "completed",
    category: "Events",
    approvedBy: "Lisa Davis",
  },
  {
    id: "TXN-006",
    date: "2024-01-10",
    vendor: "Research Equipment Co.",
    department: "Academics",
    amount: 45000,
    type: "expense",
    description: "Laboratory equipment for science department",
    status: "completed",
    category: "Equipment",
    approvedBy: "Dr. Wilson",
  },
  {
    id: "TXN-007",
    date: "2024-01-09",
    vendor: "Federal Research Grant",
    department: "Academics",
    amount: 75000,
    type: "income",
    description: "Federal research grant for STEM programs",
    status: "completed",
    category: "Grant",
    approvedBy: "Dr. Wilson",
  },
  {
    id: "TXN-008",
    date: "2024-01-08",
    vendor: "Security Services LLC",
    department: "Facilities",
    amount: 12000,
    type: "expense",
    description: "Campus security services - monthly contract",
    status: "pending",
    category: "Security",
    approvedBy: "Pending",
  },
]

type SortField = "date" | "amount" | "vendor" | "department"
type SortDirection = "asc" | "desc"

export function TransactionTable() {
  const [sortField, setSortField] = useState<SortField>("date")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const sortedTransactions = [...transactions].sort((a, b) => {
    let aValue: any = a[sortField]
    let bValue: any = b[sortField]

    if (sortField === "date") {
      aValue = new Date(aValue)
      bValue = new Date(bValue)
    } else if (sortField === "amount") {
      aValue = Number(aValue)
      bValue = Number(bValue)
    } else {
      aValue = String(aValue).toLowerCase()
      bValue = String(bValue).toLowerCase()
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />
    return sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("date")} className="h-auto p-0 font-semibold">
                    Date <SortIcon field="date" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("vendor")} className="h-auto p-0 font-semibold">
                    Vendor <SortIcon field="vendor" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("department")} className="h-auto p-0 font-semibold">
                    Department <SortIcon field="department" />
                  </Button>
                </TableHead>
                <TableHead>Type</TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("amount")} className="h-auto p-0 font-semibold">
                    Amount <SortIcon field="amount" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{transaction.vendor}</div>
                      <div className="text-sm text-gray-500 truncate max-w-48">{transaction.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{transaction.department}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {transaction.type === "income" ? (
                        <ArrowDownRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-red-600" />
                      )}
                      <span className="text-sm text-gray-500">{transaction.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-semibold ${
                        transaction.type === "income"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.status === "completed"
                          ? "default"
                          : transaction.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-gray-500">
            Showing {transactions.length} of {transactions.length} transactions
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
