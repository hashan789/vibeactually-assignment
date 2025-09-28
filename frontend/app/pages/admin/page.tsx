"use client"
import { useAnalytics } from '../../context/Analytics'
import React, { useEffect, useState } from 'react'
import '../../lib/chartjs'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function DashBoard() {

  const { noOfQuestions, noOfWords, queries, dailyTokens, fetchAnalytics } : any = useAnalytics();


  console.log(dailyTokens, 'dailyTokens')

  const [chartData, setChartData] = useState({
    labels: [],
    datasets : [{
      label: '',
      data: [],
      backgroundColor: ''
    }]
  })

  useEffect(() => {
    fetchAnalytics();

    setChartData({
        labels: dailyTokens.map((d: any) => d.updatedDate),
        datasets: [
          {
            label: 'Documents Ingested per Day',
            data: dailyTokens.map((d: any) => d.totalTokens),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          }
        ],
      });
  }, [])



  return (
    <div className='font-sans container mx-auto my-auto mt-5'>
      <h1 className='text-[30px] font-bold text-blue-700'>Admin Dashboard</h1>

      <p className='mt-5 text-[14.5px]'>Welcome to the admin dashboard. Here you can manage users, view analytics, and configure settings.</p>

      <div className="flex justify-center items-center gap-20 mt-10">
        <div className="p-5 border-gray-300 border rounded-lg flex justify-center items-center gap-5">
          <h2>No Of Qusetions</h2>
          <h5 className='w-14 h-14 bg-blue-400 rounded-full text-white flex justify-center items-center'>
            {noOfQuestions}
          </h5>
        </div>
        <div className="p-5 border-gray-300 border rounded-lg flex justify-center items-center gap-5">
          <h2>No Of Tokens Used</h2>
          <h5 className='w-14 h-14 bg-blue-500 rounded-full text-white flex justify-center items-center'>
            {noOfWords}
          </h5>
        </div>
      </div>

      <div className="w-full h-96 p-4 mb-5">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Total Tokens by Date</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={dailyTokens}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 25,
          }}
        >
          
          <XAxis 
            dataKey="updatedDate" 
            tick={{ fontSize: 12 }}
            label={{ value: 'Updated Date', position: 'insideBottom', offset: -10 }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            label={{ value: 'Total Tokens', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '4px'
            }}
            formatter={(value, name) => [value, 'Total Tokens']}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Bar 
            dataKey="totalTokens" 
            fill="#3b82f6" 
            radius={[4, 4, 0, 0]}
            barSize={100}
            xlinkShow='false'
          />
        </BarChart>
      </ResponsiveContainer>
    </div>

      <div className="p-5 border-gray-300 border rounded-lg my-20">
          <h2 className='text-[25px] font-semibold'>Common questions</h2>
          <div className="">
            {
              queries.map((query: any, index: number) => (
                  <div key={index} className="mt-2">
                     {index + 1}. {query}
                  </div>
              ))
            }
          </div>
      </div>


    </div>
  )
}
