import React, { TextareaHTMLAttributes } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

// eslint-disable-next-line react/display-name
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", children, ...args }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`block w-full text-sm rounded-xl border-neutral-200 hover:border-neutral-300 focus:border-primary-300 focus:ring focus:ring-primary-200/50 bg-white dark:border-neutral-600 dark:hover:border-neutral-500 dark:focus:ring-primary-500/30 dark:bg-transparent ${className}`}
        rows={4}
        {...args}
      >
        {children}
      </textarea>
    );
  }
);

export default Textarea;
