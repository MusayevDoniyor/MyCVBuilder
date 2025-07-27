import { Plus } from "lucide-react";

interface AddButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const AddButton = ({
  onClick,
  disabled = false,
  children,
  className = "",
}: AddButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn-primary disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto md:self-end flex items-center justify-center gap-2 ${className}`}
    >
      <Plus className="w-4 h-4" />
      {children}
    </button>
  );
};
