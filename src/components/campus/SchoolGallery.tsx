const photoModules = import.meta.glob(
  "../../../public/images/PhotoMomemts/*.{jpg,jpeg,png,webp}"
);

type GalleryItem = {
  id: string;
  url: string;
  description: string;
};

const formatDescription = (filePath: string) => {
  const segments = filePath.split("/");
  const fileName = segments[segments.length - 1] || "Moment";
  const withoutExt = fileName.replace(/\.[^.]+$/, "");
  const cleaned = withoutExt.replace(/[-_]+/g, " ").replace(/\s+/g, " ");
  return cleaned
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const toPublicUrl = (filePath: string) => {
  const normalized = filePath.replace(/\\/g, "/");
  const match = normalized.match(/\/images\/PhotoMomemts\/.+$/);
  return match ? match[0] : null;
};

const galleryItems: GalleryItem[] = Object.keys(photoModules)
  .map((path) => {
    const url = toPublicUrl(path);
    if (!url) return null;
    return {
      id: path,
      url,
      description: formatDescription(path),
    };
  })
  .filter((item): item is GalleryItem => Boolean(item))
  .sort((a, b) => a.description.localeCompare(b.description));

const frameVariants = [
  {
    span: "md:col-span-1 md:row-span-1",
    shape: "aspect-square rounded-2xl",
  },
  {
    span: "md:col-span-1 md:row-span-2",
    shape: "aspect-[3/4] rounded-[2rem]",
  },
  {
    span: "md:col-span-2 md:row-span-1",
    shape: "aspect-[16/9] rounded-[1.5rem]",
  },
  {
    span: "md:col-span-2 md:row-span-1",
    shape: "aspect-[21/9] rounded-[1.25rem]",
  },
  {
    span: "md:col-span-1 md:row-span-1",
    shape: "aspect-[5/4] rounded-[1.75rem]",
  },
  {
    span: "md:col-span-1 md:row-span-2",
    shape: "aspect-[2/3] rounded-[2rem]",
  },
  {
    span: "md:col-span-1 md:row-span-1",
    shape: "aspect-square rounded-full border border-white/40",
  },
  {
    span: "md:col-span-2 md:row-span-1",
    shape: "aspect-[4/3] rounded-[1.5rem]",
  },
];

export function SchoolGallery() {
  const itemsToRender = galleryItems;

  if (!itemsToRender.length) {
    return null;
  }

  return (
    <section id="school-gallery" className="py-20 bg-white">
      <div className="container max-w-5xl">
        <div className="mb-10 space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
            Moments that matter
          </p>
          <h2 className="text-3xl font-bold text-slate-900">School Gallery</h2>
          <p className="text-sm text-slate-500">
            Every smile, performance, and achievement captured from our
            PhotoMoments archive.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 auto-rows-[120px] sm:auto-rows-[140px] lg:auto-rows-[160px]">
          {itemsToRender.map((item, index) => {
            const variant = frameVariants[index % frameVariants.length];
            return (
              <div
                key={item.id}
                className={`group relative overflow-hidden bg-slate-100 shadow-md shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${variant.span}`}
              >
                <div
                  className={`relative h-full w-full ${variant.shape} overflow-hidden bg-slate-200`}
                >
                  <img
                    src={item.url}
                    alt={item.description}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
