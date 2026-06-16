import React from "react";

import Editor from "./pages/Editor";

const App = () => {
  return (
    <div className="h-screen w-screen bg-black flex gap-3">
      <div className="h-full w-[20vw] bg-gray-500 "></div>
      <div className="h-full w-[80vw] bg-gray-700">
        <Editor />
      </div>
    </div>
  );
};

export default App;
