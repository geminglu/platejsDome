"use client";

import { PlateEditor } from "@workspace/editor/components/plate-editor";
import { value } from "./valueDome";

export default function Page() {
  return (
    <div className="h-screen w-full">
      <PlateEditor value={value} />
    </div>
  );
}
