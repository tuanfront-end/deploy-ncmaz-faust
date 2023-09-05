"use client";
import React, { FC } from "react";
import { useThemeMode } from "@/hooks/useThemeMode";
import { FragmentType } from "@/__generated__";
import { NC_PRIMARY_MENU_QUERY_FRAGMENT } from "@/fragments/menu";
import MainNav2 from "@/components/Header/MainNav2";
import Banner from "@/components/Banner";

interface Props {
  menuItems: FragmentType<typeof NC_PRIMARY_MENU_QUERY_FRAGMENT>[];
  siteTitle?: string | null;
  siteDescription?: string | null;
}

const SiteHeader: FC<Props> = ({ menuItems, siteDescription, siteTitle }) => {
  //
  useThemeMode();
  //
  return (
    <>
      <Banner />

      <div className="sticky top-0 w-full z-30">
        <MainNav2
          menuItems={menuItems}
          title={siteTitle}
          description={siteDescription}
        />
      </div>
    </>
  );
};

export default SiteHeader;
