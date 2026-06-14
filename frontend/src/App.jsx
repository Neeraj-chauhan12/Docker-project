import React from "react";
import Editor from "@monaco-editor/react";

const App = () => {
  return (
    <div className="h-screen w-screen bg-black flex gap-3 px-5">
      <div className="h-full w-[20vw] bg-gray-800 rounded-2xl "></div>
      <div className="h-full w-[75vw] bg-gray-600 rounded-2xl ">
        <Editor height="100%" defaultLanguage="javascript" />
      </div>
    </div>
  );
};

export default App;
