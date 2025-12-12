import { useCallback, useEffect, useState } from "react";
import { galleryApi } from "../api/gallery";
import type { GalleryPhoto } from "../types/gallery";

export function useGallery(slug: string) {
  const [items, setItems] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    try {
      const data = await galleryApi.listPublic(slug);
      setItems(data);
      setError(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load gallery";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
}
