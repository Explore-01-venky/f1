import { TransactionSearch } from "@/components/transactions/transaction-search"
import { TransactionTable } from "@/components/transactions/transaction-table"
import { TransactionStats } from "@/components/transactions/transaction-stats"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Transaction Management</h1>
          <p className="text-gray-600 dark:text-gray-300">Search, filter, and analyze all financial transactions</p>
        </div>

        <TransactionStats />
        <TransactionSearch />
        <TransactionTable />
      </main>
    </div>
  )
}
