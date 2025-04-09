export interface Transaction {
    id: number
    date: Date
    description: string
    amount: number // positive for income, negative for expense
    type: "income" | "expense"
  }
  
  export interface FilterOptions {
    startDate: Date | null
    endDate: Date | null
    type: "all" | "income" | "expense"
    minAmount: string
    maxAmount: string
  }
  
  