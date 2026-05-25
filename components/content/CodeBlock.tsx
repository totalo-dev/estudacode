"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "javascript" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="relative group">
      <div className="flex items-center justify-between bg-surface border border-card rounded-t-lg px-4 py-2">
        <span className="text-xs text-secondary font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="text-secondary hover:text-text transition-colors"
          aria-label="Copiar código"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      <pre className="bg-card border border-t-0 border-card rounded-b-lg p-4 overflow-x-auto">
        <code className="text-sm text-text font-mono">{code}</code>
      </pre>
    </div>
  );
}
