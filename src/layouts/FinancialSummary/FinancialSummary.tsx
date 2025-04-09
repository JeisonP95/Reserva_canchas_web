import React from "react";
import { Transaction } from "../../types/financial";
import { formatCurrency } from "../../utils/format";

interface FinancialSummaryProps {
    transactions: Transaction[]
}

const FinancialSummary: React.FC<FinancialSummaryProps> = ({transactions}) => {
    const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

    const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + Math.abs(t.amount), 0)

    const balance = totalIncome - totalExpenses
    return (
        <div className="financial-summary">
            <div className="summary-card income">
                <h3>Ingresos Totales</h3>
                <p className="amount">{formatCurrency(totalIncome)}</p>
            </div>

            <div className="summary-card expenses">
                <h3>Egresos Totales</h3>
                <p className="amount">{formatCurrency(totalExpenses)}</p>
            </div>

            <div className="summary-card balance">
                <h3>Balance</h3>
                <p className={`amount ${balance >= 0 ? "positive" : "negative"}`}>{formatCurrency(balance)}</p>
            </div>
        </div>
    );
}

export default FinancialSummary;
