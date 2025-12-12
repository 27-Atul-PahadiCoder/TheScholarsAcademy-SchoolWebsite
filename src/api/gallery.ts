import { request } from "./http";
import type { GalleryPhoto } from "../types/gallery";

export const galleryApi = {
  listPublic(slug: string) {
    return request<GalleryPhoto[]>(`/galleries/${slug}`);
  },
  listAdmin(slug: string) {
    return request<GalleryPhoto[]>(`/galleries/${slug}/admin`, {
      auth: true,
    });
  },
  upload(slug: string, file: File, caption?: string) {
    const formData = new FormData();
    formData.append("file", file);
    if (caption) {
      formData.append("caption", caption);
    }
    return request<GalleryPhoto>(`/galleries/${slug}/photos`, {
      method: "POST",
      body: formData,
      auth: true,
    });
  },
  update(
    slug: string,
    photoId: string,
    payload: Partial<
      Pick<GalleryPhoto, "caption" | "displayOrder" | "isActive">
    >
  ) {
    return request<GalleryPhoto>(`/galleries/${slug}/photos/${photoId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      auth: true,
    });
  },
  remove(slug: string, photoId: string) {
    return request<{ success: boolean }>(
      `/galleries/${slug}/photos/${photoId}`,
      {
        method: "DELETE",
        auth: true,
      }
    );
  },
};
