"use client";
import React, { useEffect, useRef } from 'react'
import { useContext } from '../context/Conetxt';
import { FileText } from 'lucide-react';

export default function LeftPanel() {

  const { saveFile, splitPos, documentContent, isDragOver, handleFileUpload, handleDragOver, handleDragLeave, handlePaste, handleDrop } : any = useContext()  

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div 
    className="bg-white border-r border-gray-200 overflow-hidden"
    style={{ width: `${splitPos}%` }}
  >
    <div className="h-full flex flex-col">
      {/* Document Header */}
      <div className="border-b border-gray-200 p-4 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-medium text-gray-900">Document</h2>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
          >
            Upload File
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Drop a text file, paste content (Ctrl+V), or upload a document
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.md"
          name='document'
          onChange={(e : any) => e.target.files[0] && handleFileUpload(e.target.files[0])}
          className="hidden"
        />
      </div>

      {/* Document Content */}
      <div 
        className={`flex-1 overflow-y-auto ${isDragOver ? 'bg-blue-50 border-2 border-dashed border-blue-300' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onPaste={handlePaste}
        tabIndex={0}
      >
        {documentContent ? (
          <div className="p-6 h-screen">
            <div className="prose prose-gray max-w-none">
              {documentContent.split('\n').map((line: any, index: any) => {
                if (line.startsWith('# ')) {
                  return (
                    <h1 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">
                      {line.substring(2)}
                    </h1>
                  );
                } else if (line.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                      {line.substring(3)}
                    </h2>
                  );
                } else if (line.startsWith('**') && line.endsWith('**')) {
                  return (
                    <p key={index} className="font-semibold text-gray-900 mb-2">
                      {line.substring(2, line.length - 2)}
                    </p>
                  );
                } else if (line.startsWith('- ')) {
                  return (
                    <li key={index} className="text-gray-700 mb-1 ml-4">
                      {line.substring(2)}
                    </li>
                  );
                } else if (line.trim() === '') {
                  return <div key={index} className="h-4" />;
                } else {
                  return (
                    <p key={index} className="text-gray-700 leading-relaxed mb-4 text-justify">
                      {line}
                    </p>
                  );
                }
              })}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No document loaded</h3>
              <p className="text-gray-500 mb-4">
                Drop a text file here, paste content, or click upload
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Choose File
              </button>
            </div>
          </div>
        )}
        
        {isDragOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-blue-50 bg-opacity-90">
            <div className="text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-blue-500" />
              <p className="text-lg font-medium text-blue-700">Drop your document here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  )
}
