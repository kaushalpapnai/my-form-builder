// components/FormBuilder.tsx
import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { SortablePage } from './SortablePage';
import { SettingsMenu } from './SettingsMenu';
import { MainContentPlaceholder } from './MainContentPlaceholder';
import type { Page } from '../types';

export const FormBuilder: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([
    { id: '1', title: 'Info', type: 'info', isDefault: true },
    { id: '2', title: 'Details', type: 'details' },
    { id: '3', title: 'Other', type: 'other' },
    { id: '4', title: 'Ending', type: 'ending' },
  ]);

  const [activePageId, setActivePageId] = useState<string>('2');
  const [showSettings, setShowSettings] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setPages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddPage = () => {
    const newPage: Page = {
      id: Date.now().toString(),
      title: 'Other',
      type: 'other',
    };
    setPages([...pages, newPage]);
  };

  const handleAddBefore = (targetId: string) => {
    const targetIndex = pages.findIndex(p => p.id === targetId);
    const newPage: Page = {
      id: Date.now().toString(),
      title: 'Other',
      type: 'other',
    };
    const newPages = [...pages];
    newPages.splice(targetIndex, 0, newPage);
    setPages(newPages);
  };

  const handleDeletePage = (pageId: string) => {
    setPages(pages.filter(p => p.id !== pageId));
    setShowSettings(null);
  };

  const handleDuplicatePage = (pageId: string) => {
    const pageIndex = pages.findIndex(p => p.id === pageId);
    const pageToDuplicate = pages[pageIndex];
    const newPage: Page = {
      ...pageToDuplicate,
      id: Date.now().toString(),
      title: `${pageToDuplicate.title} Copy`,
      isDefault: false,
    };
    const newPages = [...pages];
    newPages.splice(pageIndex + 1, 0, newPage);
    setPages(newPages);
    setShowSettings(null);
  };

  const handleSetAsFirst = (pageId: string) => {
    const pageIndex = pages.findIndex(p => p.id === pageId);
    const pageToMove = pages[pageIndex];
    const newPages = [pageToMove, ...pages.filter(p => p.id !== pageId)];
    setPages(newPages);
    setShowSettings(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Layout: sidebar top on small screens, bottom on large */}
        <div className="flex flex-col-reverse lg:flex-col gap-6">

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg p-8 order-2 lg:order-1">
            <MainContentPlaceholder />
          </div>

          {/* bottom menu */}
          <div className="w-full bg-white rounded-lg p-4 relative border border-red-500 order-1 lg:order-2">
            <div className="mb-4">
              <h2 className="font-medium text-gray-900 mb-2">States</h2>
              <div className="text-xs text-gray-500 mb-4">Settings open</div>
            </div>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={pages.map(p => p.id)} strategy={verticalListSortingStrategy}>
                <div className=" flex space-x-4">
                  {pages.map((page, index) => (
                    <SortablePage
                      key={page.id}
                      page={page}
                      isActive={activePageId === page.id}
                      onSelect={setActivePageId}
                      onSettings={setShowSettings}
                      onAddBefore={handleAddBefore}
                      showAddButton={index > 0}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {/* Add Page Button */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={handleAddPage}
                className="w-full flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add page</span>
              </button>
            </div>

            {/* Settings Menu */}
            {showSettings && (
              <div className="relative">
                <SettingsMenu 
                  page={pages.find(p => p.id === showSettings)!}
                  onClose={() => setShowSettings(null)}
                  onSetAsFirst={handleSetAsFirst}
                  onDuplicate={handleDuplicatePage}
                  onDelete={handleDeletePage}
                />
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 z-0" 
                  onClick={() => setShowSettings(null)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
