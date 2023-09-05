import { useRouter } from "next/router";
import React from "react";
import { FaustPage } from "@faustwp/core";
import { TDashBoardEditProfileTab } from "@/container/DashboardLayout";

const Page: FaustPage<{}> = () => {
  const router = useRouter();
  const tab: TDashBoardEditProfileTab = "general";
  router.push("/dashboard/edit-profile/" + tab);

  return <div></div>;
};

export default Page;
