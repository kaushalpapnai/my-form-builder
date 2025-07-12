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
  const [hoveredGap, setHoveredGap] = React.useState<number | null>(null);

  const isInfoTab = (tab: Tab) => tab.name.toLowerCase() === 'info';

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center">
      {/* Scrollable tabs container */}
      <div className="flex-1 overflow-x-auto scrollbar-hide">
        <div className="flex items-center w-max">
          {tabs.map((tab, index) => (
            <React.Fragment key={tab.id}>
              {/* Tab */}
              <div
                className={`flex-shrink-0 relative flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  tab.id === activeTab
                    ? 'bg-white border border-gray-200 shadow-xs text-gray-800'
                    : tab.state === 'hover'
                    ? 'bg-[#9DA4B259] text-gray-700'
                    : 'bg-[#9DA4B226] text-gray-600'
                } ${
                  dragOverIndex === index && !isInfoTab(tab) 
                    ? 'border-l-2 border-blue-500' 
                    : ''
                }`}
                onClick={() => onTabClick(tab.id)}
                onMouseEnter={() => tab.id !== activeTab && onTabHover(tab.id)}
                onMouseLeave={onTabLeave}
                draggable={!isInfoTab(tab)} // Only draggable if not info tab
                onDragStart={(e) => !isInfoTab(tab) && onDragStart(e, tab.id)}
                onDragOver={(e) => !isInfoTab(tab) && onDragOver(e, index)}
                onDragLeave={onDragLeave}
                onDrop={(e) => !isInfoTab(tab) && onDrop(e, index)}
              >
                {/* Icon - orange when active */}
                <span className={tab.id === activeTab ? 'text-orange-500' : ''}>
                  {tab.icon}
                </span>
                
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
                  <span className="text-sm font-medium whitespace-nowrap">
                    {tab.name}
                  </span>
                )}
                
                {/* Show three dots menu button for all tabs except info tab */}
                {tab.id === activeTab && !isInfoTab(tab) && (
                  <button
                    onClick={(e) => onMenuClick(tab.id, e)}
                    className="p-0.5 hover:bg-gray-200 rounded transition-colors"
                  >
                    <MoreVertical size={12} />
                  </button>
                )}
              </div>

              {/* Gap with dashed line - only show if not the last tab */}
              {index < tabs.length - 1 && (
                <div
                  className="flex items-center justify-center relative px-2"
                  onMouseEnter={() => setHoveredGap(index + 1)}
                  onMouseLeave={() => setHoveredGap(null)}
                >
                  {/* Horizontal dashed line */}
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-0.5 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-0.5 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-0.5 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-0.5 bg-gray-400 rounded-full"></div>
                  </div>
                  
                  {/* Plus button - only visible on hover */}
                  <button
                    onClick={() => onAddTab(index + 1)}
                    className={`absolute w-5 h-5 flex items-center justify-center text-black shadow-md border border-gray-200 rounded-full transition-all bg-white ${
                      hoveredGap === index + 1 ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Plus size={12} />
                  </button>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Fixed "Add page" button */}
      <div className="flex-shrink-0 ml-2">
        <button
          onClick={() => onAddTab()}
          className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 border border-gray-200 shadow-xs rounded-md transition-colors"
        >
          <Plus size={16} />
          <span className="text-sm font-medium">Add page</span>
        </button>
      </div>
    </div>
  );
};