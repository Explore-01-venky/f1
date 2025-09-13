import TransactionAnalytics from "@/components/transactions/transaction-analytics"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into spending patterns and trends</p>
        </div>
        <TransactionAnalytics />
      </div>
    </div>
  )
}
