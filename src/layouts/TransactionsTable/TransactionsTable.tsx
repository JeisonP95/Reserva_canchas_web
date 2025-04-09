import React, { useState } from "react";
import { Transaction } from "../../types/financial";
import { formatCurrency, formatDate } from "../../utils/format";

interface TransactionsTableProps {
    transactions: Transaction[]
    onAddTransaction: (transaction: Omit<Transaction, "id">) => void
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, onAddTransaction }) => {

    const [showForm, setShowForm] = useState(false)
    const [newTransaction, setNewTransaction] = useState({
        description: "",
        amount: "",
        type: "income",
        date: new Date().toISOString().split("T")[0],
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setNewTransaction({
            ...newTransaction,
            [name]: value,
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const amount = Number.parseFloat(newTransaction.amount)
        if (isNaN(amount) || amount <= 0) {
            alert("Por favor ingrese un monto válido")
            return
        }

        onAddTransaction({
            description: newTransaction.description,
            amount: newTransaction.type === "income" ? amount : -amount,
            type: newTransaction.type as "income" | "expense",
            date: new Date(newTransaction.date),
        })

        // Reset form
        setNewTransaction({
            description: "",
            amount: "",
            type: "income",
            date: new Date().toISOString().split("T")[0],
        })
        setShowForm(false)
    }
    return (
        <div className="transactions-container">
            <div className="transactions-header">
                <h2>Movimientos Financieros</h2>
                <button className="add-button" onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Cancelar" : "Agregar Movimiento"}
                </button>
            </div>

            {showForm && (
                <form className="transaction-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="description">Descripción</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={newTransaction.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="amount">Monto</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={newTransaction.amount}
                            onChange={handleInputChange}
                            min="0"
                            step="1000"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Tipo</label>
                        <select id="type" name="type" value={newTransaction.type} onChange={handleInputChange}>
                            <option value="income">Ingreso</option>
                            <option value="expense">Egreso</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Fecha</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={newTransaction.date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Guardar
                    </button>
                </form>
            )}

            <div className="transactions-table-wrapper">
                <table className="transactions-table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Descripción</th>
                            <th>Tipo</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="no-data">
                                    No hay movimientos para mostrar
                                </td>
                            </tr>
                        ) : (
                            transactions.map((transaction) => (
                                <tr key={transaction.id} className={transaction.type}>
                                    <td>{formatDate(transaction.date)}</td>
                                    <td>{transaction.description}</td>
                                    <td>{transaction.type === "income" ? "Ingreso" : "Egreso"}</td>
                                    <td className={transaction.type === "income" ? "positive" : "negative"}>
                                        {formatCurrency(Math.abs(transaction.amount))}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TransactionsTable;
