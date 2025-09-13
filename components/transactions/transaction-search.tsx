"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Search, CalendarIcon, Download, X, SlidersHorizontal } from "lucide-react"
import { format } from "date-fns"

export function TransactionSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [department, setDepartment] = useState("all")
  const [transactionType, setTransactionType] = useState("all")
  const [status, setStatus] = useState("all")
  const [amountRange, setAmountRange] = useState("all")
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleFilterChange = (filterType: string, value: string) => {
    if (value && !activeFilters.includes(filterType)) {
      setActiveFilters([...activeFilters, filterType])
    } else if (!value && activeFilters.includes(filterType)) {
      setActiveFilters(activeFilters.filter((f) => f !== filterType))
    }
  }

  const clearFilter = (filterType: string) => {
    switch (filterType) {
      case "department":
        setDepartment("")
        break
      case "type":
        setTransactionType("")
        break
      case "status":
        setStatus("")
        break
      case "amount":
        setAmountRange("")
        break
      case "date":
        setDateFrom(undefined)
        setDateTo(undefined)
        break
    }
    setActiveFilters(activeFilters.filter((f) => f !== filterType))
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setDepartment("")
    setTransactionType("")
    setStatus("")
    setAmountRange("")
    setDateFrom(undefined)
    setDateTo(undefined)
    setActiveFilters([])
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by vendor, description, transaction ID, or amount..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Advanced
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Select
              value={department}
              onValueChange={(value) => {
                setDepartment(value)
                handleFilterChange("department", value)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="academics">Academics</SelectItem>
                <SelectItem value="administration">Administration</SelectItem>
                <SelectItem value="facilities">Facilities</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="student-services">Student Services</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={transactionType}
              onValueChange={(value) => {
                setTransactionType(value)
                handleFilterChange("type", value)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={status}
              onValueChange={(value) => {
                setStatus(value)
                handleFilterChange("status", value)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={amountRange}
              onValueChange={(value) => {
                setAmountRange(value)
                handleFilterChange("amount", value)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Amount Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Amounts</SelectItem>
                <SelectItem value="0-1000">$0 - $1,000</SelectItem>
                <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                <SelectItem value="5000-25000">$5,000 - $25,000</SelectItem>
                <SelectItem value="25000+">$25,000+</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? (
                    dateTo ? (
                      <>
                        {format(dateFrom, "LLL dd")} - {format(dateTo, "LLL dd")}
                      </>
                    ) : (
                      format(dateFrom, "LLL dd, y")
                    )
                  ) : (
                    <span>Date Range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateFrom}
                  selected={{ from: dateFrom, to: dateTo }}
                  onSelect={(range) => {
                    setDateFrom(range?.from)
                    setDateTo(range?.to)
                    if (range?.from || range?.to) {
                      handleFilterChange("date", "selected")
                    }
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500">Active filters:</span>
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                  {filter === "department" && `Dept: ${department}`}
                  {filter === "type" && `Type: ${transactionType}`}
                  {filter === "status" && `Status: ${status}`}
                  {filter === "amount" && `Amount: ${amountRange}`}
                  {filter === "date" && "Date Range"}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter(filter)} />
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
                Clear All
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
