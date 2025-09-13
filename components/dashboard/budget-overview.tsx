"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const budgetData = [
  { department: "Academics", allocated: 2500000, spent: 1800000, remaining: 700000 },
  { department: "Administration", allocated: 800000, spent: 650000, remaining: 150000 },
  { department: "Facilities", allocated: 1200000, spent: 950000, remaining: 250000 },
  { department: "Technology", allocated: 600000, spent: 480000, remaining: 120000 },
  { department: "Student Services", allocated: 400000, spent: 320000, remaining: 80000 },
]

const pieData = budgetData.map((item) => ({
  name: item.department,
  value: item.spent,
  color: `hsl(${Math.random() * 360}, 70%, 50%)`,
}))

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function BudgetOverview() {
  const totalBudget = budgetData.reduce((sum, item) => sum + item.allocated, 0)
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0)
  const utilizationRate = (totalSpent / totalBudget) * 100

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">Budget Overview</CardTitle>
          <CardDescription>Total budget utilization across all departments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${(totalBudget / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-gray-500">Total Budget</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${(totalSpent / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-gray-500">Total Spent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {utilizationRate.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-500">Utilization Rate</div>
            </div>
          </div>

          <div className="space-y-4">
            {budgetData.map((item, index) => (
              <div key={item.department} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.department}</span>
                  <span className="text-gray-500">
                    ${(item.spent / 1000).toFixed(0)}K / ${(item.allocated / 1000).toFixed(0)}K
                  </span>
                </div>
                <Progress value={(item.spent / item.allocated) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Spending</CardTitle>
            <CardDescription>Budget allocation vs actual spending</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" angle={-45} textAnchor="end" height={80} />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, ""]} />
                <Bar dataKey="allocated" fill="#3B82F6" name="Allocated" />
                <Bar dataKey="spent" fill="#10B981" name="Spent" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spending Distribution</CardTitle>
            <CardDescription>Percentage breakdown by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${(value / 1000).toFixed(0)}K`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
