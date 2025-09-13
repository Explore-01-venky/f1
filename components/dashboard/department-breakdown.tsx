"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

const departmentData = [
  {
    name: "Academics",
    budget: 2500000,
    spent: 1800000,
    transactions: 45,
    trend: "up",
    trendValue: 12,
    topVendor: "Educational Resources Inc.",
  },
  {
    name: "Administration",
    budget: 800000,
    spent: 650000,
    transactions: 28,
    trend: "down",
    trendValue: 5,
    topVendor: "Office Solutions LLC",
  },
  {
    name: "Facilities",
    budget: 1200000,
    spent: 950000,
    transactions: 32,
    trend: "up",
    trendValue: 8,
    topVendor: "Maintenance Pro Services",
  },
  {
    name: "Technology",
    budget: 600000,
    spent: 480000,
    transactions: 18,
    trend: "stable",
    trendValue: 0,
    topVendor: "Tech Solutions Corp",
  },
  {
    name: "Student Services",
    budget: 400000,
    spent: 320000,
    transactions: 22,
    trend: "up",
    trendValue: 15,
    topVendor: "Student Activity Supplies",
  },
]

export function DepartmentBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Analysis</CardTitle>
        <CardDescription>Detailed breakdown by department</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {departmentData.map((dept) => {
            const utilizationRate = (dept.spent / dept.budget) * 100
            const remaining = dept.budget - dept.spent

            return (
              <div key={dept.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{dept.name}</h3>
                  <div className="flex items-center gap-2">
                    {dept.trend === "up" && (
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                        <TrendingUp className="h-3 w-3" />
                        <span className="text-xs">+{dept.trendValue}%</span>
                      </div>
                    )}
                    {dept.trend === "down" && (
                      <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                        <TrendingDown className="h-3 w-3" />
                        <span className="text-xs">-{dept.trendValue}%</span>
                      </div>
                    )}
                    {dept.trend === "stable" && (
                      <div className="flex items-center gap-1 text-gray-500">
                        <Minus className="h-3 w-3" />
                        <span className="text-xs">0%</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Budget: </span>
                    <span className="font-medium">${(dept.budget / 1000).toFixed(0)}K</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Spent: </span>
                    <span className="font-medium">${(dept.spent / 1000).toFixed(0)}K</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Remaining: </span>
                    <span className="font-medium">${(remaining / 1000).toFixed(0)}K</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Transactions: </span>
                    <span className="font-medium">{dept.transactions}</span>
                  </div>
                </div>

                <Progress value={utilizationRate} className="h-2" />

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Top Vendor: {dept.topVendor}</span>
                  <span>{utilizationRate.toFixed(1)}% utilized</span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
