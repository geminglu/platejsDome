"use client";

import { value } from "../editor/valueDome";
import { PlateEditorView } from "@workspace/editor/components/PlateEditorView";

export default function Page() {
  return (
    <div className="h-screen w-full">
      <PlateEditorView value={value} />
    </div>
  );
}
