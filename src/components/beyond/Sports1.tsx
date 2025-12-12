import React from "react";

type Program = {
  title: string;
  description: string;
  buttonText: string;
  backgroundImage: string;
  galleryImages: string[];
};

const ProgramSection: React.FC<Program> = ({
  title,
  description,
  buttonText,
  backgroundImage,
  galleryImages,
}) => {
  return (
    <div className="w-full mb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[420px] md:h-[500px] overflow-hidden p-6">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-center justify-center px-6">
          <div className="text-center text-white max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
            <p className="mb-6 text-sm md:text-base leading-relaxed opacity-90">
              {description}
            </p>
            <button className="bg-white text-black px-8 py-2 rounded-full hover:bg-gray-200 transition-all shadow-md">
              {buttonText}
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 h-[220px] md:h-[260px] lg:h-[280px] px-4">
        {galleryImages.map((image, index) => (
          <div key={index} className="relative overflow-hidden p-2">
            <img
              src={image}
              alt={`${title} gallery ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export function Sports() {
  const outdoorSports: Program = {
    title: "Outdoor Sports",
    description:
      "From football and athletics to traditional games, students learn teamwork, discipline and resilience on the field.",
    buttonText: "View Highlights",
    backgroundImage: "/images/PhotoMomemts/P1050793-scaled.jpg",
    galleryImages: [
      "/images/PhotoMomemts/P1050793-scaled.jpg",
      "/images/PhotoMomemts/P1000759-scaled.jpg",
      "/images/PhotoMomemts/P1000687-scaled.jpg",
      "/images/PhotoMomemts/P1000681-scaled.jpg",
    ],
  };

  const indoorSports: Program = {
    title: "Indoor & Fitness",
    description:
      "Chess, table tennis, yoga and fitness routines ensure every child finds a way to stay active and focused.",
    buttonText: "See Activities",
    backgroundImage: "/images/PhotoMomemts/P1000694-scaled.jpg",
    galleryImages: [
      "/images/PhotoMomemts/P1000694-scaled.jpg",
      "/images/PhotoMomemts/P1040609-scaled.jpg",
      "/images/PhotoMomemts/P1050159-scaled.jpg",
      "/images/PhotoMomemts/P1050324-scaled.jpg",
    ],
  };

  return (
    <section id="sports" className="py-20 bg-white">
      <div className="container max-w-5xl mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Sports</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          At The Scholar&apos;s Academy, sports are an essential part of
          holistic education. Our playgrounds and courts are buzzing with
          energy, fair play and school spirit throughout the year.
        </p>
      </div>

      <ProgramSection {...outdoorSports} />
      <ProgramSection {...indoorSports} />
    </section>
  );
}
