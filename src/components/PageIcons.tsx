// components/PageIcon.tsx
import { FileText, Flag } from 'lucide-react';

interface PageIconProps {
  type: 'info' | 'details' | 'other' | 'ending';
}

export const PageIcon: React.FC<PageIconProps> = ({ type }) => {
  switch (type) {
    case 'info':
      return <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">i</div>;
    case 'details':
      return <FileText className="w-4 h-4 text-gray-600" />;
    case 'other':
      return <FileText className="w-4 h-4 text-gray-600" />;
    case 'ending':
      return <Flag className="w-4 h-4 text-gray-600" />;
    default:
      return <FileText className="w-4 h-4 text-gray-600" />;
  }
};