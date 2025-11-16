import type { SlateElementProps } from "platejs/static";

import { SlateElement } from "platejs/static";

import { cn } from "@workspace/editor/lib/utils";

export function ParagraphElementStatic(props: SlateElementProps) {
  return (
    <SlateElement
      {...props}
      className={cn("m-0 px-0 py-1")}
      attributes={{
        id: props.element.id as string,
        ...props.attributes,
      }}
    >
      {props.children}
    </SlateElement>
  );
}
