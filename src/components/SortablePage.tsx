import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MoreHorizontal } from 'lucide-react';
import { PageStateLabel } from './PageStateLabel';
import { AddPageButton } from './AddPageButton';
import type { Page } from '../types';
import { PageIcon } from './PageIcons';

interface SortablePageProps {
  page: Page;
  isActive: boolean;
  onSelect: (id: string) => void;
  onSettings: (id: string) => void;
  onAddBefore: (id: string) => void;
  showAddButton?: boolean;
  layout?: 'vertical' | 'horizontal';
}

export const SortablePage: React.FC<SortablePageProps> = ({
  page,
  isActive,
  onSelect,
  onSettings,
  onAddBefore,
  showAddButton = false,
  layout = 'vertical',
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: page.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (layout === 'horizontal') {
    return (
      <div 
        ref={setNodeRef} 
        style={style} 
        className={`relative group ${isDragging ? 'opacity-50' : ''}`}
      >
        {showAddButton && (
          <AddPageButton onClick={() => onAddBefore(page.id)} />
        )}
        
        <div
          {...attributes}
          {...listeners}
          onClick={() => onSelect(page.id)}
          className={`
            flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer transition-colors relative
            ${isActive 
              ? 'bg-orange-50 text-orange-600' 
              : 'text-gray-600 hover:bg-gray-50'
            }
          `}
        >
          <PageIcon type={page.type} />
          <span className="font-medium">{page.title}</span>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSettings(page.id);
            }}
            className="ml-2 p-1 hover:bg-gray-200 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    );
  }

  // Vertical layout (for small/medium screens)
  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`relative group ${isDragging ? 'opacity-50' : ''}`}
    >
      {showAddButton && (
        <AddPageButton onClick={() => onAddBefore(page.id)} />
      )}
      
      <div
        {...attributes}
        {...listeners}
        onClick={() => onSelect(page.id)}
        className={`
          flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all
          ${isActive 
            ? 'bg-blue-50 border-2 border-blue-200' 
            : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
          }
        `}
      >
        <div className="flex items-center space-x-3">
          <PageIcon type={page.type} />
          <div>
            <div className="font-medium text-gray-900">{page.title}</div>
            <div className="text-xs text-gray-500">
              <PageStateLabel isDefault={!!page.isDefault} isActive={isActive} />
            </div>
          </div>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSettings(page.id);
          }}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <MoreHorizontal className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
};