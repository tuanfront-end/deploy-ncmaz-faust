import { useRouter } from "next/router";
import React from "react";
import { FaustPage } from "@faustwp/core";
import { TDashBoardPostTab } from "@/container/DashboardLayout";

const Page: FaustPage<{}> = () => {
  const router = useRouter();
  const tab: TDashBoardPostTab = "published";
  router.push("/dashboard/posts/" + tab);

  return <div></div>;
};

export default Page;
