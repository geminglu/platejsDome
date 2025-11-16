"use client";

import type { PlateElementProps } from "platejs/react";

import { PlateElement } from "platejs/react";

import { cn } from "@workspace/editor/lib/utils";

export function ParagraphElement(props: PlateElementProps) {
  return (
    <PlateElement
      {...props}
      className={cn("m-0 px-0 py-1")}
      attributes={{
        id: props.element.id as string,
        ...props.attributes,
      }}
    >
      {props.children}
    </PlateElement>
  );
}
