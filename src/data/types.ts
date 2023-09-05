import { NcmazFcPostFullFieldsFragment } from "@/__generated__/graphql";

//  ######  CustomLink  ######## //
export type Route = string;

export interface CustomLink {
  label: string;
  href: Route;
  targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export type PostDataFragmentType = NcmazFcPostFullFieldsFragment;

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray"
  | "slate"
  | "teal"
  | "amber"
  | "emerald"
  | "lime"
  | "rose"
  | "fuchsia"
  | "cyan"
  | "lightBlue"
  | "warmGray"
  | "trueGray"
  | "coolGray"
  | "blueGray"
  | "orange"
  | "violet"
  | "lightGreen"
  | "sky";
