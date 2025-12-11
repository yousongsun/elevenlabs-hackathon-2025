'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MockFile } from '../data/mockFiles';
import { X, ExternalLink } from 'lucide-react';

interface PreviewModalProps {
  file: MockFile | null;
  onClose: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ file, onClose }) => {
  if (!file) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-zinc-900 w-full max-w-4xl h-[80vh] rounded-xl shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {file.name}
            </h2>
            <span className="px-2 py-0.5 text-xs rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 capitalize">
              {file.type}
            </span>
          </div>
          <div className="flex items-center gap-2">
             <button className="p-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <ExternalLink className="w-5 h-5" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 p-8 overflow-y-auto bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center">
            {/* Mock Content Preview */}
            <div className="bg-white dark:bg-white text-black p-12 shadow-lg min-h-[60vh] w-full max-w-3xl rounded-sm">
                <h1 className="text-3xl font-bold mb-6">{file.name}</h1>
                <div className="space-y-4">
                    <p className="text-lg font-medium text-gray-700">Executive Summary</p>
                    <p className="text-gray-600 leading-relaxed">
                        {file.summary}
                    </p>
                    <hr className="my-6 border-gray-200"/>
                    <div className="h-64 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                        [Preview Content for {file.type}]
                    </div>
                    <p className="text-gray-600 mt-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

