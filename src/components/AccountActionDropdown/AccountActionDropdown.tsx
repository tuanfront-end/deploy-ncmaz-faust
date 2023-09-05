"use client";

import React, { FC } from "react";
import twFocusClass from "@/utils/twFocusClass";
import NcDropDown, { NcDropDownItem } from "@/components/NcDropDown/NcDropDown";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

type AccountAction = "copylink" | "edit";

const initActions: NcDropDownItem<AccountAction>[] = [
  {
    id: "copylink",
    name: "Copy link",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
  </svg>`,
  },
  {
    id: "edit",
    name: "Edit profile",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
  `,
    href: "/dashboard/edit-profile/general",
  },
];

export interface AccountActionDropdownProps {
  containerClassName?: string;
  iconClass?: string;
  dropdownPositon?: "up" | "down";
  authorSlug: string;
  userDatabaseId: string | number;
}

const AccountActionDropdown: FC<AccountActionDropdownProps> = ({
  containerClassName = "h-8 w-8 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700",
  iconClass = "h-6 w-6",
  dropdownPositon = "down",
  authorSlug = "",
  userDatabaseId,
}) => {
  //
  const { viewer } = useSelector((state: RootState) => state.viewer);
  const viewerRoles = viewer?.roles?.edges[0].node.name;

  let actions = initActions;
  if (
    viewerRoles !== "administrator" &&
    viewerRoles !== "editor" &&
    viewer?.databaseId !== userDatabaseId
  ) {
    actions = initActions.filter((item) => item.id !== "edit");
  }

  const hanldeClickDropDown = (item: NcDropDownItem<AccountAction>) => {
    if (item.id === "copylink") {
      navigator.clipboard.writeText(
        `${window.location.origin}/author/${authorSlug}`
      );
      toast.success("Copied link to clipboard");
      return;
    }

    return;
  };

  const renderMenu = () => {
    return (
      <NcDropDown
        className={`text-neutral-500 dark:text-neutral-400 flex items-center justify-center rounded-full ${containerClassName} ${twFocusClass()}`}
        triggerIconClass={iconClass}
        data={actions}
        panelMenusClass={
          dropdownPositon === "up" ? "origin-bottom-right bottom-0" : undefined
        }
        onClick={hanldeClickDropDown}
      />
    );
  };

  return <div>{renderMenu()}</div>;
};

export default AccountActionDropdown;
