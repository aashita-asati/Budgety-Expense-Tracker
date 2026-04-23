import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
} from "recharts" ;
import CustomToolTip from './CustomToolTip';
import CustomLegend from './CustomLegend';
const CustomPieChart = ({data, label, totalAmount, colors,showTextAnchor}) => {
  return (
   <ResponsiveContainer width="100%" height={380}>
    <PieChart>
        <Pie
        data={data}
        dataKey="amount"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={130}
        innerRadius={100}
        labelLine={false}
        >
            {data.map((entry,index)=>(
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
            ))}
        </Pie>
        <Tooltip content={<CustomToolTip />} />
        <Legend content={<CustomLegend />} />
        {showTextAnchor && (
            <>
            <text
            x="50%"
            y="45%"
            textAnchor="middle"
            fill="#666"
            fontSize="14px">
                {label}</text>
                <text
                x="50%"
                y="55%"
                dy={8}
                textAnchor="middle"
                fill="#333"
                fontSize="42px"
                fontWeight="semi-bold"
                >{totalAmount}</text>
            </>
        )}
    </PieChart>
   </ResponsiveContainer>
  )
}

export default CustomPieChart
