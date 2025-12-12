import { useEffect, useState } from "react";
import { GallerySection } from "../gallery/GallerySection";

export function OurStaff() {
  const communityImages = [
    {
      src: "/images/Faculty-Staff/schoolCommunity.jpg",
      alt: "Students enjoying the courtyard",
    },
    {
      src: "/images/Faculty-Staff/smilePhoto.png",
      alt: "Festival celebration with parents and staff",
    },
    { src: "/images/Faculty-Staff/enjoying.jpg", alt: "Creative classroom workshop" },
    {
      src: "/images/Faculty-Staff/smilePhoto.png",
      alt: "Sports day cheering section",
    },
    { src: "/images/Faculty-Staff/enjoying.jpg", alt: "Art fair gallery walk" },
  ];
  const [communityIndex, setCommunityIndex] = useState(0);
  const [isPreviewing, setIsPreviewing] = useState(false);

  useEffect(() => {
    if (!isPreviewing) return;
    const intervalId = window.setInterval(() => {
      setCommunityIndex((prev) => (prev + 1) % communityImages.length);
    }, 2000);
    return () => window.clearInterval(intervalId);
  }, [isPreviewing, communityImages.length]);

  const startCommunityPreview = () => {
    setIsPreviewing(true);
  };

  const stopCommunityPreview = () => {
    setIsPreviewing(false);
    setCommunityIndex(0);
  };

  return (
    <>
      <section id="our-staff" className="py-20 bg-gray-50">
        <div className="container max-w-6xl px-4 mx-auto">
          {/* Section Header */}
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Our Staff
          </h2>

          {/* Introduction */}
          <div className="mb-12 text-center">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">
              The Team Behind The Scholar's Academy
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Welcome to our school community! Our staff is a dedicated and
              passionate team committed to fostering a positive and enriching
              learning environment for every student. With a diverse range of
              skills and experiences, our educators bring creativity,
              enthusiasm, and a student-centred approach to the classroom.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              From our experienced teachers who inspire a love for learning to
              our supportive administrative staff ensuring the smooth operation
              of the school, each member plays a vital role in shaping the
              educational journey of our students. Together, we strive to create
              a nurturing and inclusive atmosphere where every child can thrive
              academically, socially, and emotionally.
            </p>
          </div>

          {/* Image Section (School Community) */}
          <div className="mb-12">
            <div
              className="rounded-2xl shadow-lg overflow-hidden relative cursor-pointer transition-shadow duration-300 focus-visible:ring-4 focus-visible:ring-indigo-200 hover:shadow-2xl"
              tabIndex={0}
              role="button"
              aria-label="Preview our school community"
              onMouseEnter={startCommunityPreview}
              onMouseLeave={stopCommunityPreview}
              onFocus={startCommunityPreview}
              onBlur={stopCommunityPreview}
              onTouchStart={startCommunityPreview}
              onTouchEnd={stopCommunityPreview}
              onTouchCancel={stopCommunityPreview}
            >
              <div className="relative w-full h-64">
                {communityImages.map((image, idx) => (
                  <img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                      communityIndex === idx
                        ? "opacity-100 scale-100 blur-0"
                        : "opacity-0 scale-95 blur-[1px]"
                    }`}
                    style={{ zIndex: communityIndex === idx ? 2 : 1 }}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-transparent to-rose-400/20 mix-blend-screen pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Founder's Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">
              Meet the Founder
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Having worked years on end for child welfare, Mr. Ajay Chandra Oli
              laid the foundation of this school in 2022 with the vision to make
              education at the primary level as innovative, creative, and
              inclusive as it gets. The Scholar’s Academy is the result of the
              years of hard work and dedication put in by him.
            </p>
            <div className="rounded-lg shadow-lg overflow-hidden mb-8 flex space-x-4">
              <img
                src="/images/Faculty-Staff/FounderImage.jpg"
                alt="Founder Image 1"
                className="flex-1 h-64 object-cover"
              />
              <img
                src="/images/Faculty-Staff/FounderImage.jpg"
                alt="Founder Image 2"
                className="flex-1 h-64 object-cover"
              />
              <img
                src="/images/Faculty-Staff/FounderImage.jpg"
                alt="Founder Image 3"
                className="flex-1 h-64 object-cover"
              />
            </div>
          </div>

          {/* Academic Staff Section */}
          <div className="mb-12">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">
              Academic Staff
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Staff Members */}
              {[
                {
                  name: "Kamla Pant",
                  role: "Teacher",
                  image: "/images/Faculty-Staff/kamlaPant.jpg",
                },
                {
                  name: "Anita Kapri",
                  role: "Teacher",
                  image: "/images/Faculty-Staff/AnitaKapri.jpg",
                },
                {
                  name: "Deepa Jukariya",
                  role: "Teacher",
                  image: "/images/Faculty-Staff/DeepaJukariya.jpg",
                },
                {
                  name: "Beena Patni",
                  role: "Sr. Hindi Teacher",
                  image: "/images/Faculty-Staff/BeenaPatni.jpg",
                },
                {
                  name: "Prema Punera",
                  role: "Sr. Computer Teacher",
                  image: "/images/Faculty-Staff/PremaPunera.jpg",
                },
                {
                  name: "Anupama Sanyal",
                  role: "Teacher",
                  image: "/images/Faculty-Staff/AnupamaSanyal.jpg",
                },
              ].map((staff, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-white rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="mx-auto mb-4 h-44 w-44 rounded-[32px] overflow-hidden border-4 border-indigo-100 shadow-lg">
                    <img
                      src={staff.image}
                      alt={`${staff.name} portrait`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-1">
                    {staff.name}
                  </h4>
                  <p className="text-md text-indigo-600 font-medium mb-4">
                    {staff.role}
                  </p>
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 italic">
                      "The Scholar's Academy is a wonderful place to work. My
                      colleagues are smart, kind, and supportive. The school is
                      well organized and efficient. But what keeps me coming
                      back are the wonderful kids I get to teach and learn from
                      every day. They are in the right hands."
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Section with Call to Action */}
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              The Scholar’s Academy is more than just a place of education; it's
              a close-knit family where every staff member contributes to the
              success of our students. Together, we are committed to ensuring a
              nurturing environment where every child can grow to their fullest
              potential.
            </p>
          </div>
        </div>
      </section>
      <GallerySection
        slug="our-staff"
        title="Faces Of The Scholar’s Academy"
        description="Rolling portraits, outdoor lessons, and workshop clips straight from the staff room, curated by our team leaders."
      />
    </>
  );
}
