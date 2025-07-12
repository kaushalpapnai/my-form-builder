// components/TabBar.tsx
import React from 'react';
import { Plus, MoreVertical } from 'lucide-react';
import type { Tab } from '../types';

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabClick: (tabId: string) => void;
  onTabHover: (tabId: string) => void;
  onTabLeave: () => void;
  onMenuClick: (tabId: string, event: React.MouseEvent) => void;
  onAddTab: (insertIndex?: number) => void;
  onDragStart: (e: React.DragEvent, tabId: string) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  dragOverIndex: number | null;
  isRenaming: string | null;
  renameValue: string;
  onRenameChange: (value: string) => void;
  onRenameSubmit: (tabId: string) => void;
  onKeyDown: (e: React.KeyboardEvent, tabId: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabClick,
  onTabHover,
  onTabLeave,
  onMenuClick,
  onAddTab,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  dragOverIndex,
  isRenaming,
  renameValue,
  onRenameChange,
  onRenameSubmit,
  onKeyDown,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center">
      {/* Scrollable tabs container */}
      <div className="flex-1 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-1 w-max">
          {tabs.map((tab, index) => (
            <React.Fragment key={tab.id}>
              {index > 0 && (
                <button
                  onClick={() => onAddTab(index)}
                  className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                >
                  <Plus size={12} />
                </button>
              )}
              
              <div
                className={`flex-shrink-0 relative flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors ${
                  tab.id === activeTab
                    ? 'bg-orange-100 text-orange-600 border border-orange-200'
                    : tab.state === 'hover'
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-transparent text-gray-600 hover:bg-gray-50'
                } ${dragOverIndex === index ? 'border-l-2 border-blue-500' : ''}`}
                onClick={() => onTabClick(tab.id)}
                onMouseEnter={() => tab.id !== activeTab && onTabHover(tab.id)}
                onMouseLeave={onTabLeave}
                draggable
                onDragStart={(e) => onDragStart(e, tab.id)}
                onDragOver={(e) => onDragOver(e, index)}
                onDragLeave={onDragLeave}
                onDrop={(e) => onDrop(e, index)}
              >
                {tab.icon}
                {isRenaming === tab.id ? (
                  <input
                    type="text"
                    value={renameValue}
                    onChange={(e) => onRenameChange(e.target.value)}
                    onBlur={() => onRenameSubmit(tab.id)}
                    onKeyDown={(e) => onKeyDown(e, tab.id)}
                    className="bg-transparent outline-none border-b border-orange-300 text-sm min-w-0 flex-1"
                    autoFocus
                  />
                ) : (
                  <span className="text-sm font-medium whitespace-nowrap">{tab.name}</span>
                )}
                
                {tab.id === activeTab && (
                  <button
                    onClick={(e) => onMenuClick(tab.id, e)}
                    className="p-1 hover:bg-orange-200 rounded transition-colors"
                  >
                    <MoreVertical size={12} />
                  </button>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Fixed "Add page" button */}
      <div className="flex-shrink-0 ml-2">
        <button
          onClick={() => onAddTab()}
          className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
        >
          <Plus size={16} />
          <span className="text-sm font-medium">Add page</span>
        </button>
      </div>
    </div>
  );
};