import React from "react";
import { AppLanguage, TRANSLATIONS } from "./translations";

interface MarkdownRendererProps {
  content: string;
  language?: AppLanguage;
}

export default function MarkdownRenderer({ content, language = "en" }: MarkdownRendererProps) {
  const t = TRANSLATIONS[language];
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  
  let currentList: { type: "ordered" | "unordered"; items: React.ReactNode[] } | null = null;
  let currentTable: { headers: string[]; rows: string[][] } | null = null;
  let currentCodeBlock: { language: string; lines: string[] } | null = null;

  const pushPendingBlocks = () => {
    if (currentList) {
      if (currentList.type === "unordered") {
        blocks.push(
          <ul key={`ul-${blocks.length}`} className="list-disc list-outside ml-6 my-4 space-y-2 text-slate-700 dark:text-slate-300 font-sans" id={`ul-list-${blocks.length}`}>
            {currentList.items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        );
      } else {
        blocks.push(
          <ol key={`ol-${blocks.length}`} className="list-decimal list-outside ml-6 my-4 space-y-2 text-slate-700 dark:text-slate-300 font-sans" id={`ol-list-${blocks.length}`}>
            {currentList.items.map((item, i) => <li key={i}>{item}</li>)}
          </ol>
        );
      }
      currentList = null;
    }

    if (currentTable) {
      blocks.push(
        <div key={`table-wrapper-${blocks.length}`} className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm" id={`table-container-${blocks.length}`}>
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                {currentTable.headers.map((header, i) => (
                  <th key={i} className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider font-sans">
                    {renderInlineText(header.trim())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-950 divide-y divide-slate-100 dark:divide-slate-900">
              {currentTable.rows.map((row, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white dark:bg-slate-950" : "bg-slate-50/50 dark:bg-slate-900/20"}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300 font-sans">
                      {renderInlineText(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      currentTable = null;
    }

    if (currentCodeBlock) {
      const codeText = currentCodeBlock.lines.join("\n");
      const blockIndex = blocks.length;
      blocks.push(
        <div key={`code-${blockIndex}`} className="relative my-6 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 shadow-md group" id={`code-block-${blockIndex}`}>
          <div className="flex items-center justify-between px-4 py-2 bg-slate-950/80 border-b border-slate-800/60 text-xs text-slate-400 font-mono">
            <span>{currentCodeBlock.language || "code"}</span>
            <button
              onClick={(e) => {
                navigator.clipboard.writeText(codeText);
                const btn = e.currentTarget;
                const originalText = btn.innerText;
                btn.innerText = t.copied;
                btn.style.color = "#10b981"; // emerald color
                setTimeout(() => {
                  btn.innerText = originalText;
                  btn.style.color = "";
                }, 2000);
              }}
              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer text-[10px]"
              title="Copy code"
              id={`copy-btn-${blockIndex}`}
            >
              {t.copy}
            </button>
          </div>
          <pre className="p-4 overflow-x-auto font-mono text-sm leading-relaxed text-slate-200">
            <code>{codeText}</code>
          </pre>
        </div>
      );
      currentCodeBlock = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("```")) {
      if (currentCodeBlock) {
        pushPendingBlocks();
      } else {
        pushPendingBlocks();
        const language = line.slice(3).trim();
        currentCodeBlock = { language, lines: [] };
      }
      continue;
    }

    if (currentCodeBlock) {
      currentCodeBlock.lines.push(line);
      continue;
    }

    // 2. Table handling
    const isTableLine = line.trim().startsWith("|") && line.trim().endsWith("|");
    if (isTableLine) {
      const parts = line.split("|").slice(1, -1);
      
      // Check for separator row (e.g., |---|---|)
      const isSeparator = parts.every(part => {
        const trimmed = part.trim();
        return trimmed.startsWith(":") || trimmed.startsWith("-") || trimmed.endsWith(":") || trimmed === "";
      }) && parts.some(part => part.includes("-"));

      if (isSeparator) {
        // It's a separator line, skip it but it validates table structure
        continue;
      }

      if (!currentTable) {
        pushPendingBlocks();
        currentTable = { headers: parts, rows: [] };
      } else {
        currentTable.rows.push(parts);
      }
      continue;
    } else if (currentTable) {
      // If table was active but line is not part of table, resolve it
      pushPendingBlocks();
    }

    // 3. Headers
    if (line.startsWith("## ")) {
      pushPendingBlocks();
      blocks.push(
        <h2 key={`h2-${i}`} className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 mt-8 mb-4 font-sans border-b border-slate-100 dark:border-slate-900 pb-2 flex items-center" id={`h2-${i}`}>
          {renderInlineText(line.slice(3))}
        </h2>
      );
      continue;
    }

    if (line.startsWith("### ")) {
      pushPendingBlocks();
      blocks.push(
        <h3 key={`h3-${i}`} className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100 mt-6 mb-3 font-sans" id={`h3-${i}`}>
          {renderInlineText(line.slice(4))}
        </h3>
      );
      continue;
    }

    // 4. Horizontal dividers
    if (line.trim() === "---") {
      pushPendingBlocks();
      blocks.push(
        <hr key={`hr-${i}`} className="my-8 border-slate-200 dark:border-slate-800" id={`hr-${i}`} />
      );
      continue;
    }

    // 5. Unordered List Items
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      const cleanLine = line.trim().startsWith("- ") ? line.trim().slice(2) : line.trim().slice(2);
      if (!currentList || currentList.type !== "unordered") {
        pushPendingBlocks();
        currentList = { type: "unordered", items: [renderInlineText(cleanLine)] };
      } else {
        currentList.items.push(renderInlineText(cleanLine));
      }
      continue;
    }

    // 6. Ordered List Items
    const matchOrdered = line.trim().match(/^(\d+)\.\s(.*)/);
    if (matchOrdered) {
      const cleanLine = matchOrdered[2];
      if (!currentList || currentList.type !== "ordered") {
        pushPendingBlocks();
        currentList = { type: "ordered", items: [renderInlineText(cleanLine)] };
      } else {
        currentList.items.push(renderInlineText(cleanLine));
      }
      continue;
    }

    // 7. Empty line handling
    if (line.trim() === "") {
      pushPendingBlocks();
      continue;
    }

    // 8. Regular paragraph
    pushPendingBlocks();
    blocks.push(
      <p key={`p-${i}`} className="my-4 text-base text-slate-700 dark:text-slate-300 font-sans leading-relaxed break-words" id={`para-${i}`}>
        {renderInlineText(line)}
      </p>
    );
  }

  // Clear any final remaining blocks
  pushPendingBlocks();

  return <div className="space-y-1">{blocks}</div>;
}

// Inline formatting: Bold, italic, LaTeX Math
function renderInlineText(text: string): React.ReactNode {
  // Regex to match $...$ for LaTeX equations
  // Regex to match **...** for Bold
  // We can do a simple parsing by splitting parts.

  // First check if there is any inline elements: Math or Bold
  if (!text.includes("$") && !text.includes("**") && !text.includes("`")) {
    return text;
  }

  const parts: React.ReactNode[] = [];
  let currentIndex = 0;

  while (currentIndex < text.length) {
    let nextMath = text.indexOf("$", currentIndex);
    let nextBold = text.indexOf("**", currentIndex);
    let nextCode = text.indexOf("`", currentIndex);

    // Filter out indices that are not found (-1)
    const indices = [
      { type: "math", index: nextMath },
      { type: "bold", index: nextBold },
      { type: "code", index: nextCode }
    ].filter(item => item.index !== -1);

    if (indices.length === 0) {
      // Add remainder
      parts.push(text.slice(currentIndex));
      break;
    }

    // Pick the closest token
    indices.sort((a, b) => a.index - b.index);
    const closest = indices[0];

    // Add plain text before the token
    if (closest.index > currentIndex) {
      parts.push(text.slice(currentIndex, closest.index));
    }

    if (closest.type === "math") {
      // Find matching $
      const closingIndex = text.indexOf("$", closest.index + 1);
      if (closingIndex !== -1) {
        const mathExpr = text.slice(closest.index + 1, closingIndex);
        parts.push(
          <span 
            key={`math-${closest.index}`} 
            className="inline-block px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 font-serif italic text-[0.95em] tracking-wide shadow-sm border border-amber-100/50 dark:border-amber-900/20"
            title="LaTeX equation"
          >
            {mathExpr}
          </span>
        );
        currentIndex = closingIndex + 1;
      } else {
        parts.push("$");
        currentIndex = closest.index + 1;
      }
    } else if (closest.type === "bold") {
      // Find matching **
      const closingIndex = text.indexOf("**", closest.index + 2);
      if (closingIndex !== -1) {
        const boldText = text.slice(closest.index + 2, closingIndex);
        parts.push(
          <strong key={`bold-${closest.index}`} className="font-semibold text-slate-900 dark:text-slate-100">
            {boldText}
          </strong>
        );
        currentIndex = closingIndex + 2;
      } else {
        parts.push("**");
        currentIndex = closest.index + 2;
      }
    } else if (closest.type === "code") {
      // Find matching `
      const closingIndex = text.indexOf("`", closest.index + 1);
      if (closingIndex !== -1) {
        const codeText = text.slice(closest.index + 1, closingIndex);
        parts.push(
          <code key={`code-${closest.index}`} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-rose-600 dark:text-rose-400 font-mono text-sm border border-slate-200/50 dark:border-slate-800/50">
            {codeText}
          </code>
        );
        currentIndex = closingIndex + 1;
      } else {
        parts.push("`");
        currentIndex = closest.index + 1;
      }
    }
  }

  return <>{parts}</>;
}
