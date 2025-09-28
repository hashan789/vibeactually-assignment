"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useContext } from '../context/Conetxt';
import { MessageSquare, Mic, MicOff, Send } from 'lucide-react';

export default function RightPanel() {

    const { loading, saveFile , messages, inputMessage, setInputMessage, isRecording, splitPos, audioLevels, setAudioLevels, handleVoiceToggle, handleKeyPress, handleSendMessage } : any = useContext()

    const [time, setTime] = useState();
    console.log(messages);
      
      const chatEndRef = useRef<HTMLDivElement>(null);
    
      useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);
    

  return (
    <div 
          className="bg-white flex flex-col"
          style={{ width: `${100 - splitPos}%` }}
        >
          {/* Chat Header */}
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-medium text-gray-900">Discussion</h2>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Ask questions about the document content
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-scroll p-4 space-y-4 pb-[200px]">
            {messages.map((message: any) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="text-sm">{message.content}</div>
                  
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
            {
                      loading && <div className="">
                        <div className="mt-2 flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce200"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce400"></div>
                        </div>
                      </div>
                  }
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 fixed bottom-0 max-w-[100%] bg-white" style={{ width: `${100 - splitPos}%` }}>
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onClick={handleKeyPress}
                  placeholder="Ask about the document..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
        </div>
  )
}
