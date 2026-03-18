"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { oneDark } from "@codemirror/theme-one-dark"
import { html } from "@codemirror/lang-html"

const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), { ssr: false })

const defaultCode = `<h1 style="color: #7c3aed; font-family: sans-serif; margin: 0 0 12px 0;">
  Hello, World! 👋
</h1>

<p style="font-family: sans-serif; color: #374151; margin: 0 0 16px 0;">
  Edit this code on the left and watch the result change here instantly.
</p>

<button style="
  background: #7c3aed;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  font-family: sans-serif;
">
  I'm a button!
</button>`

export function LiveCodeEditor() {
  const [code, setCode] = useState(defaultCode)

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Editor */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 bg-slate-800 px-4 py-2.5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-slate-400 ml-2">code editor</span>
          </div>
          <CodeMirror
            value={code}
            height="340px"
            theme={oneDark}
            extensions={[html()]}
            onChange={(val) => setCode(val)}
            basicSetup={{
              lineNumbers: true,
              foldGutter: false,
              dropCursor: false,
              allowMultipleSelections: false,
              indentOnInput: true,
            }}
          />
        </div>

        {/* Preview */}
        <div className="flex flex-col border-t md:border-t-0 md:border-l border-slate-200">
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2.5 border-b border-slate-200">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-slate-500">live preview</span>
          </div>
          <iframe
            srcDoc={`<!DOCTYPE html><html><body style="padding: 24px; margin: 0; font-family: sans-serif;">${code}</body></html>`}
            className="flex-1 w-full"
            style={{ height: "340px" }}
            title="Code preview"
            sandbox="allow-scripts"
          />
        </div>
      </div>

      {/* Hint */}
      <div className="bg-violet-50 px-4 py-3 border-t border-violet-100">
        <p className="text-xs text-violet-700">
          💡 <strong>Try it:</strong> Change the color, the text, or the button. Every change you make is code — and code is just instructions.
        </p>
      </div>
    </div>
  )
}
