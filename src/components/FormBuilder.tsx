// components/FormBuilder.tsx
import React, { useState, useRef, useEffect } from "react";
import { Info, FileText, Check } from "lucide-react";
import { TabBar } from "./TabBar";
import { ContentArea } from "./ContentArea";
import { ContextMenu } from "./ContextMenu";
import type { Tab, Position } from "../types";

export const FormBuilder: React.FC = () => {
  // State management
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: "1",
      name: "Info",
      icon: <Info size={16} />,
      content: "Welcome to the Info page.",
      state: "focused",
    },
    {
      id: "2",
      name: "Details",
      icon: <FileText size={16} />,
      content: "Details content here.",
      state: "default",
    },
    {
      id: "3",
      name: "Other",
      icon: <FileText size={16} />,
      content: "Other content here.",
      state: "default",
    },
    {
      id: "4",
      name: "Ending",
      icon: <Check size={16} />,
      content: "Ending content here.",
      state: "default",
    },
  ]);

  const [activeTab, setActiveTab] = useState<string>("1");
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<Position>({ x: 0, y: 0 });
  const [draggedTab, setDraggedTab] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isRenaming, setIsRenaming] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState<string>("");

  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Tab handlers
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setTabs((prev) =>
      prev.map((tab) => ({
        ...tab,
        state: tab.id === tabId ? "focused" : "default",
      }))
    );
  };

  const handleTabHover = (tabId: string) => {
    setTabs((prev) =>
      prev.map((tab) => ({
        ...tab,
        state:
          tab.id === tabId
            ? "hover"
            : tab.id === activeTab
            ? "focused"
            : "default",
      }))
    );
  };

  const handleTabLeave = () => {
    setTabs((prev) =>
      prev.map((tab) => ({
        ...tab,
        state: tab.id === activeTab ? "focused" : "default",
      }))
    );
  };

  const handleMenuClick = (tabId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({ x: rect.left, y: rect.top - 10 });
    setShowMenu(showMenu === tabId ? null : tabId);
  };

  // Content handler
  const handleContentChange = (value: string) => {
    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === activeTab ? { ...tab, content: value } : tab
      )
    );
  };

  // Tab operations
  const addNewTab = (insertIndex?: number) => {
    const newTab: Tab = {
      id: Date.now().toString(),
      name: "New Page",
      icon: <FileText size={16} />,
      content: "Write your content here...",
      state: "default",
    };

    setTabs((prev) => {
      const newTabs = [...prev];
      if (insertIndex !== undefined) {
        newTabs.splice(insertIndex, 0, newTab);
      } else {
        newTabs.push(newTab);
      }
      return newTabs;
    });
  };

  const deleteTab = (tabId: string) => {
    if (tabs.length <= 1) return;

    setTabs((prev) => prev.filter((tab) => tab.id !== tabId));

    if (activeTab === tabId) {
      const currentIndex = tabs.findIndex((tab) => tab.id === tabId);
      const nextTab = tabs[currentIndex + 1] || tabs[currentIndex - 1];
      if (nextTab) {
        handleTabClick(nextTab.id);
      }
    }
    setShowMenu(null);
  };

  const duplicateTab = (tabId: string) => {
    const tabToDuplicate = tabs.find((tab) => tab.id === tabId);
    if (!tabToDuplicate) return;

    const newTab: Tab = {
      ...tabToDuplicate,
      id: Date.now().toString(),
      name: `${tabToDuplicate.name} Copy`,
      state: "default",
    };

    const currentIndex = tabs.findIndex((tab) => tab.id === tabId);
    setTabs((prev) => {
      const newTabs = [...prev];
      newTabs.splice(currentIndex + 1, 0, newTab);
      return newTabs;
    });
    setShowMenu(null);
  };

  const copyTab = (tabId: string) => {
    const tabToCopy = tabs.find((tab) => tab.id === tabId);
    if (!tabToCopy) return;

    navigator.clipboard.writeText(tabToCopy.content);
    setShowMenu(null);
  };

  // Rename operations
  const startRename = (tabId: string) => {
    const tab = tabs.find((t) => t.id === tabId);
    if (tab) {
      setIsRenaming(tabId);
      setRenameValue(tab.name);
    }
    setShowMenu(null);
  };

  const handleRename = (tabId: string) => {
    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === tabId ? { ...tab, name: renameValue } : tab
      )
    );
    setIsRenaming(null);
    setRenameValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent, tabId: string) => {
    if (e.key === "Enter") {
      handleRename(tabId);
    } else if (e.key === "Escape") {
      setIsRenaming(null);
      setRenameValue("");
    }
  };

  const setAsFirstPage = (tabId: string) => {
    const tab = tabs.find((t) => t.id === tabId);
    if (!tab) return;

    setTabs((prev) => {
      const filteredTabs = prev.filter((t) => t.id !== tabId);
      return [tab, ...filteredTabs];
    });
    setShowMenu(null);
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, tabId: string) => {
    setDraggedTab(tabId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (!draggedTab) return;

    const draggedIndex = tabs.findIndex((tab) => tab.id === draggedTab);
    if (draggedIndex === -1) return;

    const newTabs = [...tabs];
    const draggedTabData = newTabs[draggedIndex];

    newTabs.splice(draggedIndex, 1);
    newTabs.splice(dropIndex, 0, draggedTabData);

    setTabs(newTabs);
    setDraggedTab(null);
    setDragOverIndex(null);
  };

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col">
      <TabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={handleTabClick}
        onTabHover={handleTabHover}
        onTabLeave={handleTabLeave}
        onMenuClick={handleMenuClick}
        onAddTab={addNewTab}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        dragOverIndex={dragOverIndex}
        isRenaming={isRenaming}
        renameValue={renameValue}
        onRenameChange={setRenameValue}
        onRenameSubmit={handleRename}
        onKeyDown={handleKeyDown}
      />

      <ContentArea
        currentTab={currentTab}
        onContentChange={handleContentChange}
      />

      <ContextMenu
        showMenu={showMenu}
        menuPosition={menuPosition}
        menuRef={menuRef as React.RefObject<HTMLDivElement>} // Add this type assertion
        onSetAsFirstPage={() => showMenu && setAsFirstPage(showMenu)}
        onStartRename={() => showMenu && startRename(showMenu)}
        onCopyTab={() => showMenu && copyTab(showMenu)}
        onDuplicateTab={() => showMenu && duplicateTab(showMenu)}
        onDeleteTab={() => showMenu && deleteTab(showMenu)}
      />
    </div>
  );
};

export default FormBuilder;
