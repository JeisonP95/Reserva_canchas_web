import React, { useEffect, useState } from "react";
import FinancialSummary from "../FinancialSummary/FinancialSummary";
import { FilterOptions, Transaction } from "../../types/financial";
import FilterControls from "../FilterControls/FilterControls";
import ReportGenerator from "../ReportGenerator/ReportGenerator";
import TransactionsTable from "../TransactionsTable/TransactionsTable";


const FinancialDashboard: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
    const [filters, setFilters] = useState<FilterOptions>({
        startDate: null,
        endDate: null,
        type: "all",
        minAmount: "",
        maxAmount: "",
    })

    // Simulated data - in a real app, this would come from an API
    useEffect(() => {
        const demoTransactions: Transaction[] = [
            { id: 1, date: new Date("2023-04-01"), description: "Reserva Cancha 1", amount: 50000, type: "income" },
            { id: 2, date: new Date("2023-04-02"), description: "Reserva Cancha 2", amount: 45000, type: "income" },
            { id: 3, date: new Date("2023-04-03"), description: "Mantenimiento", amount: -15000, type: "expense" },
            { id: 4, date: new Date("2023-04-05"), description: "Reserva Cancha 3", amount: 50000, type: "income" },
            { id: 5, date: new Date("2023-04-07"), description: "Pago servicios", amount: -25000, type: "expense" },
            { id: 6, date: new Date("2023-04-08"), description: "Reserva Cancha 1", amount: 50000, type: "income" },
            { id: 7, date: new Date("2023-04-10"), description: "Compra balones", amount: -30000, type: "expense" },
            { id: 8, date: new Date("2023-04-12"), description: "Reserva Cancha 2", amount: 45000, type: "income" },
            { id: 9, date: new Date("2023-04-15"), description: "Reserva Cancha 3", amount: 50000, type: "income" },
            { id: 10, date: new Date("2023-04-18"), description: "Limpieza", amount: -10000, type: "expense" },
        ]

        setTransactions(demoTransactions)
        setFilteredTransactions(demoTransactions)
    }, [])

    // Apply filters when they change
    useEffect(() => {
        let result = [...transactions]

        if (filters.startDate) {
            result = result.filter((t) => t.date >= filters.startDate!)
        }

        if (filters.endDate) {
            result = result.filter((t) => t.date <= filters.endDate!)
        }

        if (filters.type !== "all") {
            result = result.filter((t) => t.type === filters.type)
        }

        if (filters.minAmount) {
            const min = Number.parseFloat(filters.minAmount)
            result = result.filter((t) => Math.abs(t.amount) >= min)
        }

        if (filters.maxAmount) {
            const max = Number.parseFloat(filters.maxAmount)
            result = result.filter((t) => Math.abs(t.amount) <= max)
        }

        setFilteredTransactions(result)
    }, [filters, transactions])

    const handleFilterChange = (newFilters: FilterOptions) => {
        setFilters(newFilters)
      }
    
      const addTransaction = (transaction: Omit<Transaction, "id">) => {
        const newTransaction = {
          ...transaction,
          id: transactions.length + 1,
        }
        setTransactions([...transactions, newTransaction])
      }

    return (
        <div className="financial-dashboard">
            <h1 className="dashboard-title">Panel de Gestión Financiera</h1>

            <FinancialSummary transactions={filteredTransactions} />

            <div className="dashboard-controls">
                <FilterControls filters={filters} onFilterChange={handleFilterChange} />
                <ReportGenerator transactions={filteredTransactions} />
            </div>

            <TransactionsTable transactions={filteredTransactions} onAddTransaction={addTransaction} />
        </div>
    );
}

export default FinancialDashboard;