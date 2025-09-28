import { create } from 'zustand';
import axios from '../lib/axios';
import { ReactElement, ReactNode } from 'react';

export const useContext = create((set,get: any) => ({
    documentContent: '',
    isDragOver: false,
    splitPos: 50,
    inputMessage: '',
    isRecording: false,
    audioLevels: Array(20).fill(0),
    loading: false,
    messages: [
        {
            id: 1,
            role: 'assistant',
            content: 'Hello! I\'m here to help you understand this document. Ask me anything about the content you\'re reading.',
            timestamp: new Date()
          }
    ],

    saveFile: (file: string) => set({ documentContent : file }),

    setSplitPos: (splitPos: number) => set({ splitPos : splitPos }),

    setAudioLevels: (audio: number[]) => set({ audioLevels : audio }),

    setInputMessage: (inputMsg: string) => {
      set({ inputMessage : inputMsg });
    },
      

    handleFileUpload :  (file: Blob) => {
      console.log('gfgf');
        const reader = new FileReader();
        reader.onloadend =  async () => {
          const formData = new FormData()
          formData.append('document', file)
          const response = await axios.post('documents/upload' , formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          console.log(response.data.content)
          set({documentContent : response.data.content});
        };
        reader.readAsText(file);
    },

    handleDragOver : (e: any) => {
        e.preventDefault();
        set({isDragOver: true});
    },

    handleDragLeave: (e: any) => {
        e.preventDefault();
        set({isDragOver: false});
    },
    
    handleDrop: (e: any) => {
        e.preventDefault();
        set({isDragOver: false});
        const files: any = Array.from(e.dataTransfer.files);
        if (files.length > 0 && files[0].type === 'text/plain') {
          get().handleFileUpload(files[0]);
        }
    },

    handlePaste: (e: any) => {
        const pastedText = e.clipboardData.getData('text');
        if (pastedText) {
          set({documentContent : pastedText});
        }
    },

    handleSendMessage: async () => {

        const inputMsg = get().inputMessage

        const docContent = get().documentContent
        
        if (!inputMsg.trim()) return;

        const data = {
          "query" : inputMsg,
          "document" : docContent
        }

        
        
        const userMessage = {
          id: Date.now(),
          role: 'user',
          content: inputMsg,
          timestamp: new Date()
        };
        
        const prevMessages = get().messages
        
        set({ messages : [...prevMessages, userMessage]});
        set({ inputMessage: ''});
        set({ loading: true });
        
        const response = await axios.post("ai/chat", data)
        console.log(response)
        
        // Simulate AI response
        setTimeout(() => {
          const aiResponse = {
            id: Date.now() + 1,
            role: 'assistant',
            content: response.data.response,
            timestamp: new Date()
          };
          
        const prevMessages = get().messages

        set({ loading: false });
    
        set({ messages : [...prevMessages, aiResponse]});
        }, 1000);
      },

      handleVoiceToggle: () => {
        set({isRecording : !get().isRecording});
        // In real implementation, this would start/stop speech recognition
      },    
    
      handleKeyPress: (e: any) => {
          e.preventDefault();
          get().handleSendMessage();
      }


   
}))
