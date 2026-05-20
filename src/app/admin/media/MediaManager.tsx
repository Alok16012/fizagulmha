'use client';
import { useState, useEffect, useRef } from 'react';
import { Toast } from '@/components/admin/AdminFormHelpers';

interface MediaFile {
  name: string;
  url: string;
}

export default function MediaManager() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function showToast(msg: string, type: 'success' | 'error') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function fetchFiles() {
    setLoading(true);
    const res = await fetch('/api/admin/media');
    if (res.ok) setFiles(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchFiles(); }, []);

  async function uploadFile(file: File) {
    if (!file.type.startsWith('image/')) {
      showToast('Only image files allowed', 'error');
      return;
    }
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    const res = await fetch('/api/admin/media', { method: 'POST', body: form });
    if (res.ok) {
      showToast('Image uploaded!', 'success');
      fetchFiles();
    } else {
      showToast('Upload failed', 'error');
    }
    setUploading(false);
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) await uploadFile(file);
    if (fileRef.current) fileRef.current.value = '';
  }

  async function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) await uploadFile(file);
  }

  async function handleDelete(name: string) {
    if (!confirm('Delete this image?')) return;
    const res = await fetch('/api/admin/media', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      showToast('Image deleted', 'success');
      fetchFiles();
    }
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  }

  const imageFiles = files.filter((f) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f.name));

  return (
    <div>
      {toast && <Toast message={toast.msg} type={toast.type} />}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Media Library</h1>
          <p className="text-gray-500 text-sm mt-0.5">{imageFiles.length} images</p>
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="px-5 py-2.5 rounded-xl font-bold text-white text-sm disabled:opacity-60"
          style={{ background: '#08BD80' }}>
          {uploading ? 'Uploading...' : '⬆ Upload Image'}
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all mb-6"
        style={{ borderColor: dragOver ? '#08BD80' : '#E5E7EB', background: dragOver ? '#E6FAF4' : 'white' }}>
        <div className="text-4xl mb-3">🖼️</div>
        <div className="font-semibold text-gray-700">Drop images here or click to upload</div>
        <div className="text-sm text-gray-400 mt-1">Supports JPG, PNG, GIF, WebP, SVG</div>
      </div>

      {/* Image Grid */}
      {loading ? (
        <div className="text-center py-10 text-gray-400">Loading...</div>
      ) : imageFiles.length === 0 ? (
        <div className="text-center py-10 text-gray-400">No images uploaded yet</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {imageFiles.map((file) => (
            <div key={file.name} className="bg-white rounded-2xl border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
              <div className="aspect-square bg-gray-50 relative overflow-hidden">
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => copyUrl(file.url)}
                    className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-sm hover:bg-gray-100 transition-colors"
                    title="Copy URL">
                    {copied === file.url ? '✓' : '🔗'}
                  </button>
                  <button
                    onClick={() => handleDelete(file.name)}
                    className="w-9 h-9 bg-red-500 rounded-xl flex items-center justify-center text-white text-sm hover:bg-red-600 transition-colors"
                    title="Delete">
                    🗑
                  </button>
                </div>
              </div>
              <div className="px-3 py-2">
                <div className="text-xs text-gray-500 truncate" title={file.name}>{file.name}</div>
                <button
                  onClick={() => copyUrl(file.url)}
                  className="text-xs font-semibold mt-1 transition-colors"
                  style={{ color: '#08BD80' }}>
                  {copied === file.url ? '✓ Copied!' : 'Copy URL'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Public folder images */}
      <div className="mt-8">
        <h2 className="text-lg font-black text-gray-900 mb-3">💡 Use uploaded images</h2>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-sm text-gray-600 mb-3">
            After uploading, copy the URL and paste it into any form field that accepts an image URL
            (e.g., Faculty photo, Blog cover, Course banner).
          </p>
          <div className="font-mono text-xs bg-gray-50 rounded-xl px-4 py-3 text-gray-600">
            Example URL: <span style={{ color: '#08BD80' }}>/uploads/1234567890-photo.jpg</span>
          </div>
        </div>
      </div>
    </div>
  );
}
