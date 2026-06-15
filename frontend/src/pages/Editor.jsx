import React from "react";
import MonacoEditor from "@monaco-editor/react";
import { MonacoBinding } from "y-monaco";
import { SocketIOProvider } from "y-socket.io";
import * as Y from "yjs";
import { useRef } from "react";
import { useMemo } from "react";

const Editor = () => {
  const editorRef = useRef(null);

  const ydoc = useMemo(() => new Y.Doc(), []);
  const ytext = useMemo(() => ydoc.getText("monaco"), [ydoc]);

  const handleMount = (editor) => {
    editorRef.current = editor;

    const provider = new SocketIOProvider(
      "http://localhost:3000",
      "monaco",
      ydoc,
      { autoConnect: true },
    );
    const monacoBinding = new MonacoBinding(
      ytext,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness,
    );
  };

  return (
    <div className="h-full w-full">
      <MonacoEditor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        onMount={handleMount}
      />
    </div>
  );
};

export default Editor;
