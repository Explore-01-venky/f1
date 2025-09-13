"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Eye, Download } from "lucide-react"

const auditLogs = [
  {
    id: "1",
    timestamp: "2024-01-15T14:30:00Z",
    user: "John Smith",
    action: "Budget Modified",
    details: "Updated Technology department budget from $550K to $600K",
    severity: "medium",
    ipAddress: "192.168.1.100",
  },
  {
    id: "2",
    timestamp: "2024-01-15T13:15:00Z",
    user: "Sarah Johnson",
    action: "User Created",
    details: "Created new user account for Lisa Davis",
    severity: "low",
    ipAddress: "192.168.1.101",
  },
  {
    id: "3",
    timestamp: "2024-01-15T12:45:00Z",
    user: "System",
    action: "Backup Completed",
    details: "Daily system backup completed successfully",
    severity: "low",
    ipAddress: "localhost",
  },
  {
    id: "4",
    timestamp: "2024-01-15T11:20:00Z",
    user: "Dr. Wilson",
    action: "Transaction Approved",
    details: "Approved research equipment purchase for $45,000",
    severity: "high",
    ipAddress: "192.168.1.102",
  },
  {
    id: "5",
    timestamp: "2024-01-15T10:30:00Z",
    user: "Michael Brown",
    action: "Login Failed",
    details: "Failed login attempt - incorrect password",
    severity: "medium",
    ipAddress: "192.168.1.103",
  },
]

export function AuditLog() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Audit Log</CardTitle>
            <CardDescription>Recent system activities and changes</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {log.user === "System"
                    ? "SYS"
                    : log.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{log.action}</span>
                  <Badge variant={getSeverityColor(log.severity)}>{log.severity}</Badge>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{log.details}</p>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>By: {log.user}</span>
                  <span>IP: {log.ipAddress}</span>
                  <span>{new Date(log.timestamp).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
