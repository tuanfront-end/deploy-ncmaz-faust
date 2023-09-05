import { NC_SITE_SETTINGS } from "@/contains/site-settings";
import { FolderIcon } from "@heroicons/react/24/outline";

export default function Empty({
  mainText = NC_SITE_SETTINGS.empty_state.title,
  subText = NC_SITE_SETTINGS.empty_state.description,
  className = "text-center py-8",
}: {
  className?: string;
  subText?: string;
  mainText?: string;
}) {
  return (
    <div className={className}>
      <FolderIcon className="inline-block h-12 w-12 text-neutral-400 " />
      <h3 className="mt-4 text-sm font-semibold text-neutral-900 dark:text-neutral-300">
        {mainText}
      </h3>
      <p
        dangerouslySetInnerHTML={{ __html: subText }}
        className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400"
      />
    </div>
  );
}
