"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, AlertTriangle } from "lucide-react"

const budgets = [
  {
    id: "1",
    department: "Academics",
    allocated: 2500000,
    spent: 1800000,
    status: "active",
    approver: "Dr. Wilson",
  },
  {
    id: "2",
    department: "Administration",
    allocated: 800000,
    spent: 650000,
    status: "active",
    approver: "John Smith",
  },
  {
    id: "3",
    department: "Facilities",
    allocated: 1200000,
    spent: 950000,
    status: "warning",
    approver: "Sarah Johnson",
  },
  {
    id: "4",
    department: "Technology",
    allocated: 600000,
    spent: 480000,
    status: "active",
    approver: "Michael Brown",
  },
]

export function BudgetControls() {
  const [newBudget, setNewBudget] = useState({
    department: "",
    amount: "",
    approver: "",
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Budget Controls</CardTitle>
            <CardDescription>Manage department budgets and allocations</CardDescription>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Budget
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
          <h3 className="font-semibold mb-4">Create New Budget</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="department">Department</Label>
              <Select
                value={newBudget.department}
                onValueChange={(value) => setNewBudget({ ...newBudget, department: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academics">Academics</SelectItem>
                  <SelectItem value="administration">Administration</SelectItem>
                  <SelectItem value="facilities">Facilities</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="student-services">Student Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amount">Budget Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="1000000"
                value={newBudget.amount}
                onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="approver">Budget Approver</Label>
              <Input
                id="approver"
                placeholder="Approver name"
                value={newBudget.approver}
                onChange={(e) => setNewBudget({ ...newBudget, approver: e.target.value })}
              />
            </div>
          </div>
          <Button className="mt-4" size="sm">
            Create Budget
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Active Budgets</h3>
          {budgets.map((budget) => {
            const utilizationRate = (budget.spent / budget.allocated) * 100
            const isOverBudget = utilizationRate > 90

            return (
              <div key={budget.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{budget.department}</h4>
                    <Badge variant={budget.status === "warning" ? "destructive" : "default"}>{budget.status}</Badge>
                    {isOverBudget && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <span className="text-gray-500">Allocated: </span>
                    <span className="font-medium">${(budget.allocated / 1000).toFixed(0)}K</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Spent: </span>
                    <span className="font-medium">${(budget.spent / 1000).toFixed(0)}K</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Remaining: </span>
                    <span className="font-medium">${((budget.allocated - budget.spent) / 1000).toFixed(0)}K</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Approver: </span>
                    <span className="font-medium">{budget.approver}</span>
                  </div>
                </div>

                <Progress value={utilizationRate} className={`h-2 ${isOverBudget ? "bg-red-100" : ""}`} />
                <div className="text-xs text-gray-500 mt-1">{utilizationRate.toFixed(1)}% utilized</div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
