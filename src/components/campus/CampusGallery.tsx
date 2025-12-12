import { useEffect, useState } from "react";
import logo from "/images/Faculty-Staff/logo.png";

interface MediaItem {
  id: number;
  type: "image" | "video";
  url: string;
  description: string;
}

export function CampusGallery() {
  const [dynamicMedia, setDynamicMedia] = useState<MediaItem[]>([]);

  // Static images: Add the URLs and descriptions of static images
  const staticImages: MediaItem[] = [
    {
      id: 1,
      type: "image",
      url: logo,
      description: "Classroom Session",
    },
    {
      id: 2,
      type: "image",
      url: logo,
      description: "Sports Event",
    },
    {
      id: 3,
      type: "video",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      description: "School Tour",
    },
    {
      id: 4,
      type: "video",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      description: "Annual Function",
    },
    {
      id: 5,
      type: "image",
      url: logo,
      description: "Cultural Event",
    },
    {
      id: 6,
      type: "image",
      url: logo,
      description: "Science Fair",
    },
    {
      id: 7,
      type: "image",
      url: logo,
      description: "Library Time",
    },
    {
      id: 8,
      type: "image",
      url: logo,
      description: "Art Exhibition",
    },
    {
      id: 9,
      type: "video",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      description: "Sports Day Highlights",
    },
  ];

  useEffect(() => {
    // Fetch dynamic media from the server
    fetch("/api/media")
      .then((response) => response.json())
      .then((data) => setDynamicMedia(data))
      .catch((error) => console.error("Error fetching dynamic media:", error));
  }, []);

  // Function to organize media according to the pattern:
  // Row 1: Image, Image, Video
  // Row 2: Video, Image, Image
  // Repeat
  const organizeMedia = (media: MediaItem[]) => {
    const images = media.filter((m) => m.type === "image");
    const videos = media.filter((m) => m.type === "video");
    const result: MediaItem[] = [];
    // Pattern sequence for 3-column grid
    const pattern = ["image", "image", "video", "video", "image", "image"];
    let i = 0;

    while (images.length > 0 || videos.length > 0) {
      const desiredType = pattern[i % 6];
      if (desiredType === "image") {
        if (images.length > 0) result.push(images.shift()!);
        else if (videos.length > 0) result.push(videos.shift()!);
      } else {
        if (videos.length > 0) result.push(videos.shift()!);
        else if (images.length > 0) result.push(images.shift()!);
      }
      i++;
    }
    return result;
  };

  // Combine static and dynamic media and organize them
  const allMedia = organizeMedia([...staticImages, ...dynamicMedia]);

  return (
    <section id="campus-gallery" className="py-20 bg-white">
      <div className="container max-w-4xl">
        <h2 className="text-4xl font-bold text-black mb-6">Gallery</h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-12">
          Explore The Scholar's Academy through our gallery of photos and
          videos. These images capture the essence of our School Life, from
          classroom moments to athletic achievements, cultural celebrations, and
          student activities. Get a visual glimpse of what makes our school
          special.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {allMedia.map((item) => {
            // Pattern: P, P, V, V, P, P
            // We want videos to be tall (row-span-2)
            const isVideo = item.type === "video";
            const isTall = isVideo;

            return (
              <div
                key={item.id}
                className={`relative group overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl ${
                  isTall ? "md:row-span-2" : ""
                }`}
              >
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt={item.description}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full relative">
                    <video controls className="w-full h-full object-cover">
                      <source src={item.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    {/* Decorative overlay for video to make it stand out */}
                    <div className="absolute inset-0 pointer-events-none border-4 border-transparent group-hover:border-white/20 transition-all duration-300 rounded-2xl"></div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
