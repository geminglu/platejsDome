"use client";

import type { PlateElementProps } from "platejs/react";

import { useTocElementState } from "@platejs/toc/react";
import { cva } from "class-variance-authority";
import { PlateElement } from "platejs/react";

const headingItemVariants = cva(
  "block h-auto w-full cursor-pointer truncate rounded-none px-0.5 py-1.5 text-left font-medium text-muted-foreground underline decoration-[0.5px] underline-offset-4 hover:bg-accent hover:text-muted-foreground",
  {
    variants: {
      depth: {
        1: "pl-0.5",
        2: "pl-6",
        3: "pl-12",
        4: "pl-18",
        5: "pl-24",
        6: "pl-30",
      },
    },
  },
);

export function TocElement(props: PlateElementProps) {
  const state = useTocElementState();
  const { headingList } = state;

  return (
    <PlateElement {...props} className="mb-1 p-0">
      {headingList.length > 0 ? (
        <ol contentEditable={false}>
          {headingList.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={headingItemVariants({
                  depth: item.depth as 1 | 2 | 3,
                })}
                aria-current
              >
                {item.title}
              </a>
            </li>
          ))}
        </ol>
      ) : (
        <div className="text-sm text-gray-500">
          Create a heading to display the table of contents.
        </div>
      )}
      {props.children}
    </PlateElement>
  );
}
