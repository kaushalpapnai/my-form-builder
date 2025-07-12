// types/index.ts

import type { ReactNode } from "react";

export interface Tab {
  id: string;
  name: string;
  icon: ReactNode;
  content: string;
  state: 'focused' | 'default' | 'hover';
}

export interface Position {
  x: number;
  y: number;
}