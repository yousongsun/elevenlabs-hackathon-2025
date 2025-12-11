'use client';

import React from 'react';
import { Sidebar } from './components/Sidebar';
import { PreviewModal } from './components/PreviewModal';
import { VoiceIndicator } from './components/VoiceIndicator';
import { useJamie } from './hooks/useJamie';

export default function Home() {
  const {
    isListening,
    toggleListening,
    transcript,
    relevantFiles,
    activeFile,
    closeFile,
    openFile,
    messages
  } = useJamie();

  return (
    <div className="flex h-screen bg-zinc-100 dark:bg-black overflow-hidden font-sans text-zinc-900 dark:text-zinc-100">
      
      {/* Main Content Area - Mock Meeting */}
      <div className="flex-1 flex flex-col relative">
        <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 bg-white dark:bg-zinc-900">
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
               J
             </div>
             <h1 className="text-xl font-bold">Jamie <span className="text-zinc-400 font-normal">AI Meeting Assistant</span></h1>
          </div>
          <div className="text-sm text-zinc-500">
            Q4 Product Strategy Sync
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto relative">
           {/* Mock Video Grid */}
           <div className="grid grid-cols-2 gap-4 h-[60%]">
              <div className="bg-zinc-200 dark:bg-zinc-800 rounded-xl flex items-center justify-center relative overflow-hidden group">
                  <span className="text-zinc-500 font-medium">Speaker 1 (CEO)</span>
                  <div className="absolute bottom-4 left-4 bg-black/50 px-2 py-1 rounded text-xs text-white">Talking</div>
              </div>
              <div className="bg-zinc-200 dark:bg-zinc-800 rounded-xl flex items-center justify-center">
                  <span className="text-zinc-500 font-medium">Speaker 2 (Product)</span>
              </div>
              <div className="bg-zinc-200 dark:bg-zinc-800 rounded-xl flex items-center justify-center">
                   <span className="text-zinc-500 font-medium">Speaker 3 (Eng)</span>
              </div>
              <div className="bg-zinc-200 dark:bg-zinc-800 rounded-xl flex items-center justify-center">
                   <span className="text-zinc-500 font-medium">You</span>
              </div>
           </div>

           {/* Transcript / Log Area */}
           <div className="mt-6 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 min-h-[200px]">
              <h3 className="text-xs font-semibold uppercase text-zinc-400 mb-2">Live Transcript</h3>
              <p className="text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap">
                {transcript || "Waiting for conversation..."}
              </p>
           </div>
           
           {/* Interaction Messages */}
            <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                <div className="flex flex-col gap-2 items-start">
                    {messages.map((msg, i) => (
                        <div key={i} className={`p-3 rounded-lg max-w-md shadow-lg backdrop-blur-md ${msg.role === 'assistant' ? 'bg-blue-600/90 text-white self-start' : 'bg-zinc-800/80 text-white self-end'}`}>
                            {msg.content}
                        </div>
                    ))}
                </div>
            </div>
        </main>

        {/* Control Bar */}
        <div className="h-20 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center gap-8">
            <button className="p-3 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                {/* Mute Icon */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            </button>
            
            <VoiceIndicator 
              isListening={isListening} 
              isSpeaking={false} // Todo: Add speaking state
              onClick={toggleListening} 
            />

             <button className="p-3 rounded-full bg-red-100 text-red-600 hover:bg-red-200">
                {/* End Call Icon */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" /></svg>
            </button>
        </div>
      </div>

      {/* Relevant Cloud Sidebar */}
      <Sidebar 
        files={relevantFiles} 
        onFileClick={openFile} 
      />

      {/* Preview Modal */}
      <PreviewModal 
        file={activeFile} 
        onClose={closeFile} 
      />
    </div>
  );
}
