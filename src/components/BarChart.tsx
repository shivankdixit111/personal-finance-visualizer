'use client'

import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

const colors = ['#1F1F1F', '#2E8B57', '#4B0082', '#800000', '#2F4F4F', '#3B3B98', '#8B0000', '#5D3FD3', '#4B5320', '#483D8B', '#6B4226', '#2C3E50'];

const getPath = (x:number, y: number, width:number, height:number) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props: any) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export default function Monthly_Expenses_Bar({fullMonth}: {fullMonth: {month:string, value:number}[]}) { 
  console.log('bar char ' , fullMonth)
  
  return (
    <BarChart
      width={1000}
      height={500}
      data={fullMonth}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis 
        domain={[0, 'auto']}
        tickFormatter={(value)=> `₹${(value/1000).toFixed(1)}K`}
      />
      <Bar dataKey="value" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {fullMonth.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
  );
}


