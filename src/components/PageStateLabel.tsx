// components/PageStateLabel.tsx
interface PageStateLabelProps {
  isDefault: boolean;
  isActive: boolean;
}

export const PageStateLabel: React.FC<PageStateLabelProps> = ({ isDefault, isActive }) => {
  if (isDefault) return <span>Default</span>;
  if (isActive) return <span>Focused</span>;
  return <span>Hover</span>;
};