(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/admin/AdminFormHelpers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldGroup",
    ()=>FieldGroup,
    "FormActions",
    ()=>FormActions,
    "NumberInput",
    ()=>NumberInput,
    "SectionCard",
    ()=>SectionCard,
    "SelectInput",
    ()=>SelectInput,
    "StringArrayEditor",
    ()=>StringArrayEditor,
    "TextInput",
    ()=>TextInput,
    "TextareaInput",
    ()=>TextareaInput,
    "Toast",
    ()=>Toast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function FieldGroup({ label, hint, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-sm font-semibold text-gray-700 mb-1",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/admin/AdminFormHelpers.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-gray-400 mb-1.5",
                children: hint
            }, void 0, false, {
                fileName: "[project]/src/components/admin/AdminFormHelpers.tsx",
                lineNumber: 10,
                columnNumber: 16
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/admin/AdminFormHelpers.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = FieldGroup;
function TextInput({ value, onChange, placeholder, required, type = 'text' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        value: value,
        onChange: (e)=>onChange(e.target.value),
        placeholder: placeholder,
        required: required,
        className: "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none transition-all",
        onFocus: (e)=>{
            e.target.style.borderColor = '#08BD80';
            e.target.style.boxShadow = '0 0 0 3px rgba(8,189,128,0.12)';
        },
        onBlur: (e)=>{
            e.target.style.borderColor = '#E5E7EB';
            e.target.style.boxShadow = 'none';
        }
    }, void 0, false, {
        fileName: "[project]/src/components/admin/AdminFormHelpers.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c1 = TextInput;
function NumberInput({ value, onChange, placeholder, min }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: "number",
        value: value,
        onChange: (e)=>onChange(Number(e.target.value)),
        placeholder: placeholder,
        min: min,
        className: "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none transition-all",
        onFocus: (e)=>{
            e.target.style.borderColor = '#08BD80';
            e.target.style.boxShadow = '0 0 0 3px rgba(8,189,128,0.12)';
        },
        onBlur: (e)=>{
            e.target.style.borderColor = '#E5E7EB';
            e.target.style.boxShadow = 'none';
        }
    }, void 0, false, {
        fileName: "[project]/src/components/admin/AdminFormHelpers.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_c2 = NumberInput;
function TextareaInput({ value, onChange, placeholder, rows = 4 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        value: value,
        onChange: (e)=>onChange(e.target.value),
        placeholder: placeholder,
        rows: rows,
        className: "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none transition-all resize-y",
        onFocus: (e)=>{
            e.target.style.borderColor = '#08BD80';
            e.target.style.boxShadow = '0 0 0 3px rgba(8,189,128,0.12)';
        },
        onBlur: (e)=>{
            e.target.style.borderColor = '#E5E7EB';
            e.target.style.boxShadow = 'none';
        }
    }, void 0, false, {
        fileName: "[project]/src/components/admin/AdminFormHelpers.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_c3 = TextareaInput;
function SelectInput({ value, onChange, options }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
        value: value,
        onChange: (e)=>onChange(e.target.value),
        className: "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none transition-all bg-white",
        onFocus: (e)=>{
            e.target.style.borderColor = '#08BD80';
            e.target.style.boxShadow = '0 0 0 3px rgba(8,189,128,0.12)';
        },
        onBlur: (e)=>{
            e.target.style.borderColor = '#E5E7EB';
            e.target.style.boxShadow = 'none';
        },
        children: options.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: o.value,
                children: o.label
            }, o.value, false, {
                fileName: "[project]/src/components/admin/AdminFormHelpers.tsx",
                lineNumber: 86,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/admin/AdminFormHelpers.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
_c4 = SelectInput;
function StringArrayEditor({ label, items, onChange, placeholder }) {
    function update(i, val) {
        const next = [
            ...items
        ];
        next[i] = val;
        onChange(next);
    }
    function remove(i) {
        onChange(items.filter((_, idx)=>idx !== i));
    }
    function add() {
        onChange([
            ...items,
            ''
        ]);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-sm font-semibold text-gray-700 mb-2",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/admin/AdminFormHelpers.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: item,
                                onChange: (e)=>update(i, e.target.value),
                                placeholder: placeholder || 'Enter value...',
                                className: "flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none",
                                onFocus: (e)=>{
                                    e.target.style.borderColor = '#08BD80';
                                },
                                onBlur: (e)=>{
                                    e.target.style.borderColor = '#E5E7EB';
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/AdminFormHelpers.tsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>remove(i),
                                className: "w-9 h-9 flex items-center justify-center rounded-xl text-red-400 hover:bg-red-50 transition-colors text-lg font-bold flex-shrink-0",
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/AdminFormHelpers.tsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/src/components/admin/AdminFormHelpers.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/admin/AdminFormHelpers.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: add,
                className: "mt-2 text-sm font-semibold px-3 py-1.5 rounded-lg border-2 border-dashed transition-colors",
                style: {
                    borderColor: '#08BD80',
                    color: '#08BD80'
                },
                children: "+ Add Item"
            }, void 0, false, {
                fileName: "[project]/src/components/admin/AdminFormHelpers.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/admin/AdminFormHelpers.tsx",
        lineNumber: 112,
        columnNumber: 5
    }, this);
}
_c5 = StringArrayEditor;
function SectionCard({ title, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-2xl border border-gray-100 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 py-4 border-b border-gray-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "font-black text-gray-900",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/src/components/admin/AdminFormHelpers.tsx",
                    lineNumber: 147,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/admin/AdminFormHelpers.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 py-5 space-y-4",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/admin/AdminFormHelpers.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/admin/AdminFormHelpers.tsx",
        lineNumber: 145,
        columnNumber: 5
    }, this);
}
_c6 = SectionCard;
function FormActions({ loading, onCancel, saveLabel = 'Save Changes' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-3 justify-end",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onCancel,
                className: "px-6 py-2.5 rounded-xl font-semibold text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors",
                children: "Cancel"
            }, void 0, false, {
                fileName: "[project]/src/components/admin/AdminFormHelpers.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                disabled: loading,
                className: "px-6 py-2.5 rounded-xl font-bold text-white text-sm transition-opacity disabled:opacity-60",
                style: {
                    background: '#08BD80'
                },
                children: loading ? 'Saving...' : saveLabel
            }, void 0, false, {
                fileName: "[project]/src/components/admin/AdminFormHelpers.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/admin/AdminFormHelpers.tsx",
        lineNumber: 160,
        columnNumber: 5
    }, this);
}
_c7 = FormActions;
function Toast({ message, type }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-lg text-white font-semibold text-sm ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`,
        children: [
            type === 'success' ? '✓ ' : '✗ ',
            message
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/admin/AdminFormHelpers.tsx",
        lineNumber: 178,
        columnNumber: 5
    }, this);
}
_c8 = Toast;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "FieldGroup");
__turbopack_context__.k.register(_c1, "TextInput");
__turbopack_context__.k.register(_c2, "NumberInput");
__turbopack_context__.k.register(_c3, "TextareaInput");
__turbopack_context__.k.register(_c4, "SelectInput");
__turbopack_context__.k.register(_c5, "StringArrayEditor");
__turbopack_context__.k.register(_c6, "SectionCard");
__turbopack_context__.k.register(_c7, "FormActions");
__turbopack_context__.k.register(_c8, "Toast");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/admin/RichTextEditor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RichTextEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
// Lightweight markdown → HTML, used to migrate old markdown posts into the editor.
function markdownToHtml(src) {
    const lines = src.split('\n');
    const out = [];
    let i = 0;
    while(i < lines.length){
        const line = lines[i];
        if (line.startsWith('### ')) {
            out.push(`<h3>${line.slice(4)}</h3>`);
            i++;
        } else if (line.startsWith('## ')) {
            out.push(`<h2>${line.slice(3)}</h2>`);
            i++;
        } else if (line.startsWith('- ')) {
            const items = [];
            while(i < lines.length && lines[i].startsWith('- ')){
                items.push(`<li>${inline(lines[i].slice(2))}</li>`);
                i++;
            }
            out.push(`<ul>${items.join('')}</ul>`);
        } else if (/^\d+\.\s/.test(line)) {
            const items = [];
            while(i < lines.length && /^\d+\.\s/.test(lines[i])){
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
function inline(s) {
    return s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}
function looksLikeHtml(s) {
    return /<(p|h2|h3|ul|ol|li|img|strong|em|blockquote|a|br)\b/i.test(s);
}
function RichTextEditor({ value, onChange }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const savedRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [words, setWords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Seed the editor once on mount (uncontrolled to keep the caret stable).
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RichTextEditor.useEffect": ()=>{
            if (!ref.current) return;
            const initial = value ? looksLikeHtml(value) ? value : markdownToHtml(value) : '';
            ref.current.innerHTML = initial;
            countWords();
            try {
                document.execCommand('styleWithCSS', false, 'true');
            } catch  {}
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["RichTextEditor.useEffect"], []);
    // Remember the last selection inside the editor so toolbar controls that steal
    // focus (e.g. the native colour picker) can still apply to the right text.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RichTextEditor.useEffect": ()=>{
            function onSelChange() {
                const sel = window.getSelection();
                if (sel && sel.rangeCount && ref.current?.contains(sel.getRangeAt(0).commonAncestorContainer)) {
                    savedRange.current = sel.getRangeAt(0).cloneRange();
                }
            }
            document.addEventListener('selectionchange', onSelChange);
            return ({
                "RichTextEditor.useEffect": ()=>document.removeEventListener('selectionchange', onSelChange)
            })["RichTextEditor.useEffect"];
        }
    }["RichTextEditor.useEffect"], []);
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
    function exec(cmd, val) {
        ref.current?.focus();
        restoreSelection();
        document.execCommand(cmd, false, val);
        emit();
    }
    function addLink() {
        const url = prompt('Enter URL (https://...)');
        if (url) exec('createLink', url);
    }
    function insertImage(url) {
        ref.current?.focus();
        document.execCommand('insertHTML', false, `<img src="${url}" alt="" />`);
        emit();
    }
    async function handleImageFile(file) {
        if (!file.type.startsWith('image/')) return;
        setUploading(true);
        const form = new FormData();
        form.append('file', file);
        try {
            const res = await fetch('/api/admin/media', {
                method: 'POST',
                body: form
            });
            if (res.ok) {
                const { url } = await res.json();
                insertImage(url);
            } else {
                alert('Image upload failed');
            }
        } catch  {
            alert('Image upload failed');
        }
        setUploading(false);
    }
    const groups = [
        [
            {
                label: '↶',
                title: 'Undo',
                cmd: 'undo'
            },
            {
                label: '↷',
                title: 'Redo',
                cmd: 'redo'
            }
        ],
        [
            {
                label: 'B',
                title: 'Bold',
                cmd: 'bold',
                bold: true
            },
            {
                label: 'I',
                title: 'Italic',
                cmd: 'italic'
            },
            {
                label: 'U',
                title: 'Underline',
                cmd: 'underline'
            },
            {
                label: 'S',
                title: 'Strikethrough',
                cmd: 'strikeThrough'
            }
        ],
        [
            {
                label: '• List',
                title: 'Bullet list',
                cmd: 'insertUnorderedList'
            },
            {
                label: '1. List',
                title: 'Numbered list',
                cmd: 'insertOrderedList'
            },
            {
                label: '⇤',
                title: 'Decrease indent',
                cmd: 'outdent'
            },
            {
                label: '⇥',
                title: 'Increase indent',
                cmd: 'indent'
            }
        ],
        [
            {
                label: '⯇',
                title: 'Align left',
                cmd: 'justifyLeft'
            },
            {
                label: '☰',
                title: 'Align center',
                cmd: 'justifyCenter'
            },
            {
                label: '⯈',
                title: 'Align right',
                cmd: 'justifyRight'
            }
        ],
        [
            {
                label: '❝ Quote',
                title: 'Quote',
                cmd: 'formatBlock',
                value: 'BLOCKQUOTE'
            },
            {
                label: '</>',
                title: 'Code block',
                cmd: 'formatBlock',
                value: 'PRE'
            },
            {
                label: '― HR',
                title: 'Divider line',
                cmd: 'insertHorizontalRule'
            }
        ],
        [
            {
                label: '🔗 Link',
                title: 'Insert link',
                action: addLink
            },
            {
                label: '⛓ Unlink',
                title: 'Remove link',
                cmd: 'unlink'
            }
        ],
        [
            {
                label: '✕ Clear',
                title: 'Clear formatting',
                cmd: 'removeFormat'
            }
        ]
    ];
    const btnClass = 'min-w-[34px] px-2 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 transition-all';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-478ee50cf22d3a42" + " " + "rte-wrap",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-478ee50cf22d3a42" + " " + "flex flex-wrap items-center gap-1 p-2 border border-gray-200 rounded-t-xl bg-gray-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        title: "Text style",
                        defaultValue: "",
                        onMouseDown: ()=>{},
                        onChange: (e)=>{
                            exec('formatBlock', e.target.value);
                            e.target.value = '';
                        },
                        className: "jsx-478ee50cf22d3a42" + " " + "px-2 py-1.5 rounded-lg text-sm text-gray-700 bg-white border border-gray-200 font-semibold focus:outline-none cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                disabled: true,
                                className: "jsx-478ee50cf22d3a42",
                                children: "Style ▾"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                                lineNumber: 197,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "P",
                                className: "jsx-478ee50cf22d3a42",
                                children: "Paragraph"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "H2",
                                className: "jsx-478ee50cf22d3a42",
                                children: "Heading 1"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                                lineNumber: 199,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "H3",
                                className: "jsx-478ee50cf22d3a42",
                                children: "Heading 2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                                lineNumber: 200,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "H4",
                                className: "jsx-478ee50cf22d3a42",
                                children: "Heading 3"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this),
                    groups.map((group, gi)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-478ee50cf22d3a42" + " " + "flex items-center gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-478ee50cf22d3a42" + " " + "w-px h-6 bg-gray-200 mx-0.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                                    lineNumber: 206,
                                    columnNumber: 13
                                }, this),
                                group.map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        title: b.title,
                                        onMouseDown: (e)=>e.preventDefault(),
                                        onClick: ()=>b.action ? b.action() : exec(b.cmd, b.value),
                                        style: {
                                            fontWeight: b.bold ? 800 : 600,
                                            fontStyle: b.title === 'Italic' ? 'italic' : 'normal',
                                            textDecoration: b.title === 'Strikethrough' ? 'line-through' : b.title === 'Underline' ? 'underline' : 'none'
                                        },
                                        className: "jsx-478ee50cf22d3a42" + " " + (btnClass || ""),
                                        children: b.label
                                    }, b.title, false, {
                                        fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                                        lineNumber: 208,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, gi, true, {
                            fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                            lineNumber: 205,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "jsx-478ee50cf22d3a42" + " " + "w-px h-6 bg-gray-200 mx-0.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                        lineNumber: 224,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        title: "Text colour",
                        onMouseDown: (e)=>e.preventDefault(),
                        className: "jsx-478ee50cf22d3a42" + " " + (btnClass + ' flex items-center gap-1 cursor-pointer relative' || ""),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: '#ef4444'
                                },
                                className: "jsx-478ee50cf22d3a42" + " " + "font-bold",
                                children: "A"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                                lineNumber: 227,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-478ee50cf22d3a42" + " " + "text-[10px]",
                                children: "▾"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                                lineNumber: 228,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "color",
                                defaultValue: "#ef4444",
                                onChange: (e)=>exec('foreColor', e.target.value),
                                className: "jsx-478ee50cf22d3a42" + " " + "absolute inset-0 opacity-0 cursor-pointer"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                                lineNumber: 229,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        title: "Highlight colour",
                        onMouseDown: (e)=>e.preventDefault(),
                        className: "jsx-478ee50cf22d3a42" + " " + (btnClass + ' flex items-center gap-1 cursor-pointer relative' || ""),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    background: '#fde047'
                                },
                                className: "jsx-478ee50cf22d3a42" + " " + "px-1 rounded font-bold",
                                children: "H"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                                lineNumber: 235,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-478ee50cf22d3a42" + " " + "text-[10px]",
                                children: "▾"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                                lineNumber: 236,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "color",
                                defaultValue: "#fde047",
                                onChange: (e)=>exec('hiliteColor', e.target.value),
                                className: "jsx-478ee50cf22d3a42" + " " + "absolute inset-0 opacity-0 cursor-pointer"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                                lineNumber: 237,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "jsx-478ee50cf22d3a42" + " " + "w-px h-6 bg-gray-200 mx-0.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                        lineNumber: 243,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        title: "Upload image",
                        onMouseDown: (e)=>e.preventDefault(),
                        onClick: ()=>fileRef.current?.click(),
                        disabled: uploading,
                        style: {
                            background: '#08BD80'
                        },
                        className: "jsx-478ee50cf22d3a42" + " " + "px-3 py-1.5 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-all disabled:opacity-60",
                        children: uploading ? 'Uploading…' : '🖼 Image'
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                        lineNumber: 244,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: fileRef,
                        type: "file",
                        accept: "image/*",
                        onChange: (e)=>{
                            const f = e.target.files?.[0];
                            if (f) handleImageFile(f);
                            if (fileRef.current) fileRef.current.value = '';
                        },
                        className: "jsx-478ee50cf22d3a42" + " " + "hidden"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                        lineNumber: 255,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: ref,
                contentEditable: true,
                suppressContentEditableWarning: true,
                onInput: emit,
                onBlur: emit,
                "data-placeholder": "Write your blog post here… Use the toolbar for headings, bold, lists, quotes and images.",
                className: "jsx-478ee50cf22d3a42" + " " + "rte-content w-full min-h-[420px] px-5 py-4 border border-t-0 border-gray-200 text-sm leading-relaxed focus:outline-none"
            }, void 0, false, {
                fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                lineNumber: 268,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-478ee50cf22d3a42" + " " + "flex items-center justify-between px-4 py-2 border border-t-0 border-gray-200 rounded-b-xl bg-gray-50 text-xs text-gray-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "jsx-478ee50cf22d3a42",
                        children: [
                            words,
                            " ",
                            words === 1 ? 'word' : 'words'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                        lineNumber: 279,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "jsx-478ee50cf22d3a42",
                        children: "Rich text · auto-saved to draft on publish"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                        lineNumber: 280,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/RichTextEditor.tsx",
                lineNumber: 278,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "478ee50cf22d3a42",
                children: ".rte-content:empty:before{content:attr(data-placeholder);color:#9ca3af}.rte-content:focus{border-color:#08bd80;box-shadow:0 0 0 3px #08bd801f}.rte-content h2{color:#0d1837;margin:1.2rem 0 .6rem;font-size:1.4rem;font-weight:800}.rte-content h3{color:#1f2937;margin:1rem 0 .4rem;font-size:1.15rem;font-weight:700}.rte-content h4{color:#374151;margin:.9rem 0 .3rem;font-size:1.02rem;font-weight:700}.rte-content p{color:#374151;margin:.6rem 0}.rte-content ul{margin:.6rem 0;padding-left:1.5rem;list-style:outside}.rte-content ol{margin:.6rem 0;padding-left:1.5rem;list-style:decimal}.rte-content li{color:#374151;margin:.3rem 0}.rte-content blockquote{color:#4b5563;border-left:3px solid #08bd80;margin:.8rem 0;padding-left:1rem;font-style:italic}.rte-content pre{color:#e2e8f0;white-space:pre-wrap;background:#0d1837;border-radius:.6rem;margin:.8rem 0;padding:.9rem 1rem;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.85rem;overflow-x:auto}.rte-content hr{border:none;border-top:2px solid #e5e7eb;margin:1.2rem 0}.rte-content a{color:#08bd80;text-decoration:underline}.rte-content img{border-radius:.75rem;max-width:100%;margin:1rem 0}.rte-content strong{font-weight:700}.rte-content s,.rte-content strike{text-decoration:line-through}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/admin/RichTextEditor.tsx",
        lineNumber: 187,
        columnNumber: 5
    }, this);
}
_s(RichTextEditor, "kraj6T4HUKYqIroUfiOh3WU42Rk=");
_c = RichTextEditor;
var _c;
__turbopack_context__.k.register(_c, "RichTextEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/blogCategories.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BLOG_CATEGORIES",
    ()=>BLOG_CATEGORIES,
    "BLOG_CATEGORY_COLORS",
    ()=>BLOG_CATEGORY_COLORS,
    "categoryColor",
    ()=>categoryColor
]);
const BLOG_CATEGORIES = [
    'Legal',
    'Current Affairs',
    'Law Preparation'
];
const BLOG_CATEGORY_COLORS = {
    Legal: '#6366f1',
    'Current Affairs': '#f97316',
    'Law Preparation': '#08BD80'
};
function categoryColor(category) {
    return BLOG_CATEGORY_COLORS[category] || '#08BD80';
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/admin/blogs/BlogForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BlogForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$AdminFormHelpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/AdminFormHelpers.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$RichTextEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/RichTextEditor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$blogCategories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/blogCategories.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function BlogForm({ blog, isNew }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        ...blog
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [preview, setPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BlogForm.useEffect": ()=>{
            fetch('/api/admin/categories').then({
                "BlogForm.useEffect": (r)=>r.json()
            }["BlogForm.useEffect"]).then({
                "BlogForm.useEffect": (d)=>{
                    if (Array.isArray(d)) setCategories(d);
                }
            }["BlogForm.useEffect"]).catch({
                "BlogForm.useEffect": ()=>{}
            }["BlogForm.useEffect"]);
        }
    }["BlogForm.useEffect"], []);
    const CATEGORY_COLORS = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$blogCategories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOG_CATEGORY_COLORS"],
        ...Object.fromEntries(categories.map((c)=>[
                c.name,
                c.color
            ]))
    };
    const CATEGORIES = categories.length ? categories.map((c)=>({
            value: c.name,
            label: c.name
        })) : [
        {
            value: data.category,
            label: data.category
        }
    ].filter((c)=>c.value);
    function sanitizeSlug(raw) {
        return raw.toLowerCase().replace(/[^a-z0-9\s-]/g, '') // strip special chars
        .trim().replace(/\s+/g, '-') // spaces → hyphens
        .replace(/-+/g, '-'); // collapse multiple hyphens
    }
    function set(key, val) {
        // When title changes on a NEW blog and slug is still empty/title-derived, auto-fill slug
        if (key === 'title' && isNew) {
            setData((d)=>({
                    ...d,
                    title: val,
                    slug: sanitizeSlug(val)
                }));
            return;
        }
        // When slug is manually edited, sanitize it
        if (key === 'slug') {
            setData((d)=>({
                    ...d,
                    slug: sanitizeSlug(val)
                }));
            return;
        }
        setData((d)=>({
                ...d,
                [key]: val
            }));
    }
    function showToast(msg, type) {
        setToast({
            msg,
            type
        });
        setTimeout(()=>setToast(null), 3000);
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        // Auto-set category color
        const updatedData = {
            ...data,
            categoryColor: CATEGORY_COLORS[data.category] || '#08BD80'
        };
        try {
            const url = isNew ? '/api/admin/blogs' : `/api/admin/blogs/${blog.slug}`;
            const method = isNew ? 'POST' : 'PUT';
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            if (!res.ok) throw new Error('Failed');
            showToast(isNew ? 'Blog published!' : 'Blog saved!', 'success');
            setTimeout(()=>router.push('/admin/blogs'), 1000);
        } catch  {
            showToast('Error saving blog', 'error');
        }
        setLoading(false);
    }
    async function handleDelete() {
        if (!confirm('Delete this blog post?')) return;
        await fetch(`/api/admin/blogs/${blog.slug}`, {
            method: 'DELETE'
        });
        router.push('/admin/blogs');
    }
    // Content from the rich editor is already HTML. Old posts may still be markdown.
    function renderPreview(content) {
        if (/<(p|h2|h3|ul|ol|li|img|strong|em|blockquote|a|br)\b/i.test(content)) return content;
        return content.replace(/^## (.+)$/gm, '<h2 class="text-xl font-black text-gray-900 mt-6 mb-3">$1</h2>').replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-gray-800 mt-5 mb-2">$1</h3>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-gray-700">$1</li>').replace(/\n\n/g, '</p><p class="text-gray-700 leading-relaxed mb-4">').replace(/^(?!<[h|l])(.+)$/gm, '<p class="text-gray-700 leading-relaxed mb-4">$1</p>');
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            toast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$AdminFormHelpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toast"], {
                message: toast.msg,
                type: toast.type
            }, void 0, false, {
                fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                lineNumber: 107,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 mb-6 flex-wrap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.back(),
                        className: "text-gray-400 hover:text-gray-700",
                        children: "← Back"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-black text-gray-900",
                        children: isNew ? 'New Blog Post' : 'Edit Blog'
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ml-auto flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setPreview(!preview),
                                className: "text-sm font-semibold px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors",
                                children: preview ? '✏️ Edit' : '👁 Preview'
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            !isNew && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleDelete,
                                className: "text-sm font-semibold px-4 py-2 rounded-xl text-red-500 border border-red-200 hover:bg-red-50 transition-colors",
                                children: "🗑 Delete"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            preview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-4xl",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl border border-gray-100 p-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-bold px-3 py-1 rounded-full",
                                style: {
                                    background: `${CATEGORY_COLORS[data.category] || '#08BD80'}20`,
                                    color: CATEGORY_COLORS[data.category] || '#08BD80'
                                },
                                children: data.category
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                lineNumber: 128,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                            lineNumber: 127,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-black text-gray-900 mt-4 mb-3",
                            children: data.title || 'Untitled Post'
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                            lineNumber: 133,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500 text-lg mb-4",
                            children: data.excerpt
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                            lineNumber: 134,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 text-sm text-gray-400 mb-8 pb-6 border-b border-gray-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "By ",
                                        data.author
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                    lineNumber: 136,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "·"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                    lineNumber: 137,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: data.date
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                    lineNumber: 138,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "·"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                    lineNumber: 139,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: data.readTime
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                    lineNumber: 140,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                            lineNumber: 135,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "blog-content max-w-none",
                            dangerouslySetInnerHTML: {
                                __html: renderPreview(data.content)
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                            lineNumber: 142,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                    lineNumber: 126,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                lineNumber: 125,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "space-y-6 max-w-4xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$AdminFormHelpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionCard"], {
                        title: "Post Details",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$AdminFormHelpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldGroup"], {
                                label: "Title",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$AdminFormHelpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextInput"], {
                                    value: data.title,
                                    onChange: (v)=>set('title', v),
                                    placeholder: "e.g. CLAT 2026: Complete Guide...",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                    lineNumber: 149,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                lineNumber: 148,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$AdminFormHelpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldGroup"], {
                                label: isNew ? 'Slug (auto-generated)' : 'Slug',
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 relative",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: data.slug,
                                                    onChange: (e)=>set('slug', e.target.value),
                                                    placeholder: "auto-generated from title",
                                                    readOnly: isNew,
                                                    className: "w-full px-3 py-2 rounded-xl border border-gray-200 text-sm font-mono outline-none",
                                                    style: {
                                                        background: isNew ? '#f9fafb' : '#fff',
                                                        color: '#374151',
                                                        cursor: isNew ? 'default' : 'text'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                                    lineNumber: 155,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                                lineNumber: 154,
                                                columnNumber: 17
                                            }, this),
                                            !isNew && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>set('slug', sanitizeSlug(data.title)),
                                                className: "flex-shrink-0 px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap",
                                                children: "🔄 Regenerate"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                                lineNumber: 166,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                        lineNumber: 153,
                                        columnNumber: 15
                                    }, this),
                                    isNew && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-400 mt-1",
                                        children: [
                                            "URL: /blogs/",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-gray-600",
                                                children: data.slug || '…'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                                lineNumber: 176,
                                                columnNumber: 71
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                        lineNumber: 176,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                lineNumber: 152,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$AdminFormHelpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldGroup"], {
                                label: "Excerpt",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$AdminFormHelpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextareaInput"], {
                                    value: data.excerpt,
                                    onChange: (v)=>set('excerpt', v),
                                    rows: 2,
                                    placeholder: "Short summary shown in blog listing..."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                    lineNumber: 180,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                lineNumber: 179,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid md:grid-cols-3 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$AdminFormHelpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldGroup"], {
                                        label: "Category",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$AdminFormHelpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectInput"], {
                                            value: data.category,
                                            onChange: (v)=>set('category', v),
                                            options: CATEGORIES
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                            lineNumber: 184,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                        lineNumber: 183,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$AdminFormHelpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldGroup"], {
                                        label: "Author",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$AdminFormHelpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextInput"], {
                                            value: data.author,
                                            onChange: (v)=>set('author', v),
                                            placeholder: "e.g. A.K. Singh"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                            lineNumber: 187,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                        lineNumber: 186,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$AdminFormHelpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldGroup"], {
                                        label: "Read Time",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$AdminFormHelpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextInput"], {
                                            value: data.readTime,
                                            onChange: (v)=>set('readTime', v),
                                            placeholder: "e.g. 8 min read"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                            lineNumber: 190,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                        lineNumber: 189,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                lineNumber: 182,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                        lineNumber: 147,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$AdminFormHelpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionCard"], {
                        title: "Content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-400 mb-2",
                                children: "Use the toolbar to format — headings, bold, bullet/numbered lists, quotes, links and inline images."
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                lineNumber: 196,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$RichTextEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                value: data.content,
                                onChange: (html)=>set('content', html)
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                                lineNumber: 199,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                        lineNumber: 195,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$AdminFormHelpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionCard"], {
                        title: "Tags",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$AdminFormHelpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringArrayEditor"], {
                            label: "",
                            items: data.tags,
                            onChange: (v)=>set('tags', v),
                            placeholder: "e.g. CLAT 2026"
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                            lineNumber: 203,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                        lineNumber: 202,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$AdminFormHelpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormActions"], {
                        loading: loading,
                        onCancel: ()=>router.push('/admin/blogs'),
                        saveLabel: isNew ? 'Publish Post' : 'Save Changes'
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                        lineNumber: 206,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
                lineNumber: 146,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/blogs/BlogForm.tsx",
        lineNumber: 106,
        columnNumber: 5
    }, this);
}
_s(BlogForm, "PGPBno7IeQDs7y5ANEudcMfWeXY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = BlogForm;
var _c;
__turbopack_context__.k.register(_c, "BlogForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/client-only/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/node_modules/styled-jsx/dist/index/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
__turbopack_context__.r("[project]/node_modules/next/dist/compiled/client-only/index.js [app-client] (ecmascript)");
var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
function _interopDefaultLegacy(e) {
    return e && typeof e === 'object' && 'default' in e ? e : {
        'default': e
    };
}
var React__default = /*#__PURE__*/ _interopDefaultLegacy(React);
/*
Based on Glamor's sheet
https://github.com/threepointone/glamor/blob/667b480d31b3721a905021b26e1290ce92ca2879/src/sheet.js
*/ function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
var isProd = typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== "undefined" && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env && ("TURBOPACK compile-time value", "development") === "production";
var isString = function(o) {
    return Object.prototype.toString.call(o) === "[object String]";
};
var StyleSheet = /*#__PURE__*/ function() {
    function StyleSheet(param) {
        var ref = param === void 0 ? {} : param, _name = ref.name, name = _name === void 0 ? "stylesheet" : _name, _optimizeForSpeed = ref.optimizeForSpeed, optimizeForSpeed = _optimizeForSpeed === void 0 ? isProd : _optimizeForSpeed;
        invariant$1(isString(name), "`name` must be a string");
        this._name = name;
        this._deletedRulePlaceholder = "#" + name + "-deleted-rule____{}";
        invariant$1(typeof optimizeForSpeed === "boolean", "`optimizeForSpeed` must be a boolean");
        this._optimizeForSpeed = optimizeForSpeed;
        this._serverSheet = undefined;
        this._tags = [];
        this._injected = false;
        this._rulesCount = 0;
        var node = typeof window !== "undefined" && document.querySelector('meta[property="csp-nonce"]');
        this._nonce = node ? node.getAttribute("content") : null;
    }
    var _proto = StyleSheet.prototype;
    _proto.setOptimizeForSpeed = function setOptimizeForSpeed(bool) {
        invariant$1(typeof bool === "boolean", "`setOptimizeForSpeed` accepts a boolean");
        invariant$1(this._rulesCount === 0, "optimizeForSpeed cannot be when rules have already been inserted");
        this.flush();
        this._optimizeForSpeed = bool;
        this.inject();
    };
    _proto.isOptimizeForSpeed = function isOptimizeForSpeed() {
        return this._optimizeForSpeed;
    };
    _proto.inject = function inject() {
        var _this = this;
        invariant$1(!this._injected, "sheet already injected");
        this._injected = true;
        if (typeof window !== "undefined" && this._optimizeForSpeed) {
            this._tags[0] = this.makeStyleTag(this._name);
            this._optimizeForSpeed = "insertRule" in this.getSheet();
            if (!this._optimizeForSpeed) {
                if ("TURBOPACK compile-time truthy", 1) {
                    console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode.");
                }
                this.flush();
                this._injected = true;
            }
            return;
        }
        this._serverSheet = {
            cssRules: [],
            insertRule: function(rule, index) {
                if (typeof index === "number") {
                    _this._serverSheet.cssRules[index] = {
                        cssText: rule
                    };
                } else {
                    _this._serverSheet.cssRules.push({
                        cssText: rule
                    });
                }
                return index;
            },
            deleteRule: function(index) {
                _this._serverSheet.cssRules[index] = null;
            }
        };
    };
    _proto.getSheetForTag = function getSheetForTag(tag) {
        if (tag.sheet) {
            return tag.sheet;
        }
        // this weirdness brought to you by firefox
        for(var i = 0; i < document.styleSheets.length; i++){
            if (document.styleSheets[i].ownerNode === tag) {
                return document.styleSheets[i];
            }
        }
    };
    _proto.getSheet = function getSheet() {
        return this.getSheetForTag(this._tags[this._tags.length - 1]);
    };
    _proto.insertRule = function insertRule(rule, index) {
        invariant$1(isString(rule), "`insertRule` accepts only strings");
        if (typeof window === "undefined") {
            if (typeof index !== "number") {
                index = this._serverSheet.cssRules.length;
            }
            this._serverSheet.insertRule(rule, index);
            return this._rulesCount++;
        }
        if (this._optimizeForSpeed) {
            var sheet = this.getSheet();
            if (typeof index !== "number") {
                index = sheet.cssRules.length;
            }
            // this weirdness for perf, and chrome's weird bug
            // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
            try {
                sheet.insertRule(rule, index);
            } catch (error) {
                if ("TURBOPACK compile-time truthy", 1) {
                    console.warn("StyleSheet: illegal rule: \n\n" + rule + "\n\nSee https://stackoverflow.com/q/20007992 for more info");
                }
                return -1;
            }
        } else {
            var insertionPoint = this._tags[index];
            this._tags.push(this.makeStyleTag(this._name, rule, insertionPoint));
        }
        return this._rulesCount++;
    };
    _proto.replaceRule = function replaceRule(index, rule) {
        if (this._optimizeForSpeed || typeof window === "undefined") {
            var sheet = typeof window !== "undefined" ? this.getSheet() : this._serverSheet;
            if (!rule.trim()) {
                rule = this._deletedRulePlaceholder;
            }
            if (!sheet.cssRules[index]) {
                // @TBD Should we throw an error?
                return index;
            }
            sheet.deleteRule(index);
            try {
                sheet.insertRule(rule, index);
            } catch (error) {
                if ("TURBOPACK compile-time truthy", 1) {
                    console.warn("StyleSheet: illegal rule: \n\n" + rule + "\n\nSee https://stackoverflow.com/q/20007992 for more info");
                }
                // In order to preserve the indices we insert a deleteRulePlaceholder
                sheet.insertRule(this._deletedRulePlaceholder, index);
            }
        } else {
            var tag = this._tags[index];
            invariant$1(tag, "old rule at index `" + index + "` not found");
            tag.textContent = rule;
        }
        return index;
    };
    _proto.deleteRule = function deleteRule(index) {
        if (typeof window === "undefined") {
            this._serverSheet.deleteRule(index);
            return;
        }
        if (this._optimizeForSpeed) {
            this.replaceRule(index, "");
        } else {
            var tag = this._tags[index];
            invariant$1(tag, "rule at index `" + index + "` not found");
            tag.parentNode.removeChild(tag);
            this._tags[index] = null;
        }
    };
    _proto.flush = function flush() {
        this._injected = false;
        this._rulesCount = 0;
        if (typeof window !== "undefined") {
            this._tags.forEach(function(tag) {
                return tag && tag.parentNode.removeChild(tag);
            });
            this._tags = [];
        } else {
            // simpler on server
            this._serverSheet.cssRules = [];
        }
    };
    _proto.cssRules = function cssRules() {
        var _this = this;
        if (typeof window === "undefined") {
            return this._serverSheet.cssRules;
        }
        return this._tags.reduce(function(rules, tag) {
            if (tag) {
                rules = rules.concat(Array.prototype.map.call(_this.getSheetForTag(tag).cssRules, function(rule) {
                    return rule.cssText === _this._deletedRulePlaceholder ? null : rule;
                }));
            } else {
                rules.push(null);
            }
            return rules;
        }, []);
    };
    _proto.makeStyleTag = function makeStyleTag(name, cssString, relativeToTag) {
        if (cssString) {
            invariant$1(isString(cssString), "makeStyleTag accepts only strings as second parameter");
        }
        var tag = document.createElement("style");
        if (this._nonce) tag.setAttribute("nonce", this._nonce);
        tag.type = "text/css";
        tag.setAttribute("data-" + name, "");
        if (cssString) {
            tag.appendChild(document.createTextNode(cssString));
        }
        var head = document.head || document.getElementsByTagName("head")[0];
        if (relativeToTag) {
            head.insertBefore(tag, relativeToTag);
        } else {
            head.appendChild(tag);
        }
        return tag;
    };
    _createClass(StyleSheet, [
        {
            key: "length",
            get: function get() {
                return this._rulesCount;
            }
        }
    ]);
    return StyleSheet;
}();
function invariant$1(condition, message) {
    if (!condition) {
        throw new Error("StyleSheet: " + message + ".");
    }
}
function hash(str) {
    var _$hash = 5381, i = str.length;
    while(i){
        _$hash = _$hash * 33 ^ str.charCodeAt(--i);
    }
    /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */ return _$hash >>> 0;
}
var stringHash = hash;
var sanitize = function(rule) {
    return rule.replace(/\/style/gi, "\\/style");
};
var cache = {};
/**
 * computeId
 *
 * Compute and memoize a jsx id from a basedId and optionally props.
 */ function computeId(baseId, props) {
    if (!props) {
        return "jsx-" + baseId;
    }
    var propsToString = String(props);
    var key = baseId + propsToString;
    if (!cache[key]) {
        cache[key] = "jsx-" + stringHash(baseId + "-" + propsToString);
    }
    return cache[key];
}
/**
 * computeSelector
 *
 * Compute and memoize dynamic selectors.
 */ function computeSelector(id, css) {
    var selectoPlaceholderRegexp = /__jsx-style-dynamic-selector/g;
    // Sanitize SSR-ed CSS.
    // Client side code doesn't need to be sanitized since we use
    // document.createTextNode (dev) and the CSSOM api sheet.insertRule (prod).
    if (typeof window === "undefined") {
        css = sanitize(css);
    }
    var idcss = id + css;
    if (!cache[idcss]) {
        cache[idcss] = css.replace(selectoPlaceholderRegexp, id);
    }
    return cache[idcss];
}
function mapRulesToStyle(cssRules, options) {
    if (options === void 0) options = {};
    return cssRules.map(function(args) {
        var id = args[0];
        var css = args[1];
        return /*#__PURE__*/ React__default["default"].createElement("style", {
            id: "__" + id,
            // Avoid warnings upon render with a key
            key: "__" + id,
            nonce: options.nonce ? options.nonce : undefined,
            dangerouslySetInnerHTML: {
                __html: css
            }
        });
    });
}
var StyleSheetRegistry = /*#__PURE__*/ function() {
    function StyleSheetRegistry(param) {
        var ref = param === void 0 ? {} : param, _styleSheet = ref.styleSheet, styleSheet = _styleSheet === void 0 ? null : _styleSheet, _optimizeForSpeed = ref.optimizeForSpeed, optimizeForSpeed = _optimizeForSpeed === void 0 ? false : _optimizeForSpeed;
        this._sheet = styleSheet || new StyleSheet({
            name: "styled-jsx",
            optimizeForSpeed: optimizeForSpeed
        });
        this._sheet.inject();
        if (styleSheet && typeof optimizeForSpeed === "boolean") {
            this._sheet.setOptimizeForSpeed(optimizeForSpeed);
            this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
        }
        this._fromServer = undefined;
        this._indices = {};
        this._instancesCounts = {};
    }
    var _proto = StyleSheetRegistry.prototype;
    _proto.add = function add(props) {
        var _this = this;
        if (undefined === this._optimizeForSpeed) {
            this._optimizeForSpeed = Array.isArray(props.children);
            this._sheet.setOptimizeForSpeed(this._optimizeForSpeed);
            this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
        }
        if (typeof window !== "undefined" && !this._fromServer) {
            this._fromServer = this.selectFromServer();
            this._instancesCounts = Object.keys(this._fromServer).reduce(function(acc, tagName) {
                acc[tagName] = 0;
                return acc;
            }, {});
        }
        var ref = this.getIdAndRules(props), styleId = ref.styleId, rules = ref.rules;
        // Deduping: just increase the instances count.
        if (styleId in this._instancesCounts) {
            this._instancesCounts[styleId] += 1;
            return;
        }
        var indices = rules.map(function(rule) {
            return _this._sheet.insertRule(rule);
        }) // Filter out invalid rules
        .filter(function(index) {
            return index !== -1;
        });
        this._indices[styleId] = indices;
        this._instancesCounts[styleId] = 1;
    };
    _proto.remove = function remove(props) {
        var _this = this;
        var styleId = this.getIdAndRules(props).styleId;
        invariant(styleId in this._instancesCounts, "styleId: `" + styleId + "` not found");
        this._instancesCounts[styleId] -= 1;
        if (this._instancesCounts[styleId] < 1) {
            var tagFromServer = this._fromServer && this._fromServer[styleId];
            if (tagFromServer) {
                tagFromServer.parentNode.removeChild(tagFromServer);
                delete this._fromServer[styleId];
            } else {
                this._indices[styleId].forEach(function(index) {
                    return _this._sheet.deleteRule(index);
                });
                delete this._indices[styleId];
            }
            delete this._instancesCounts[styleId];
        }
    };
    _proto.update = function update(props, nextProps) {
        this.add(nextProps);
        this.remove(props);
    };
    _proto.flush = function flush() {
        this._sheet.flush();
        this._sheet.inject();
        this._fromServer = undefined;
        this._indices = {};
        this._instancesCounts = {};
    };
    _proto.cssRules = function cssRules() {
        var _this = this;
        var fromServer = this._fromServer ? Object.keys(this._fromServer).map(function(styleId) {
            return [
                styleId,
                _this._fromServer[styleId]
            ];
        }) : [];
        var cssRules = this._sheet.cssRules();
        return fromServer.concat(Object.keys(this._indices).map(function(styleId) {
            return [
                styleId,
                _this._indices[styleId].map(function(index) {
                    return cssRules[index].cssText;
                }).join(_this._optimizeForSpeed ? "" : "\n")
            ];
        }) // filter out empty rules
        .filter(function(rule) {
            return Boolean(rule[1]);
        }));
    };
    _proto.styles = function styles(options) {
        return mapRulesToStyle(this.cssRules(), options);
    };
    _proto.getIdAndRules = function getIdAndRules(props) {
        var css = props.children, dynamic = props.dynamic, id = props.id;
        if (dynamic) {
            var styleId = computeId(id, dynamic);
            return {
                styleId: styleId,
                rules: Array.isArray(css) ? css.map(function(rule) {
                    return computeSelector(styleId, rule);
                }) : [
                    computeSelector(styleId, css)
                ]
            };
        }
        return {
            styleId: computeId(id),
            rules: Array.isArray(css) ? css : [
                css
            ]
        };
    };
    /**
   * selectFromServer
   *
   * Collects style tags from the document with id __jsx-XXX
   */ _proto.selectFromServer = function selectFromServer() {
        var elements = Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]'));
        return elements.reduce(function(acc, element) {
            var id = element.id.slice(2);
            acc[id] = element;
            return acc;
        }, {});
    };
    return StyleSheetRegistry;
}();
function invariant(condition, message) {
    if (!condition) {
        throw new Error("StyleSheetRegistry: " + message + ".");
    }
}
var StyleSheetContext = /*#__PURE__*/ React.createContext(null);
StyleSheetContext.displayName = "StyleSheetContext";
function createStyleRegistry() {
    return new StyleSheetRegistry();
}
function StyleRegistry(param) {
    var configuredRegistry = param.registry, children = param.children;
    var rootRegistry = React.useContext(StyleSheetContext);
    var ref = React.useState({
        "StyleRegistry.useState[ref]": function() {
            return rootRegistry || configuredRegistry || createStyleRegistry();
        }
    }["StyleRegistry.useState[ref]"]), registry = ref[0];
    return /*#__PURE__*/ React__default["default"].createElement(StyleSheetContext.Provider, {
        value: registry
    }, children);
}
function useStyleRegistry() {
    return React.useContext(StyleSheetContext);
}
// Opt-into the new `useInsertionEffect` API in React 18, fallback to `useLayoutEffect`.
// https://github.com/reactwg/react-18/discussions/110
var useInsertionEffect = React__default["default"].useInsertionEffect || React__default["default"].useLayoutEffect;
var defaultRegistry = typeof window !== "undefined" ? createStyleRegistry() : undefined;
function JSXStyle(props) {
    var registry = defaultRegistry ? defaultRegistry : useStyleRegistry();
    // If `registry` does not exist, we do nothing here.
    if (!registry) {
        return null;
    }
    if (typeof window === "undefined") {
        registry.add(props);
        return null;
    }
    useInsertionEffect({
        "JSXStyle.useInsertionEffect": function() {
            registry.add(props);
            return ({
                "JSXStyle.useInsertionEffect": function() {
                    registry.remove(props);
                }
            })["JSXStyle.useInsertionEffect"];
        // props.children can be string[], will be striped since id is identical
        }
    }["JSXStyle.useInsertionEffect"], [
        props.id,
        String(props.dynamic)
    ]);
    return null;
}
JSXStyle.dynamic = function(info) {
    return info.map(function(tagInfo) {
        var baseId = tagInfo[0];
        var props = tagInfo[1];
        return computeId(baseId, props);
    }).join(" ");
};
exports.StyleRegistry = StyleRegistry;
exports.createStyleRegistry = createStyleRegistry;
exports.style = JSXStyle;
exports.useStyleRegistry = useStyleRegistry;
}),
"[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/styled-jsx/dist/index/index.js [app-client] (ecmascript)").style;
}),
]);

//# sourceMappingURL=_0xax-kr._.js.map