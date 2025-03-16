import React from 'react'
import { Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
} from 'chart.js'

import { Line } from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
)

function Chart() {
    const { incomes, expenses } = useGlobalContext()

    // Merge all unique dates from incomes and expenses
    const allDates = [...new Set([
        ...incomes.map(inc => inc.date),
        ...expenses.map(exp => exp.date)
    ])].sort((a, b) => new Date(a) - new Date(b));

    // Ensure data points align correctly with the x-axis labels
    const incomeData = allDates.map(date => {
        
        const income = incomes.find(inc => inc.date === date);
        return income ? income.amount : 0; // Use 0 if no income on that date
    });

    const expenseData = allDates.map(date => {
        const expense = expenses.find(exp => exp.date === date);
        return expense ? expense.amount : 0; // Use 0 if no expense on that date
    });

    const data = {
        labels: allDates.map(date => dateFormat(date)), // X-axis dates
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                borderColor: 'rgba(0, 128, 0, 0.8)',
                backgroundColor: 'rgba(0, 98, 0, 0.3)',
                pointBackgroundColor: '#008000',
                borderWidth: 2,
                pointRadius: 5,
                fill: true,
                tension: 0.4
            },
            {
                label: 'Expenses',
                data: expenseData,
                borderColor: 'rgba(255, 0, 0, 0.8)',
                backgroundColor: 'rgba(163, 0, 0, 0.3)',
                pointBackgroundColor: '#ff0000',
                borderWidth: 2,
                pointRadius: 5,
                fill: true,
                tension: 0.4
            }
        ]
    }

    return (
        <ChartStyled>
            <Line data={data} />
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #fff;
    border: 2px solid #ff00ff;
    box-shadow: 0px 0px 15px rgba(255, 0, 255, 0.6);
    padding: 1.5rem;
    border-radius: 12px;
    height: 100%;
    
    canvas {
        max-width: 100%;
        height: auto !important;
    }
`;

export default Chart
