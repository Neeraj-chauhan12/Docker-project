import React from "react";
import MonacoEditor from "@monaco-editor/react";
import { MonacoBinding } from "y-monaco";
import { SocketIOProvider } from "y-socket.io";
import * as Y from "yjs";
import { useRef } from "react";
import { useMemo } from "react";
import { useState } from "react";

const Editor = () => {
  const editorRef = useRef(null);

  const ydoc = useMemo(() => new Y.Doc(), []);
  const ytext = useMemo(() => ydoc.getText("monaco"), [ydoc]);

  const handleMount = (editor) => {
    editorRef.current = editor;
    const [username,setUsername] = useState(()=>{
      return new URLSearchParams(window.location.search).get("username") || "Anonymous"
    })

    const provider = new SocketIOProvider(
      "http://localhost:3000",
      "monaco",
      ydoc,
      { autoConnect: true },
    );

    provider.awareness.setLocalStateField("name", username);
    provider.awareness.on("change", () => {
      const states=Array.from(provider.awareness.getStates().values())
      console.log(states);
    })

    const monacoBinding = new MonacoBinding(
      ytext,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness,
    );
  };

  console.log("ytext",ytext);

  const handleForm =(e)=>{
    e.preventDefault()
    setUsername(e.target[0].value)
    window.history.pushState(null,"",`?username=${e.target[0].value}`)
  
  }

  if(!username){
    return(
      <div className="h-full w-full flex justify-center items-center">
        <form onSubmit={handleForm} className="py-5 px-5 bg-gray-500">
         <h1>Enter your name</h1>
        <input type="text" placeholder="Enter your name" className="py-2 px-2"  />
        <button className="bg-blue-500 px-10 py-4">Join now</button>
        </form>
       
       
      </div>
    )
  }

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
