"use client";

import { PlateEditor } from "@workspace/ui/components/plate-editor";
import { value } from "./valueDome";

export default function Page() {
  return (
    <div className="h-screen w-full">
      <PlateEditor value={value} />
    </div>
  );
}
function hello() {
  console.info("Code blocks are supported!");
}
