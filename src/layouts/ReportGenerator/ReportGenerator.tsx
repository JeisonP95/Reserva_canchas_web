import React, { useState } from 'react';
import { Transaction } from '../../types/financial';
import { formatCurrency, formatDate } from '../../utils/format';
import CustomButton from '../../components/Buttons/CustomButton';
import { useNavigate } from 'react-router-dom';

interface ReportGeneratorProps {
    transactions: Transaction[]
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ transactions }) => {

    const navigate = useNavigate()

    const [reportType, setReportType] = useState("summary")

    const generateReport = () => {
        if (transactions.length === 0) {
            alert("No hay datos para generar un reporte")
            return
        }

        if (reportType === "summary") {
            generateSummaryReport()
        } else if (reportType === "detailed") {
            generateDetailedReport()
        }
    }

    const generateSummaryReport = () => {
        const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

        const totalExpenses = transactions
            .filter((t) => t.type === "expense")
            .reduce((sum, t) => sum + Math.abs(t.amount), 0)

        const balance = totalIncome - totalExpenses

        const reportContent = `
      REPORTE FINANCIERO RESUMIDO
      Fecha de generación: ${formatDate(new Date())}
      
      Total de Ingresos: ${formatCurrency(totalIncome)}
      Total de Egresos: ${formatCurrency(totalExpenses)}
      Balance: ${formatCurrency(balance)}
      
      Número de transacciones: ${transactions.length}
    `

        downloadReport(reportContent, "reporte-resumido.txt")
    }

    const generateDetailedReport = () => {


        let reportContent = `
          REPORTE FINANCIERO DETALLADO
          Fecha de generación: ${formatDate(new Date())}
          
          TRANSACCIONES:
          
        `

        transactions.forEach((t) => {
            reportContent += `
            Fecha: ${formatDate(t.date)}
            Descripción: ${t.description}
            Tipo: ${t.type === "income" ? "Ingreso" : "Egreso"}
            Monto: ${formatCurrency(Math.abs(t.amount))}
            -----------------------------------
          `
        })

        const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

        const totalExpenses = transactions
            .filter((t) => t.type === "expense")
            .reduce((sum, t) => sum + Math.abs(t.amount), 0)

        const balance = totalIncome - totalExpenses

        reportContent += `
      RESUMEN:
      Total de Ingresos: ${formatCurrency(totalIncome)}
      Total de Egresos: ${formatCurrency(totalExpenses)}
      Balance: ${formatCurrency(balance)}
    `

        downloadReport(reportContent, "reporte-detallado.txt")
    }

    const downloadReport = (content: string, filename: string) => {
        const element = document.createElement("a")
        const file = new Blob([content], { type: "text/plain" })
        element.href = URL.createObjectURL(file)
        element.download = filename
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    return (
        <div className="report-generator">
            <h3>Generar Reporte</h3>

            <div className="report-controls">
                <select value={reportType} onChange={(e) => setReportType(e.target.value)} className="report-select">
                    <option value="summary">Reporte Resumido</option>
                    <option value="detailed">Reporte Detallado</option>
                </select>

                <button className="generate-button" onClick={generateReport}>
                    Generar Reporte
                </button>
                <button className="back-button" onClick={() => navigate("/home")}>
                    Volver a Inicio
                </button>                
            </div>
        </div>
    );
}

export default ReportGenerator;