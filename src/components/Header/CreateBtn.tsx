import { PlusIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import Link from "next/link";
import { useAuth } from "@faustwp/core";
import { useLoginModal } from "@/container/LoginModalProvider";

interface Props {
  className?: string;
}

const CreateBtn: FC<Props> = ({ className = "hidden md:block " }) => {
  const { isReady, isAuthenticated } = useAuth();
  const { openLoginModal } = useLoginModal();

  return (
    <div className={`LangDropdown ${className}`}>
      <Link
        href="/submission"
        className={`
             group h-10 sm:h-12 px-3 py-1.5 inline-flex items-center justify-center rounded-xl text-sm font-medium text-neutral-900 dark:text-neutral-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 opacity-80 hover:opacity-100`}
        onClick={(e) => {
          if (!isAuthenticated) {
            e.preventDefault();
            openLoginModal();
          }
        }}
      >
        <PlusIcon className="w-5 h-5 -ms-1" />
        <span className="ms-2">Create</span>
      </Link>
    </div>
  );
};
export default CreateBtn;
