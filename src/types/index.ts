// types/index.ts
export interface Page {
  id: string;
  title: string;
  type: 'info' | 'details' | 'other' | 'ending';
  isDefault?: boolean;
}