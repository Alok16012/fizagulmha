'use client';
import { useEffect, useRef, useState } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

// Lightweight markdown → HTML, used to migrate old markdown posts into the editor.
function markdownToHtml(src: string): string {
  const lines = src.split('\n');
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('### ')) {
      out.push(`<h3>${line.slice(4)}</h3>`);
      i++;
    } else if (line.startsWith('## ')) {
      out.push(`<h2>${line.slice(3)}</h2>`);
      i++;
    } else if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(`<li>${inline(lines[i].slice(2))}</li>`);
        i++;
      }
      out.push(`<ul>${items.join('')}</ul>`);
    } else if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^\d+\.\s/, ''))}</li>`);
        i++;
      }
      out.push(`<ol>${items.join('')}</ol>`);
    } else if (line.trim()) {
      out.push(`<p>${inline(line)}</p>`);
      i++;
    } else {
      i++;
    }
  }
  return out.join('');
}

function inline(s: string): string {
  return s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

function looksLikeHtml(s: string): boolean {
  return /<(p|h2|h3|ul|ol|li|img|strong|em|blockquote|a|br)\b/i.test(s);
}

type ToolButton = {
  label: string;
  title: string;
  cmd?: string;
  value?: string;
  action?: () => void;
  bold?: boolean;
};

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const savedRange = useRef<Range | null>(null);
  const [uploading, setUploading] = useState(false);
  const [words, setWords] = useState(0);

  // Seed the editor once on mount (uncontrolled to keep the caret stable).
  useEffect(() => {
    if (!ref.current) return;
    const initial = value ? (looksLikeHtml(value) ? value : markdownToHtml(value)) : '';
    ref.current.innerHTML = initial;
    countWords();
    try { document.execCommand('styleWithCSS', false, 'true'); } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Remember the last selection inside the editor so toolbar controls that steal
  // focus (e.g. the native colour picker) can still apply to the right text.
  useEffect(() => {
    function onSelChange() {
      const sel = window.getSelection();
      if (sel && sel.rangeCount && ref.current?.contains(sel.getRangeAt(0).commonAncestorContainer)) {
        savedRange.current = sel.getRangeAt(0).cloneRange();
      }
    }
    document.addEventListener('selectionchange', onSelChange);
    return () => document.removeEventListener('selectionchange', onSelChange);
  }, []);

  function countWords() {
    const text = ref.current?.innerText.trim() || '';
    setWords(text ? text.split(/\s+/).length : 0);
  }

  function restoreSelection() {
    const sel = window.getSelection();
    if (savedRange.current && sel) {
      sel.removeAllRanges();
      sel.addRange(savedRange.current);
    }
  }

  function emit() {
    if (ref.current) onChange(ref.current.innerHTML);
    countWords();
  }

  function exec(cmd: string, val?: string) {
    ref.current?.focus();
    restoreSelection();
    document.execCommand(cmd, false, val);
    emit();
  }

  function addLink() {
    const url = prompt('Enter URL (https://...)');
    if (url) exec('createLink', url);
  }

  // Keyboard shortcuts (Ctrl/Cmd + key)
  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const mod = e.ctrlKey || e.metaKey;
    if (!mod) return;
    const key = e.key.toLowerCase();
    if (key === 'b') { e.preventDefault(); exec('bold'); }
    else if (key === 'i') { e.preventDefault(); exec('italic'); }
    else if (key === 'u') { e.preventDefault(); exec('underline'); }
    else if (key === 'z' && !e.shiftKey) { e.preventDefault(); exec('undo'); }
    else if (key === 'z' && e.shiftKey) { e.preventDefault(); exec('redo'); }
    else if (key === 'y') { e.preventDefault(); exec('redo'); }
    else if (key === 'k') { e.preventDefault(); addLink(); }
  }

  function insertImage(url: string) {
    ref.current?.focus();
    restoreSelection();
    document.execCommand('insertHTML', false, `<img src="${url}" alt="" />`);
    emit();
  }

  async function handleImageFile(file: File) {
    if (!file.type.startsWith('image/')) return;
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch('/api/admin/media', { method: 'POST', body: form });
      if (res.ok) {
        const { url } = await res.json();
        insertImage(url);
      } else {
        alert('Image upload failed');
      }
    } catch {
      alert('Image upload failed');
    }
    setUploading(false);
  }

  const groups: ToolButton[][] = [
    [
      { label: '↶', title: 'Undo', cmd: 'undo' },
      { label: '↷', title: 'Redo', cmd: 'redo' },
    ],
    [
      { label: 'B', title: 'Bold', cmd: 'bold', bold: true },
      { label: 'I', title: 'Italic', cmd: 'italic' },
      { label: 'U', title: 'Underline', cmd: 'underline' },
      { label: 'S', title: 'Strikethrough', cmd: 'strikeThrough' },
    ],
    [
      { label: '• List', title: 'Bullet list', cmd: 'insertUnorderedList' },
      { label: '1. List', title: 'Numbered list', cmd: 'insertOrderedList' },
      { label: '⇤', title: 'Decrease indent', cmd: 'outdent' },
      { label: '⇥', title: 'Increase indent', cmd: 'indent' },
    ],
    [
      { label: '⯇', title: 'Align left', cmd: 'justifyLeft' },
      { label: '☰', title: 'Align center', cmd: 'justifyCenter' },
      { label: '⯈', title: 'Align right', cmd: 'justifyRight' },
      { label: '≡', title: 'Justify', cmd: 'justifyFull' },
    ],
    [
      { label: '❝ Quote', title: 'Quote', cmd: 'formatBlock', value: 'BLOCKQUOTE' },
      { label: '</>', title: 'Code block', cmd: 'formatBlock', value: 'PRE' },
      { label: '― HR', title: 'Divider line', cmd: 'insertHorizontalRule' },
    ],
    [
      { label: '🔗 Link', title: 'Insert link', action: addLink },
      { label: '⛓ Unlink', title: 'Remove link', cmd: 'unlink' },
    ],
    [
      { label: '✕ Clear', title: 'Clear formatting', cmd: 'removeFormat' },
    ],
  ];

  const btnClass = 'min-w-[34px] px-2 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 transition-all';

  return (
    <div className="rte-wrap">
      <div className="flex flex-wrap items-center gap-1 p-2 border border-gray-200 rounded-t-xl bg-gray-50 sticky top-0 z-20 shadow-sm">
        {/* Block format */}
        <select
          title="Text style"
          defaultValue=""
          onMouseDown={() => {}}
          onChange={(e) => { exec('formatBlock', e.target.value); e.target.value = ''; }}
          className="px-2 py-1.5 rounded-lg text-sm text-gray-700 bg-white border border-gray-200 font-semibold focus:outline-none cursor-pointer"
        >
          <option value="" disabled>Style ▾</option>
          <option value="P">Paragraph</option>
          <option value="H2">Heading 1</option>
          <option value="H3">Heading 2</option>
          <option value="H4">Heading 3</option>
        </select>

        {groups.map((group, gi) => (
          <div key={gi} className="flex items-center gap-1">
            <span className="w-px h-6 bg-gray-200 mx-0.5" />
            {group.map((b) => (
              <button
                key={b.title}
                type="button"
                title={b.title}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => (b.action ? b.action() : exec(b.cmd!, b.value))}
                className={btnClass}
                style={{ fontWeight: b.bold ? 800 : 600, fontStyle: b.title === 'Italic' ? 'italic' : 'normal', textDecoration: b.title === 'Strikethrough' ? 'line-through' : b.title === 'Underline' ? 'underline' : 'none' }}
              >
                {b.label}
              </button>
            ))}
          </div>
        ))}

        {/* Colours */}
        <span className="w-px h-6 bg-gray-200 mx-0.5" />
        <label title="Text colour" onMouseDown={(e) => e.preventDefault()}
          className={btnClass + ' flex items-center gap-1 cursor-pointer relative'}>
          <span className="font-bold" style={{ color: '#ef4444' }}>A</span>
          <span className="text-[10px]">▾</span>
          <input type="color" defaultValue="#ef4444"
            onChange={(e) => exec('foreColor', e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer" />
        </label>
        <label title="Highlight colour" onMouseDown={(e) => e.preventDefault()}
          className={btnClass + ' flex items-center gap-1 cursor-pointer relative'}>
          <span className="px-1 rounded font-bold" style={{ background: '#fde047' }}>H</span>
          <span className="text-[10px]">▾</span>
          <input type="color" defaultValue="#fde047"
            onChange={(e) => exec('hiliteColor', e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer" />
        </label>

        {/* Image */}
        <span className="w-px h-6 bg-gray-200 mx-0.5" />
        <button
          type="button"
          title="Upload image"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="px-3 py-1.5 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-all disabled:opacity-60"
          style={{ background: '#08BD80' }}
        >
          {uploading ? 'Uploading…' : '🖼 Image'}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleImageFile(f);
            if (fileRef.current) fileRef.current.value = '';
          }}
        />
      </div>

      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        onBlur={emit}
        onKeyDown={handleKeyDown}
        className="rte-content w-full min-h-[420px] px-5 py-4 border border-t-0 border-gray-200 text-sm leading-relaxed focus:outline-none"
        data-placeholder="Write your blog post here… Use the toolbar for headings, bold, lists, quotes and images."
      />

      <div className="flex items-center justify-between px-4 py-2 border border-t-0 border-gray-200 rounded-b-xl bg-gray-50 text-xs text-gray-400">
        <span>{words} {words === 1 ? 'word' : 'words'}</span>
        <span title="Ctrl+B Bold · Ctrl+I Italic · Ctrl+U Underline · Ctrl+Z Undo · Ctrl+K Link">
          ⌨ Ctrl+B/I/U · Rich text
        </span>
      </div>

      <style jsx global>{`
        .rte-content:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
        }
        .rte-content:focus { border-color: #08BD80; box-shadow: 0 0 0 3px rgba(8, 189, 128, 0.12); }
        .rte-content h2 { font-size: 1.4rem; font-weight: 800; color: #0d1837; margin: 1.2rem 0 0.6rem; }
        .rte-content h3 { font-size: 1.15rem; font-weight: 700; color: #1f2937; margin: 1rem 0 0.4rem; }
        .rte-content h4 { font-size: 1.02rem; font-weight: 700; color: #374151; margin: 0.9rem 0 0.3rem; }
        .rte-content p { margin: 0.6rem 0; color: #374151; }
        .rte-content ul { list-style: disc; padding-left: 1.5rem; margin: 0.6rem 0; }
        .rte-content ol { list-style: decimal; padding-left: 1.5rem; margin: 0.6rem 0; }
        .rte-content li { margin: 0.3rem 0; color: #374151; }
        .rte-content blockquote { border-left: 3px solid #08BD80; padding-left: 1rem; margin: 0.8rem 0; color: #4b5563; font-style: italic; }
        .rte-content pre { background: #0d1837; color: #e2e8f0; padding: 0.9rem 1rem; border-radius: 0.6rem; margin: 0.8rem 0; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.85rem; white-space: pre-wrap; overflow-x: auto; }
        .rte-content hr { border: none; border-top: 2px solid #e5e7eb; margin: 1.2rem 0; }
        .rte-content a { color: #08BD80; text-decoration: underline; }
        .rte-content img { max-width: 100%; border-radius: 0.75rem; margin: 1rem 0; }
        .rte-content strong { font-weight: 700; }
        .rte-content s, .rte-content strike { text-decoration: line-through; }
      `}</style>
    </div>
  );
}
