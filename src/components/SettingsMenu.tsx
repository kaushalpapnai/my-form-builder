// components/SettingsMenu.tsx
import { Flag, Edit, Copy, FileText, Trash2 } from 'lucide-react';
import type { Page } from '../types';

interface SettingsMenuProps {
  page: Page;
  onClose: () => void;
  onSetAsFirst: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({ 
  page, 
  onClose, 
  onSetAsFirst, 
  onDuplicate, 
  onDelete 
}) => {
  return (
    <div className="absolute right-0 top-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
      <div className="p-2">
        <h3 className="font-medium text-gray-900 mb-2">Settings</h3>
        <div className="space-y-1">
          <button
            onClick={() => {
              onSetAsFirst(page.id);
              onClose();
            }}
            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
          >
            <Flag className="w-4 h-4 text-blue-500" />
            <span>Set as first page</span>
          </button>
          <button
            onClick={onClose}
            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
          >
            <Edit className="w-4 h-4" />
            <span>Rename</span>
          </button>
          <button
            onClick={onClose}
            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
          >
            <Copy className="w-4 h-4" />
            <span>Copy</span>
          </button>
          <button
            onClick={() => {
              onDuplicate(page.id);
              onClose();
            }}
            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
          >
            <FileText className="w-4 h-4" />
            <span>Duplicate</span>
          </button>
          <button
            onClick={() => {
              onDelete(page.id);
              onClose();
            }}
            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};