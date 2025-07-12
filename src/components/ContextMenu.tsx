// components/ContextMenu.tsx
import React from 'react';
import { Edit, Copy, Files, Trash2 } from 'lucide-react';

interface ContextMenuProps {
  showMenu: string | null;
  menuPosition: { x: number; y: number };
  menuRef: React.RefObject<HTMLDivElement>;
  onSetAsFirstPage: () => void;
  onStartRename: () => void;
  onCopyTab: () => void;
  onDuplicateTab: () => void;
  onDeleteTab: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  showMenu,
  menuPosition,
  menuRef,
  onSetAsFirstPage,
  onStartRename,
  onCopyTab,
  onDuplicateTab,
  onDeleteTab,
}) => {
  if (!showMenu) return null;

  return (
    <div
      ref={menuRef}
      className="fixed bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 min-w-48 mt-64"
      style={{
        left: menuPosition.x,
        top: menuPosition.y,
        transform: 'translateY(-100%)'
      }}
    >
      <button
        onClick={onSetAsFirstPage}
        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
      >
        <div className="w-4 h-4 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
        </div>
        Set as first page
      </button>
      
      <button
        onClick={onStartRename}
        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
      >
        <Edit size={16} />
        Rename
      </button>
      
      <button
        onClick={onCopyTab}
        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
      >
        <Copy size={16} />
        Copy
      </button>
      
      <button
        onClick={onDuplicateTab}
        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
      >
        <Files size={16} />
        Duplicate
      </button>
      
      <hr className="my-2 border-gray-200" />
      
      <button
        onClick={onDeleteTab}
        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
      >
        <Trash2 size={16} />
        Delete
      </button>
    </div>
  );
};