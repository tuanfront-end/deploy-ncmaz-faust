"use client";

const isSafariBrowser = () => {
  if (typeof navigator === "undefined" || !navigator) {
    return false;
  }
  return (
    navigator?.userAgent.indexOf("Safari") > -1 &&
    navigator?.userAgent.indexOf("Chrome") <= -1
  );
};

export default isSafariBrowser;
