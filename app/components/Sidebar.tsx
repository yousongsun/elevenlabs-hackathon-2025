'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MockFile } from '../data/mockFiles';
import { FileText, BarChart, Presentation, Mail, MessageSquare, File } from 'lucide-react';

interface SidebarProps {
  files: MockFile[];
  onFileClick: (file: MockFile) => void;
}

const getIcon = (type: MockFile['type']) => {
  switch (type) {
    case 'spreadsheet': return <BarChart className="w-5 h-5 text-green-500" />;
    case 'deck': return <Presentation className="w-5 h-5 text-orange-500" />;
    case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
    case 'email': return <Mail className="w-5 h-5 text-blue-500" />;
    case 'slack': return <MessageSquare className="w-5 h-5 text-purple-500" />;
    default: return <File className="w-5 h-5 text-gray-500" />;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({ files, onFileClick }) => {
  return (
    <div className="w-80 h-full bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-4 flex flex-col shadow-xl z-10">
      <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
        Relevant Cloud
      </h2>
      <div className="flex-1 overflow-y-auto space-y-3">
        <AnimatePresence>
          {files.map((file) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-3 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onFileClick(file)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">{getIcon(file.type)}</div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{file.name}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                    {file.summary}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {files.length === 0 && (
          <div className="text-center text-zinc-400 text-sm mt-10">
            Listening for context...
          </div>
        )}
      </div>
    </div>
  );
};

