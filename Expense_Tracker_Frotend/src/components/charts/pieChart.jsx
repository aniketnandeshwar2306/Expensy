import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

import React from 'react'

const PieChartComponent = ({ transactions }) => {

    const data = Array.isArray(transactions) ? transactions : [];
    const expenses = data.filter(t => !t.is_income);

    if (expenses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 py-6">
                <span className="text-2xl mb-1">📊</span>
                <p className="text-xs">No expense data to display</p>
            </div>
        );
    }

    const totals = {};

    expenses.forEach(transaction => {
        totals[transaction.category] =
            (totals[transaction.category] || 0) + transaction.amount;
    });

    const pieData = Object.entries(totals).map(([name, value]) => ({
        name,
        value
    }));

    const COLORS = ['#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];

    return (
        <div style={{ width: '100%', height: '220px', maxWidth: '350px', margin: '0 auto' }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={pieData}
                        nameKey="name"
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={50}
                        label
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )

}
export default PieChartComponent
