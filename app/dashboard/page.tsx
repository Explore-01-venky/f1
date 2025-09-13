import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { BudgetOverview } from "@/components/dashboard/budget-overview"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { DepartmentBreakdown } from "@/components/dashboard/department-breakdown"
import { SearchAndFilter } from "@/components/dashboard/search-and-filter"
import { AIAssistant } from "@/components/dashboard/ai-assistant"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Financial Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Transparent view of institutional finances</p>
        </div>

        <SearchAndFilter />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <BudgetOverview />
          </div>
          <div>
            <AIAssistant />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentTransactions />
          <DepartmentBreakdown />
        </div>
      </main>
    </div>
  )
}
