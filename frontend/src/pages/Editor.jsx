import React from 'react'
import MonacoEditor from "@monaco-editor/react";

const Editor = () => {
  return (
    <div className='h-full w-full'>
      <MonacoEditor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        options={{
          minimap: {
            enabled: false
          }
        }}
      />

    </div>
  )
}

export default Editor
