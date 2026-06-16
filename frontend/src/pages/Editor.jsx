import React, { useEffect, useMemo, useRef, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { MonacoBinding } from "y-monaco";
import { SocketIOProvider } from "y-socket.io";
import * as Y from "yjs";

const Editor = () => {
  const editorRef = useRef(null);
  const providerRef = useRef(null);

  const ydoc = useMemo(() => new Y.Doc(), []);
  const ytext = useMemo(() => ydoc.getText("monaco"), [ydoc]);

  const [username, setUsername] = useState(() => {
    return new URLSearchParams(window.location.search).get("username") || "";
  });
  const [users, setUsers] = useState([]);

  const handleMount = (editor) => {
    editorRef.current = editor;

    const provider = new SocketIOProvider(
      "http://localhost:3000",
      "monaco",
      ydoc,
      { autoConnect: true },
    );

    providerRef.current = provider;
    provider.awareness.setLocalStateField("name", username || "Guest");

    provider.awareness.on("change", () => {
      const connectedUsers = Array.from(provider.awareness.getStates().values())
        .map((state) => state?.name)
        .filter(Boolean);
      setUsers(connectedUsers);
    });

    const monacoBinding = new MonacoBinding(
      ytext,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness,
    );
  };

  console.log("ytext", ytext);

  const handleForm = (e) => {
    e.preventDefault();
    const value = e.target[0].value.trim();
    if (!value) return;

    setUsername(value);
    window.history.pushState(
      null,
      "",
      `?username=${encodeURIComponent(value)}`,
    );

    if (providerRef.current) {
      providerRef.current.awareness.setLocalStateField("name", value);
    }
  };

  useEffect(() => {
    if (providerRef.current && username) {
      providerRef.current.awareness.setLocalStateField("name", username);
    }
  }, [username]);

  if (!username) {
    return (
      <main className="h-screen w-screen flex items-center justify-center bg-slate-950 px-4">
        <div className="max-w-md w-full rounded-[32px] border border-slate-700 bg-slate-900/95 p-8 shadow-2xl shadow-black/40 backdrop-blur-sm">
          <h1 className="text-3xl font-semibold text-white mb-3">
            Join the editor
          </h1>
          <p className="text-slate-300 mb-6">
            Enter your name to access the shared editor. Only joined users can
            use the editor.
          </p>
          <form onSubmit={handleForm} className="space-y-4">
            <label className="block text-sm font-medium text-slate-300">
              Your name
              <input
                type="text"
                placeholder="Type your name"
                className="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-2xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-500"
            >
              Join now
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen w-screen bg-slate-950 text-slate-100">
      <div className="grid h-full grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="border-r border-slate-800 bg-slate-900/90 p-5">
          <div className="mb-6 rounded-3xl bg-slate-950/80 p-5 shadow-lg shadow-black/20">
            <h2 className="text-xl font-semibold">Connected users</h2>
            <p className="mt-1 text-sm text-slate-400">
              Live collaboration status
            </p>
            <div className="mt-4 space-y-2">
              {users.length > 0 ? (
                users.map((name) => (
                  <div
                    key={name}
                    className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3"
                  >
                    <span className="font-medium text-slate-100">{name}</span>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950 px-4 py-5 text-slate-400">
                  No collaborators yet.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 shadow-lg shadow-black/10">
            <h3 className="text-lg font-semibold">Your session</h3>
            <p className="mt-2 text-sm text-slate-400">Logged in as</p>
            <div className="mt-3 rounded-2xl bg-slate-900 px-4 py-3 text-slate-100">
              {username}
            </div>
          </div>
        </aside>

        <section className="relative bg-slate-950">
          <div className="absolute right-5 top-5 rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300 shadow-xl shadow-black/20">
            {users.length} active user{users.length === 1 ? "" : "s"}
          </div>
          <MonacoEditor
            height="100%"
            defaultLanguage="javascript"
            theme="vs-dark"
            onMount={handleMount}
          />
        </section>
      </div>
    </main>
  );
};

export default Editor;
