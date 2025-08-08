interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}
const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  type,
}) => {
  return (
    <button
      className={
        `py-2 rounded-lg transition font-semibold whitespace-nowrap  cursor-pointer ` +
        className
      }
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
