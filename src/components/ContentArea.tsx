// components/ContentArea.tsx
import React from 'react';
import type { Tab } from '../types';

interface ContentAreaProps {
  currentTab: Tab | undefined;
  onContentChange: (value: string) => void;
}

export const ContentArea: React.FC<ContentAreaProps> = ({ currentTab, onContentChange }) => {
  return (
    <div className="flex-1 p-6">
      {currentTab && (
        <div className="max-w-4xl mx-auto">
          <textarea
            value={currentTab.content}
            onChange={(e) => onContentChange(e.target.value)}
            className="w-full h-96 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Start writing your content here..."
          />
        </div>
      )}
    </div>
  );
};