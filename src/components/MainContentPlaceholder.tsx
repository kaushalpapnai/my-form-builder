// components/MainContentPlaceholder.tsx
import { FileText } from 'lucide-react';

export const MainContentPlaceholder: React.FC = () => {
  return (
    <div className="text-center text-gray-500">
      <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Form Builder
      </h3>
      <p>
        Drag and drop pages to reorder them. Click on a page to select it.
        Hover over pages to see the add button appear.
      </p>
    </div>
  );
};