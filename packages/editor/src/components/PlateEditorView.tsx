"use client";

import * as React from "react";

import {
  Plate,
  PlateProps,
  usePlateEditor,
  type WithPlateOptions,
} from "platejs/react";

import {
  EditorKit,
  type MyEditor,
} from "@workspace/editor/components/editor-kit";
import {
  EditorContainer,
  EditorView,
} from "@workspace/editor/components/editor";

export type PlateEditorProps = {
  placeholder?: string;
  value?: WithPlateOptions["value"];
  onChange?: PlateProps["onChange"];
};

export type PlateEditorRef = {
  editor: MyEditor;
};

export const PlateEditorView = React.forwardRef<
  PlateEditorRef,
  PlateEditorProps
>(({ placeholder, value, onChange }, ref) => {
  const editor = usePlateEditor({
    plugins: EditorKit,
    value,
  });

  React.useImperativeHandle(ref, () => ({
    editor,
  }));

  return (
    <Plate editor={editor} onChange={onChange}>
      <EditorContainer>
        <EditorView editor={editor} variant="default" />
      </EditorContainer>
    </Plate>
  );
});

PlateEditorView.displayName = "PlateEditorView";
