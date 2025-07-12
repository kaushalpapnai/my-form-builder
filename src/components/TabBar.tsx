import React from 'react';
import { Plus, MoreVertical, Info as InfoIconLucide } from 'lucide-react';
import type { Tab } from '../types';

export const TabBar: React.FC<{
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
}> = ({
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

  const getIcon = (tab: Tab) => {
    const activeClass = tab.id === activeTab ? 'text-orange-500' : 'text-gray-500';
    
    if (isInfoTab(tab)) {
      return <InfoIconLucide size={18} className={activeClass} />;
    }
    if (tab.name.toLowerCase() === 'ending') {
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={activeClass}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    }
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={activeClass}
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="15" y2="17" />
      </svg>
    );
  };

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
                    ? 'bg-white border border-gray-200 shadow-sm text-gray-800'
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
                draggable={!isInfoTab(tab)}
                onDragStart={(e) => !isInfoTab(tab) && onDragStart(e, tab.id)}
                onDragOver={(e) => !isInfoTab(tab) && onDragOver(e, index)}
                onDragLeave={onDragLeave}
                onDrop={(e) => !isInfoTab(tab) && onDrop(e, index)}
              >
                {/* Icon */}
                <span>{getIcon(tab)}</span>

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

                {tab.id === activeTab && !isInfoTab(tab) && (
                  <button
                    onClick={(e) => onMenuClick(tab.id, e)}
                    className="p-0.5 hover:bg-gray-200 rounded transition-colors"
                  >
                    <MoreVertical size={12} />
                  </button>
                )}
              </div>

              {/* Gap with dotted line and plus button */}
              {index < tabs.length - 1 && (
                <div
                  className="flex items-center justify-center relative px-2"
                  onMouseEnter={() => setHoveredGap(index + 1)}
                  onMouseLeave={() => setHoveredGap(null)}
                >
                  <div className="flex items-center gap-[2px]">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="w-[2px] h-[2px] bg-gray-400 rounded-full" />
                    ))}
                  </div>

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