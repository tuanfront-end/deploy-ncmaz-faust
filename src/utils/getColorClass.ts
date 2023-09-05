import { TwMainColor } from "@/data/types";

const getColorClass = (
  color: TwMainColor,
  hasHover: boolean | null | undefined = true
) => {
  switch (color) {
    case "pink":
      return `text-pink-700 bg-pink-50 ring-1 ring-inset ring-pink-600/20 ${
        hasHover ? "hover:bg-pink-600 hover:text-pink-100" : ""
      }`;

    case "blue":
      return `text-blue-700 bg-blue-50 ring-1 ring-inset ring-blue-600/20 ${
        hasHover ? "hover:bg-blue-600 hover:text-blue-100" : ""
      }`;

    case "green":
      return `text-green-700 bg-green-50 ring-1 ring-inset ring-green-600/20 ${
        hasHover ? "hover:bg-green-600 hover:text-green-100" : ""
      }`;

    case "yellow":
      return `text-yellow-700 bg-yellow-50 ring-1 ring-inset ring-yellow-600/20 ${
        hasHover ? "hover:bg-yellow-600 hover:text-yellow-100" : ""
      }`;

    case "red":
      return `text-red-700 bg-red-50 ring-1 ring-inset ring-red-600/20 ${
        hasHover ? "hover:bg-red-600 hover:text-red-100" : ""
      }`;

    case "indigo":
      return `text-indigo-700 bg-indigo-50 ring-1 ring-inset ring-indigo-600/20 ${
        hasHover ? "hover:bg-indigo-600 hover:text-indigo-100" : ""
      }`;

    case "purple":
      return `text-purple-700 bg-purple-50 ring-1 ring-inset ring-purple-600/20 ${
        hasHover ? "hover:bg-purple-600 hover:text-purple-100" : ""
      }`;

    case "gray":
      return `text-gray-700 bg-gray-50 ring-1 ring-inset ring-gray-600/20 ${
        hasHover ? "hover:bg-gray-600 hover:text-gray-100" : ""
      }`;

    case "lightBlue":
      return `text-lightBlue-700 bg-lightBlue-50 ring-1 ring-inset ring-lightBlue-600/20 ${
        hasHover ? "hover:bg-lightBlue-600 hover:text-lightBlue-100" : ""
      }`;

    case "rose":
      return `text-rose-700 bg-rose-50 ring-1 ring-inset ring-rose-600/20 ${
        hasHover ? "hover:bg-rose-600 hover:text-rose-100" : ""
      }`;

    case "emerald":
      return `text-emerald-700 bg-emerald-50 ring-1 ring-inset ring-emerald-600/20 ${
        hasHover ? "hover:bg-emerald-600 hover:text-emerald-100" : ""
      }`;

    case "lime":
      return `text-lime-700 bg-lime-50 ring-1 ring-inset ring-lime-600/20 ${
        hasHover ? "hover:bg-lime-600 hover:text-lime-100" : ""
      }`;

    case "amber":
      return `text-amber-700 bg-amber-50 ring-1 ring-inset ring-amber-600/20 ${
        hasHover ? "hover:bg-amber-600 hover:text-amber-100" : ""
      }`;

    case "orange":
      return `text-orange-700 bg-orange-50 ring-1 ring-inset ring-orange-600/20 ${
        hasHover ? "hover:bg-orange-600 hover:text-orange-100" : ""
      }`;

    case "cyan":
      return `text-cyan-700 bg-cyan-50 ring-1 ring-inset ring-cyan-600/20 ${
        hasHover ? "hover:bg-cyan-600 hover:text-cyan-100" : ""
      }`;

    case "fuchsia":
      return `text-fuchsia-700 bg-fuchsia-50 ring-1 ring-inset ring-fuchsia-600/20 ${
        hasHover ? "hover:bg-fuchsia-600 hover:text-fuchsia-100" : ""
      }`;

    case "lightGreen":
      return `text-lightGreen-700 bg-lightGreen-50 ring-1 ring-inset ring-lightGreen-600/20 ${
        hasHover ? "hover:bg-lightGreen-600 hover:text-lightGreen-100" : ""
      }`;

    case "trueGray":
      return `text-trueGray-700 bg-trueGray-50 ring-1 ring-inset ring-trueGray-600/20 ${
        hasHover ? "hover:bg-trueGray-600 hover:text-trueGray-100" : ""
      }`;

    case "warmGray":
      return `text-warmGray-700 bg-warmGray-50 ring-1 ring-inset ring-warmGray-600/20 ${
        hasHover ? "hover:bg-warmGray-600 hover:text-warmGray-100" : ""
      }`;

    case "sky":
      return `text-sky-700 bg-sky-50 ring-1 ring-inset ring-sky-600/20 ${
        hasHover ? "hover:bg-sky-600 hover:text-sky-100" : ""
      }`;

    case "violet":
      return `text-violet-700 bg-violet-50 ring-1 ring-inset ring-violet-600/20 ${
        hasHover ? "hover:bg-violet-600 hover:text-violet-100" : ""
      }`;

    case "coolGray":
      return `text-coolGray-700 bg-coolGray-50 ring-1 ring-inset ring-coolGray-600/20 ${
        hasHover ? "hover:bg-coolGray-600 hover:text-coolGray-100" : ""
      }`;

    case "blueGray":
      return `text-blueGray-700 bg-blueGray-50 ring-1 ring-inset ring-blueGray-600/20 ${
        hasHover ? "hover:bg-blueGray-600 hover:text-blueGray-100" : ""
      }`;

    case "slate":
      return `text-slate-700 bg-slate-50 ring-1 ring-inset ring-slate-600/20 ${
        hasHover ? "hover:bg-slate-600 hover:text-slate-100" : ""
      }`;

    case "teal":
      return `text-teal-700 bg-teal-50 ring-1 ring-inset ring-teal-600/20 ${
        hasHover ? "hover:bg-teal-600 hover:text-teal-100" : ""
      }`;

    default:
      return `text-pink-700 bg-pink-50 ring-1 ring-inset ring-pink-600/20 ${
        hasHover ? "hover:bg-pink-600 hover:text-pink-100" : ""
      }`;
  }
};

export const getColorClass2 = (color: TwMainColor) => {
  switch (color) {
    case "pink":
      return "bg-pink-500";
    case "blue":
      return "bg-blue-500";
    case "green":
      return "bg-green-500";
    case "yellow":
      return "bg-yellow-500";
    case "red":
      return "bg-red-500";
    case "indigo":
      return "bg-indigo-500";
    case "purple":
      return "bg-purple-500";
    case "gray":
      return "bg-gray-500";
    case "lightBlue":
      return "bg-lightBlue-500";
    case "rose":
      return "bg-rose-500";
    case "emerald":
      return "bg-emerald-500";
    case "teal":
      return "bg-teal-500";
    case "cyan":
      return "bg-cyan-500";
    case "orange":
      return "bg-orange-500";
    case "lightGreen":
      return "bg-lightGreen-500";
    case "lime":
      return "bg-lime-500";
    case "amber":
      return "bg-amber-500";
    case "trueGray":
      return "bg-trueGray-500";
    case "warmGray":
      return "bg-warmGray-500";
    case "sky":
      return "bg-sky-500";
    case "violet":
      return "bg-violet-500";
    case "fuchsia":
      return "bg-fuchsia-500";
    case "rose":
      return "bg-rose-500";
    case "blueGray":
      return "bg-blueGray-500";
    case "coolGray":
      return "bg-coolGray-500";
    case "slate":
      return "bg-slate-500";

    default:
      return "bg-pink-500";
  }
};

export default getColorClass;
