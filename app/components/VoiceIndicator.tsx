'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface VoiceIndicatorProps {
  isListening: boolean;
  isSpeaking: boolean;
  onClick: () => void;
}

export const VoiceIndicator: React.FC<VoiceIndicatorProps> = ({ isListening, isSpeaking, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center w-16 h-16 rounded-full transition-colors ${
        isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-zinc-800 hover:bg-zinc-700'
      }`}
    >
      {isListening && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute inset-0 bg-red-500 rounded-full opacity-30"
        />
      )}
      
      {/* Mic Icon or Waveform */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-8 h-8 ${isListening ? 'text-white' : 'text-zinc-400'}`}
      >
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    </button>
  );
};

