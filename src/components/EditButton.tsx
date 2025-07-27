import { Edit } from "lucide-react";

interface EditButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
}

export const EditButton = ({
  onClick,
  disabled = false,
  children,
  className = "",
  size = "md",
}: EditButtonProps) => {
  const sizeClasses = size === "sm" ? "w-6 h-6" : "w-4 h-4";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1 flex items-center justify-center gap-2 ${className}`}
      aria-label="Tahrirlash"
    >
      <Edit className={sizeClasses} />
      {children}
    </button>
  );
};
