"use client"
import { useAnalytics } from '../../context/Analytics'
import React, { useEffect } from 'react'

export default function DashBoard() {

  const { noOfQuestions, noOfWords, queries, fetchAnalytics } : any = useAnalytics();

  useEffect(() => {
    fetchAnalytics();
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

      <div className="p-5 border-gray-300 border rounded-lg mt-5">
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
