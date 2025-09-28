"use client";

import React, { useRef, useEffect } from 'react';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';
import { useContext } from '../context/Conetxt';
import { FileText } from 'lucide-react';

const LearningAssistant = () => {
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  const { messages, splitPos, setSplitPos }: any = useContext();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

 
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-900">Services Assistant</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Panel - Document Viewer */}
        <LeftPanel />

        {/* Resize Handle */}
        <div
          ref={resizeRef}
          className="w-1 bg-gray-300 cursor-col-resize hover:bg-gray-400 transition-colors"
          onMouseDown={(e) => {
            const startX = e.clientX;
            const startSplit = splitPos;
            
            const handleMouseMove = (e: any) => {
              const diff = ((e.clientX - startX) / window.innerWidth) * 100;
              const newSplit = Math.max(20, Math.min(80, startSplit + diff));
              setSplitPos(newSplit);
            };
            
            const handleMouseUp = () => {
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };
            
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }}
        />

        {/* Right Panel - Chat Interface */}
        <RightPanel />
      </div>
    </div>
  );
};

export default LearningAssistant;