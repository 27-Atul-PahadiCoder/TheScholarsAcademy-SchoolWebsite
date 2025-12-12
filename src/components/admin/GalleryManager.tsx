import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Upload,
  ImageIcon,
  Loader2,
  Trash2,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
} from "lucide-react";
import { galleryApi } from "../../api/gallery";
import { buildAssetUrl } from "../../api/http";
import { SUBOPTIONS_LOCKS } from "../../config/suboptionsLocks";
import type { GalleryPhoto } from "../../types/gallery";

interface PageOption {
  id: string;
  label: string;
  category: string;
}

export function GalleryManager() {
  const pageOptions = useMemo<PageOption[]>(() => {
    return Object.entries(SUBOPTIONS_LOCKS).flatMap(([category, items]) =>
      items.map((item) => ({ id: item.id, label: item.label, category }))
    );
  }, []);

  const [selectedSlug, setSelectedSlug] = useState(pageOptions[0]?.id ?? "");
  const [items, setItems] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [captionDrafts, setCaptionDrafts] = useState<Record<string, string>>(
    {}
  );

  const syncDrafts = useCallback((photos: GalleryPhoto[]) => {
    setCaptionDrafts((prev) => {
      const next: Record<string, string> = {};
      photos.forEach((photo) => {
        next[photo.id] = prev[photo.id] ?? photo.caption ?? "";
      });
      return next;
    });
  }, []);

  const loadItems = useCallback(async () => {
    if (!selectedSlug) return;
    setLoading(true);
    setError("");
    try {
      const data = await galleryApi.listAdmin(selectedSlug);
      setItems(data);
      syncDrafts(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load gallery";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [selectedSlug, syncDrafts]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setError("Select an image before uploading");
      return;
    }
    setError("");
    setUploading(true);
    setStatus("Uploading media...");
    try {
      const uploaded = await galleryApi.upload(
        selectedSlug,
        file,
        caption.trim() || undefined
      );
      setItems((prev) => {
        const next = [uploaded, ...prev];
        syncDrafts(next);
        return next;
      });
      setCaption("");
      setFile(null);
      const input = document.querySelector<HTMLInputElement>(
        "#gallery-file-input"
      );
      if (input) input.value = "";
      setStatus("Media uploaded successfully");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setError(message);
      setStatus("");
    } finally {
      setUploading(false);
      setTimeout(() => setStatus(""), 2500);
    }
  };

  const handleCaptionSave = async (photoId: string) => {
    const nextCaption = captionDrafts[photoId] ?? "";
    setError("");
    try {
      const updated = await galleryApi.update(selectedSlug, photoId, {
        caption: nextCaption,
      });
      setItems((prev) => {
        const next = prev.map((item) => (item.id === photoId ? updated : item));
        syncDrafts(next);
        return next;
      });
      setStatus("Caption updated");
      setTimeout(() => setStatus(""), 2000);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Caption update failed";
      setError(message);
      setStatus("");
    }
  };

  const handleToggleActive = async (photoId: string, nextState: boolean) => {
    setError("");
    try {
      const updated = await galleryApi.update(selectedSlug, photoId, {
        isActive: nextState,
      });
      setItems((prev) => {
        const next = prev.map((item) => (item.id === photoId ? updated : item));
        syncDrafts(next);
        return next;
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Update failed";
      setError(message);
      setStatus("");
    }
  };

  const handleDelete = async (photoId: string) => {
    if (!window.confirm("Delete this gallery item?")) return;
    setError("");
    try {
      await galleryApi.remove(selectedSlug, photoId);
      setItems((prev) => {
        const next = prev.filter((item) => item.id !== photoId);
        syncDrafts(next);
        return next;
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Delete failed";
      setError(message);
      setStatus("");
    }
  };

  const currentPage = pageOptions.find((option) => option.id === selectedSlug);

  return (
    <section className="space-y-8 mt-12">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-xl p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-500 font-semibold">
              Gallery Control Room
            </p>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Manage Photos per Page
            </h2>
            {currentPage && (
              <p className="text-slate-600">
                Editing{" "}
                <span className="font-semibold">{currentPage.label}</span> (
                {currentPage.category})
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <label className="text-sm font-semibold text-slate-700">
              Choose page
            </label>
            <select
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              className="border border-slate-300 rounded-2xl px-4 py-2 font-medium text-slate-800"
            >
              {pageOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <form
          onSubmit={handleUpload}
          className="mt-8 grid gap-4 md:grid-cols-3"
        >
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Caption / Context
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What does this photo highlight?"
              className="w-full border border-slate-300 rounded-2xl px-4 py-3 min-h-[96px] focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <div className="flex flex-col gap-3 border border-dashed border-emerald-300 rounded-3xl p-4 bg-emerald-50/50">
            <label className="text-sm font-semibold text-slate-700">
              Upload image
            </label>
            <input
              id="gallery-file-input"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-slate-600"
            />
            <button
              type="submit"
              disabled={!file || uploading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-white font-semibold px-4 py-2 disabled:bg-slate-300"
            >
              {uploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              Upload Photo
            </button>
          </div>
        </form>

        {(status || error) && (
          <div
            className={`mt-4 rounded-2xl px-4 py-3 text-sm font-semibold flex items-center gap-2 ${
              error
                ? "bg-red-50 text-red-600 border border-red-200"
                : "bg-emerald-50 text-emerald-600 border border-emerald-200"
            }`}
          >
            {error ? (
              <AlertCircle className="w-4 h-4" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            {error || status}
          </div>
        )}
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-500" />
            Uploaded Highlights
          </h3>
          <button
            onClick={loadItems}
            className="text-sm font-semibold inline-flex items-center gap-2 text-emerald-600"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            Refresh
          </button>
        </div>

        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="h-52 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="text-center py-12 text-slate-500 font-medium border border-dashed border-slate-200 rounded-3xl">
            No media yet for this subpage.
          </div>
        )}

        {!loading && items.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.id}
                className="border border-slate-200 rounded-3xl overflow-hidden bg-white flex flex-col"
              >
                <div className="relative">
                  <img
                    src={buildAssetUrl(item.mediaUrl)}
                    alt={item.caption ?? "Gallery item"}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => handleToggleActive(item.id, !item.isActive)}
                    className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold flex items-center gap-1 ${
                      item.isActive
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {item.isActive ? (
                      <Eye className="w-3.5 h-3.5" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5" />
                    )}
                    {item.isActive ? "Visible" : "Hidden"}
                  </button>
                </div>
                <div className="flex-1 flex flex-col gap-3 p-4">
                  <label className="text-xs font-semibold text-slate-500">
                    Caption
                  </label>
                  <textarea
                    value={captionDrafts[item.id] ?? ""}
                    onChange={(e) =>
                      setCaptionDrafts((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                    className="w-full border border-slate-200 rounded-2xl px-3 py-2 text-sm flex-1"
                    rows={3}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleCaptionSave(item.id)}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 text-white text-sm font-semibold px-3 py-2"
                    >
                      <Check className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex items-center justify-center gap-1 rounded-2xl bg-red-50 text-red-600 text-sm font-semibold px-3 py-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
