"use client";

import * as React from "react";

import {
  Plate,
  PlateProps,
  usePlateEditor,
  type WithPlateOptions,
} from "platejs/react";

import { EditorKit, type MyEditor } from "@workspace/ui/components/editor-kit";
import { Editor, EditorContainer } from "@workspace/ui/components/editor";

export type PlateEditorProps = {
  placeholder?: string;
  value?: WithPlateOptions["value"];
  onChange?: PlateProps["onChange"];
};

export type PlateEditorRef = {
  editor: MyEditor;
};

export const PlateEditor = React.forwardRef<PlateEditorRef, PlateEditorProps>(
  ({ placeholder, value, onChange }, ref) => {
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
          <Editor variant="demo" placeholder={placeholder} />
        </EditorContainer>
      </Plate>
    );
  }
);

PlateEditor.displayName = "PlateEditor";
