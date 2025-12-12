import { RefreshCcw } from "lucide-react";
import { buildAssetUrl } from "../../api/http";
import { useGallery } from "../../hooks/useGallery";
import type { GalleryPhoto } from "../../types/gallery";

interface GallerySectionProps {
  slug: string;
  title?: string;
  description?: string;
  layout?: "grid" | "masonry";
}

const gridClassMap: Record<
  NonNullable<GallerySectionProps["layout"]>,
  string
> = {
  grid: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  masonry:
    "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 [&>figure:nth-child(odd)]:row-span-2",
};

const cardHeights: Record<
  NonNullable<GallerySectionProps["layout"]>,
  string
> = {
  grid: "h-64",
  masonry: "h-64 lg:h-auto lg:min-h-[18rem]",
};

function renderPhoto(
  photo: GalleryPhoto,
  layout: GallerySectionProps["layout"] = "grid"
) {
  const src = buildAssetUrl(photo.mediaUrl);
  return (
    <figure
      key={photo.id}
      className="relative group rounded-3xl overflow-hidden shadow-lg shadow-slate-900/10 border border-white/40 bg-white/10 backdrop-blur"
    >
      <img
        src={src}
        alt={photo.caption ?? "Gallery highlight"}
        className={`w-full object-cover transition duration-500 group-hover:scale-105 ${cardHeights[layout]}`}
        loading="lazy"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 text-white text-sm">
        {photo.caption ?? "Untitled highlight"}
      </figcaption>
    </figure>
  );
}

export function GallerySection({
  slug,
  title = "Photo Highlights",
  description,
  layout = "grid",
}: GallerySectionProps) {
  const { items, loading, refresh } = useGallery(slug);

  if (!slug) return null;
  const hasItems = items.length > 0;

  // Fail silently until gallery data exists so core pages remain static-friendly
  if (!hasItems) {
    return null;
  }

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-12">
      <div
        className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-blue-50 to-white"
        aria-hidden
      />
      <div className="relative max-w-6xl mx-auto space-y-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-500 font-semibold">
              Immersive Learning
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">
              {title}
            </h2>
            {description && (
              <p className="text-slate-600 max-w-2xl mt-3 text-base">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 border border-emerald-300 rounded-full text-emerald-700 hover:bg-white"
            disabled={loading}
          >
            <RefreshCcw
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-3xl h-64 bg-gradient-to-br from-emerald-50 to-blue-50 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && (
          <div className={`grid gap-6 ${gridClassMap[layout]}`}>
            {items.map((photo) => renderPhoto(photo, layout))}
          </div>
        )}
      </div>
    </section>
  );
}
