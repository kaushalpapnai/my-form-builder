// components/PageNavigation.tsx
import { FileText, Plus, Flag } from 'lucide-react';

interface PageNavigationProps {
  onAddPage: () => void;
}

export const PageNavigation: React.FC<PageNavigationProps> = ({ onAddPage }) => {
  return (
    <div className="flex items-center space-x-1 p-2 border-b border-gray-200">
      <div className="flex items-center space-x-2 px-3 py-2 bg-orange-50 text-orange-600 rounded-lg">
        <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">i</div>
        <span className="font-medium">Info</span>
      </div>
      <div className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
        <FileText className="w-4 h-4" />
        <span>Details</span>
      </div>
      <div className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
        <FileText className="w-4 h-4" />
        <span>Other</span>
      </div>
      <div className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
        <Flag className="w-4 h-4" />
        <span>Ending</span>
      </div>
      <button 
        onClick={onAddPage}
        className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
      >
        <Plus className="w-4 h-4" />
        <span>Add page</span>
      </button>
    </div>
  );
};