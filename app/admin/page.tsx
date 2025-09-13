import { AdminHeader } from "@/components/admin/admin-header"
import { AdminStats } from "@/components/admin/admin-stats"
import { UserManagement } from "@/components/admin/user-management"
import { BudgetControls } from "@/components/admin/budget-controls"
import { SystemSettings } from "@/components/admin/system-settings"
import { AuditLog } from "@/components/admin/audit-log"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <AdminHeader />
        <AdminStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <UserManagement />
          <BudgetControls />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SystemSettings />
          <AuditLog />
        </div>
      </main>
    </div>
  )
}
