import TransactionApproval from "@/components/transactions/transaction-approval"

export default function ApprovalsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <TransactionApproval />
      </div>
    </div>
  )
}
