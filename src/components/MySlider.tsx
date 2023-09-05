import React, { FC, ReactNode, useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import { useSwipeable } from "react-swipeable";
import { variants } from "@/utils/animationVariants";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import PrevBtn from "@/components/NextPrev/PrevBtn";
import NextBtn from "@/components/NextPrev/NextBtn";

export interface MySliderProps<T> {
  className?: string;
  itemPerRow?: number;
  data: T[];
  renderItem?: (item: T, indx: number) => ReactNode;
  arrowBtnClass?: string;
}

export default function MySlider<T>({
  className = "",
  itemPerRow = 5,
  data: dataProp = [],
  renderItem = () => <div></div>,
  arrowBtnClass = "top-1/2 -translate-y-1/2",
}: MySliderProps<T>) {
  const data = dataProp.filter((item) => item);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [numberOfItems, setNumberOfitem] = useState(0);

  const windowWidth = useWindowSize().width;
  useEffect(() => {
    if (windowWidth <= 320) {
      return setNumberOfitem(1);
    }
    if (windowWidth < 500) {
      return setNumberOfitem(itemPerRow - 3 || 2);
    }
    if (windowWidth < 1024) {
      return setNumberOfitem(itemPerRow - 2 || 3);
    }
    if (windowWidth < 1280) {
      return setNumberOfitem(itemPerRow - 1);
    }

    setNumberOfitem(itemPerRow);
  }, [itemPerRow, windowWidth]);

  function changeItemId(newVal: number) {
    if (newVal > currentIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurrentIndex(newVal);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < data?.length - 1) {
        changeItemId(currentIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        changeItemId(currentIndex - 1);
      }
    },
    trackMouse: true,
  });

  if (!numberOfItems) {
    return <div></div>;
  }

  const isRTL = document.querySelector("html")?.getAttribute("dir") === "rtl";

  return (
    <div className={`nc-MySlider ${className}`}>
      <MotionConfig
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <div className={`relative flow-root`} {...handlers}>
          <div className={`flow-root overflow-hidden rounded-xl`}>
            <motion.ul
              initial={false}
              className="relative whitespace-nowrap -mx-2 xl:-mx-4 "
            >
              <AnimatePresence initial={false} custom={direction}>
                {data.map((item, indx) => (
                  <motion.li
                    className={`relative inline-block px-2 xl:px-4 whitespace-normal`}
                    custom={direction}
                    initial={{
                      x: !isRTL
                        ? `${(currentIndex - 1) * -100}%`
                        : `${(currentIndex - 1) * 100}%`,
                    }}
                    animate={{
                      x: !isRTL
                        ? `${currentIndex * -100}%`
                        : `${currentIndex * 100}%`,
                    }}
                    variants={variants(200, 1)}
                    key={indx}
                    style={{
                      width: `calc(1/${numberOfItems} * 100%)`,
                    }}
                  >
                    {renderItem(item, indx)}
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>

          {currentIndex ? (
            <PrevBtn
              onClick={() => changeItemId(currentIndex - 1)}
              className={`w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -start-3 xl:-start-6 z-[1] ${arrowBtnClass}`}
            />
          ) : null}

          {data.length > currentIndex + numberOfItems ? (
            <NextBtn
              onClick={() => changeItemId(currentIndex + 1)}
              className={`w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -end-3 xl:-end-6 z-[1] ${arrowBtnClass}`}
            />
          ) : null}
        </div>
      </MotionConfig>
    </div>
  );
}
