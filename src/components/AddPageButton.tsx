// components/AddPageButton.tsx
import { Plus } from 'lucide-react';

interface AddPageButtonProps {
  onClick: () => void;
  position?: 'top' | 'bottom';
}

export const AddPageButton: React.FC<AddPageButtonProps> = ({ 
  onClick, 
  position = 'top' 
}) => {
  return (
    <div className={`absolute ${position === 'top' ? '-top-2' : '-bottom-2'} left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity`}>
      <button
        onClick={onClick}
        className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 shadow-lg"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
};