import React from "react";

export interface AlertProps {
  containerClassName?: string;
  type?: "default" | "warning" | "info" | "success" | "error";
  children?: React.ReactNode;
  showClose?: boolean;
}

const Alert: React.FC<AlertProps> = ({
  children = "Alert Text",
  containerClassName = "",
  type = "default",
  showClose = true,
}) => {
  let classes = containerClassName;
  switch (type) {
    case "default":
      classes += " text-neutral-900 bg-neutral-100";
      break;
    case "info":
      classes += " bg-blue-100 text-blue-900";
      break;
    case "success":
      classes += " bg-green-100 text-green-900";
      break;
    case "error":
      classes += " bg-red-100 text-red-900";
      break;
    case "warning":
      classes += " bg-orange-100 text-orange-900";
      break;
    default:
      break;
  }

  return (
    <div
      className={`ttnc-alert relative flex px-6 py-4 rounded-xl text-sm overflow-x-hidden ${classes}`}
    >
      <svg
        width="24"
        height="24"
        className="flex-shrink-0 me-3"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 8V13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.9945 16H12.0035"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div>{children}</div>
    </div>
  );
};

export default Alert;
