import React from "react";
import { IconType } from "react-icons";

interface ActionBtnProps {
  icon: IconType;
  title: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const ActionBtn: React.FC<ActionBtnProps> = ({
  icon: Icon,
  onClick,
  disabled,
  title,
}) => {
  return (
    <button
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center mt-2 justify-center rounded cursor-pointer w-[40px] h-[30px] text-slate-700 border border-slate-400 ${
        disabled && "opacity-50 cursor-not-allowed"
      }`}
    >
      <Icon size={18} />
    </button>
  );
};

export default ActionBtn;
