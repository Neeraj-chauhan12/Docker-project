
import Editor from "@monaco-editor/react";

const App = () => {
  return (
    <div className="h-screen w-screen bg-black flex gap-3">
      <div className="h-full w-[20vw] bg-gray-500 "></div>
      <div className="h-full w-[80vw] bg-gray-600 ">
        <Editor
          options={{
            fontSize: 16,
            automaticLayout: true,
            
            scrollbar: {
              vertical: "hidden",
              horizontal: "hidden",
            },
            padding: {
              top: 10,
              bottom: 10,
            },

          }}
          height="100%"
          width="100%"

          defaultLanguage="javascript"
        />
      </div>
    </div>
  );
};

export default App;
