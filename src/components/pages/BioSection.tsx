import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import CustomVideoPlayer from "../Reusable Component/VideoPlayer";

const MobileNavbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollYRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const updateViewport = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsVisible(mobile);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setPortalTarget(document.body);
    }
  }, []);

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    const updateVisibility = () => {
      frameRef.current = null;
      const currentY = window.scrollY;
      const lastY = lastScrollYRef.current;
      lastScrollYRef.current = currentY;

      if (currentY <= 0) {
        setIsVisible(true);
        return;
      }

      if (currentY > lastY + 2) {
        setIsVisible(false);
        return;
      }

      if (currentY < lastY - 2) {
        setIsVisible(true);
      }
    };

    const handleScroll = () => {
      if (frameRef.current !== null) {
        return;
      }
      frameRef.current = window.requestAnimationFrame(updateVisibility);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      if (hideTimeoutRef.current !== null) {
        window.clearTimeout(hideTimeoutRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  const navLinks = [
    { label: "Activities", target: "#discover", icon: "🏃" },
    { label: "Fun Education", target: "#about-us" },
    { label: "Explore", target: "#testimonials" },
    { label: "Help & Contact", target: "#apply", icon: "💬" },
  ];

  const handleNavigation = (target: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    const el = document.querySelector(target);
    if (!el) {
      return;
    }
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!isMobile || !portalTarget) {
    return null;
  }

  const [primaryLink, secondLink, thirdLink, ctaLink] = navLinks;

  return createPortal(
    <nav
      className={`fixed top-4 left-1/2 z-50 w-[calc(100%-2.5rem)] max-w-xl -translate-x-1/2 transform transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/90 px-3 py-2 text-xs font-medium text-slate-100 shadow-[0_18px_40px_-18px_rgba(15,23,42,0.8)] backdrop-blur-md">
        <button
          type="button"
          onClick={handleNavigation(primaryLink.target)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/90 transition hover:bg-slate-700"
        >
          <span className="text-lg">{primaryLink.icon}</span>
        </button>

        <div className="flex flex-1 items-center justify-center gap-4 text-[0.72rem]">
          {[secondLink, thirdLink].map((link) => (
            <button
              key={link.target}
              type="button"
              onClick={handleNavigation(link.target)}
              className="relative px-2 py-1 text-slate-200 transition hover:text-white"
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleNavigation(ctaLink.target)}
          className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-[0.7rem] font-semibold text-slate-900 transition hover:bg-white"
        >
          <span className="text-base">{ctaLink.icon}</span>
          <span>{ctaLink.label}</span>
        </button>
      </div>
    </nav>,
    portalTarget
  );
};

const HeroSection: React.FC = () => {
  const [showHeroPoster, setShowHeroPoster] = useState(true);

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-slate-950 text-slate-50"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CustomVideoPlayer
          videoId="noQwTnqGAn8"
          showMuteButton={false}
          disablePointerEvents
          className="absolute inset-0"
          fillMode="cover"
          onFirstPlay={() => {
            // Hide the poster image shortly after the video actually starts.
            window.setTimeout(() => setShowHeroPoster(false), 1000);
          }}
          onPlaybackStateChange={(state) => {
            if (state === "buffering" || state === "unstarted") {
              // If the video is stuck or not started, show the fallback image.
              setShowHeroPoster(true);
            }
            if (state === "playing") {
              // When playback resumes, hide the image and keep playing from the
              // current point in time.
              setShowHeroPoster(false);
            }
          }}
        />
        {showHeroPoster && (
          <div className="absolute inset-0">
            <img
              src="/images/PhotoMomemts/P1040609-scaled.jpg"
              alt="Scholars Academy campus"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/50" />
          </div>
        )}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-slate-950/50" />
      </div>

      {/* Gradient / overlay background */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1e3a8a,_#020617)] opacity-50" />
        <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-md" />
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-amber-400/10 blur-md" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 grid gap-10 lg:grid-cols-[1.15fr,1fr] items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold tracking-[0.25em] uppercase text-indigo-200 border border-slate-700/70 mb-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            The Scholar's Academy • Pithoragarh
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-slate-50">
            Where dreams take root{" "}
            <span className="text-indigo-300">&amp; futures take flight.</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl">
            Join us on a journey of discovery, innovation, and success at The
            Scholar's Academy. Admissions for the new academic session start
            from{" "}
            <span className="font-semibold text-indigo-200">October 2023</span>.
          </p>

          <p className="mt-4 text-xs sm:text-sm text-slate-400">
            "The mind is not a vessel to be filled, but a fire to be kindled."
            At Scholar's Academy we strive to kindle genuine love for knowledge
            and open doors beyond conventional learning.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#admission"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 hover:bg-indigo-600 transition"
            >
              <span className="text-base">👋</span>
              New Admission
            </a>

            <a
              href="#prospectus"
              className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-900/50 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-800 transition"
            >
              Prospectus
              <span className="text-lg">↗</span>
            </a>

            <button
              type="button"
              onClick={() =>
                window.open("https://youtu.be/noQwTnqGAn8", "_blank")
              }
              className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-800 transition"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-900 text-xs">
                ▶
              </span>
              Video Tour
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-8 rounded-full bg-indigo-400" />
              Japanese Method of Education
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-8 rounded-full bg-amber-400" />
              Vedic Culture &amp; Value Education
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-8 rounded-full bg-emerald-400" />
              Daily Tracking &amp; Reporting for Every Student
            </div>
          </div>
        </div>

        {/* Right hero visual */}
        <div className="relative">
          <div className="relative rounded-3xl bg-slate-900/80 p-2 shadow-2xl shadow-black/50 border border-slate-800/80 transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.6),0_0_80px_rgba(99,102,241,0.4)] hover:scale-105 hover:border-indigo-500/50 mt-[400px] mb-[-2px] group">
            <div className="overflow-hidden rounded-2xl bg-slate-900">
              <img
                src="/images/Faculty-Staff/ScaledFounderImage.jpg"
                alt="Students at The Scholar's Academy"
                className="h-64 w-full object-cover sm:h-72 lg:h-80 opacity-95 transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Floating chips */}
            <div className="absolute left-4 bottom-4 flex flex-col gap-2 text-xs sm:text-[0.7rem]">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/80 px-3 py-1 text-slate-200 border border-slate-700/80 backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-slate-900/90">
                <span className="h-2 w-2 rounded-full bg-emerald-400 transition-transform duration-300 group-hover:scale-125" />
                <span className="transition-transform duration-300 group-hover:scale-105">
                  Daily tracking &amp; reporting for every student
                </span>
              </div>
              <div className="inline-flex items-center gap-3 rounded-2xl bg-slate-950/90 px-3 py-2 text-slate-200 border border-slate-700/80 backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-slate-900/95">
                <div className="flex flex-col leading-tight">
                  <span className="text-[0.65rem] uppercase tracking-[0.16em] text-slate-400 transition-transform duration-300 group-hover:scale-105">
                    Parent satisfaction
                  </span>
                  <span className="text-sm font-semibold text-emerald-300 transition-transform duration-300 group-hover:scale-105">
                    "Students are in the right hands."
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute right-4 top-4 rounded-2xl bg-white/95 px-3 py-2 text-xs text-slate-900 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:bg-white">
              <div className="text-[0.65rem] uppercase tracking-[0.18em] text-slate-500 transition-transform duration-300 group-hover:scale-105">
                At a glance
              </div>
              <div className="mt-1 text-sm font-semibold transition-transform duration-300 group-hover:scale-105">
                Holistic learning environment
              </div>
              <div className="mt-2 text-[0.7rem] text-slate-600 transition-transform duration-300 group-hover:scale-105">
                Japanese model + Vedic values + modern smart classes.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DiscoverSection: React.FC = () => {
  return (
    <section id="discover" className="bg-slate-50 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-2 items-center">
        {/* Left images (3 staggered images) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-3 sm:space-y-4">
            <div className="overflow-hidden rounded-2xl bg-slate-200 shadow-md">
              <img
                src="https://scholarspithoragarh.com/wp-content/uploads/elementor/thumbs/P1000673-scaled-qddk9511wtsnxskp2hsl0dkxwr3gin1m51vner7ooc.jpg"
                alt="Students at The Scholar's Academy"
                className="h-40 sm:h-48 w-full object-cover hover:scale-[1.03] transition-transform"
              />
            </div>
            <div className="overflow-hidden rounded-2xl bg-slate-200 shadow-md">
              <img
                src="https://scholarspithoragarh.com/wp-content/uploads/elementor/thumbs/rawpixel-683571-unsplash-qd9uw9elefpgmx1yd00j1ezluhyh4en101jrdcr1dk.jpg"
                alt="Creative learning activities"
                className="h-32 sm:h-40 w-full object-cover hover:scale-[1.03] transition-transform"
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="overflow-hidden rounded-3xl bg-slate-200 shadow-lg translate-y-4 sm:translate-y-6">
              <img
                src="https://scholarspithoragarh.com/wp-content/uploads/2023/10/P1000759-768x432.jpg"
                alt="Classroom at The Scholar's Academy"
                className="h-64 sm:h-72 w-full object-cover hover:scale-[1.03] transition-transform"
              />
            </div>
          </div>
        </div>

        {/* Right text */}
        <div className="space-y-5">
          <div className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 tracking-[0.18em] uppercase">
            Discover • Learn • Grow
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            Education that goes beyond the classroom.
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            Our mission is to make education more than just a classroom
            experience. We put fostering a genuine love for learning at the
            highest pedestal.
          </p>

          <p className="text-sm sm:text-base text-slate-600">
            We let children’s minds run free with imagination and give them a
            platform to think, discover, and create outside the confines of
            worded textbooks.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("about-us");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-slate-800 transition"
            >
              About us
              <span className="text-sm">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const highlights = [
  {
    title: "Japanese Method of Education",
    description:
      "For the first time in Pithoragarh, The Scholar’s Academy introduces a Japanese model based on stimulating children's brains according to developmental age.",
    icon: "🌏",
  },
  {
    title: "Introduction to Vedic Culture & Education",
    description:
      "We blend the best of Vedic wisdom with modern education to build character, values and clarity.",
    icon: "🕉️",
  },
  {
    title: "Online Smart Classes",
    description:
      "Interactive smart classes that leave behind rote textbook learning and make concepts come alive.",
    icon: "💻",
  },
  {
    title: "Communication & Personality Development",
    description:
      "Grooming not just learners, but confident leaders for tomorrow through communication and soft skills.",
    icon: "🗣️",
  },
  {
    title: "Music, Dance & Cooking",
    description:
      "Expanding horizons beyond academics and nurturing practical hobbies, interests and talents.",
    icon: "🎶",
  },
  {
    title: "Daily Tracking & Reporting",
    description:
      "A structured daily tracking system for every single student — because feedback fuels improvement.",
    icon: "📸",
  },
];

const HighlightsSection: React.FC = () => {
  return (
    <section className="bg-white py-12 sm:py-16" id="about-us">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            Why The Scholar’s Academy
          </h2>
          <div className="mt-3 h-px w-16 mx-auto bg-gradient-to-r from-indigo-500 via-slate-400 to-amber-400" />
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            A school experience where modern pedagogy, culture, technology and
            personal attention come together.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-slate-100 bg-slate-50/80 p-5 shadow-sm hover:shadow-lg hover:border-indigo-100 transition transform hover:-translate-y-1"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-xl">
                {item.icon}
              </div>
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AtAGlanceSection: React.FC = () => {
  return (
    <section className="bg-slate-950 text-slate-50 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-2 items-start">
        {/* Stats column */}
        <div className="space-y-5">
          <div className="inline-flex rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold tracking-[0.2em] uppercase text-slate-300">
            At a glance
          </div>

          <div className="grid gap-5">
            <div className="grid grid-cols-[auto,1fr] gap-4 items-center">
              <div className="text-3xl sm:text-4xl font-semibold text-indigo-300">
                300
              </div>
              <p className="text-sm sm:text-base text-slate-200">
                Courses offered with 5 world languages and 120 electives.
              </p>
            </div>

            <div className="grid grid-cols-[auto,1fr] gap-4 items-center">
              <div className="text-3xl sm:text-4xl font-semibold text-amber-300">
                28
              </div>
              <p className="text-sm sm:text-base text-slate-200">
                Countries represented by over 2500 students.
              </p>
            </div>

            <div className="grid grid-cols-[auto,1fr] gap-4 items-center">
              <div className="text-3xl sm:text-4xl font-semibold text-emerald-300">
                14.6%
              </div>
              <p className="text-sm sm:text-base text-slate-200">
                International students, with 8% under the Cultural Council.
              </p>
            </div>

            <div className="grid grid-cols-[auto,1fr] gap-4 items-center">
              <div className="text-3xl sm:text-4xl font-semibold text-fuchsia-300">
                180
              </div>
              <p className="text-sm sm:text-base text-slate-200">
                Teaching faculty with 80 men and 100 women.
              </p>
            </div>
          </div>

          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-md">
            Numbers matter only because they represent real people — students,
            teachers, and families building a community of learning.
          </p>

          <button className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-xs sm:text-sm font-medium text-slate-900 hover:bg-slate-100 transition">
            Yearly Report
            <span>→</span>
          </button>
        </div>

        {/* Quote column */}
        <div className="space-y-6">
          <div className="glow-border">
            <div
              className="glow-border__inner rounded-3xl bg-slate-900/80 border border-slate-700/80 p-6 sm:p-7 shadow-2xl"
              style={
                {
                  "--glow-inner-bg": "rgba(15, 23, 42, 0.82)",
                } as React.CSSProperties
              }
            >
              <p className="text-sm sm:text-base text-slate-100">
                “The Scholar&apos;s Academy is a wonderful place to work. My
                colleagues are smart, kind, and supportive. The school is well
                organized and efficient. But what keeps me coming back are the
                wonderful kids I get to teach and learn from every day. They are
                in the right hands.”
              </p>

              <div className="mt-4 h-px w-14 bg-gradient-to-r from-indigo-400 to-emerald-400" />

              <p className="mt-3 text-sm font-semibold text-slate-50">
                Ajay Oli
              </p>
              <p className="text-xs text-slate-400">
                Founder, The Scholar&apos;s Academy
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-400">
            “The Scholar’s Academy is undoubtedly the best school in Pithoragarh
            for its commitment and responsibility towards students.”
          </p>
        </div>
      </div>
    </section>
  );
};

const ParentTestimonialCard: React.FC<{ src: string; index: number }> = ({
  src,
  index,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // Autoplay might be blocked; ignore.
      });
    }
  };

  const handlePause = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-black shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
      onMouseEnter={handlePlay}
      onFocus={handlePlay}
      onMouseLeave={handlePause}
      onBlur={handlePause}
    >
      <div className="relative w-full" style={{ paddingBottom: "178%" }}>
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={src}
          controls
          muted
          playsInline
          preload="metadata"
          controlsList="nodownload"
        />
      </div>
      <p className="absolute bottom-2 left-2 right-2 text-sm text-white font-semibold bg-black/60 px-2 py-1 rounded-md">
        Parent Testimonial {index + 1}
      </p>
    </div>
  );
};

const ParentsTestimonialsVideos: React.FC = () => {
  const videos = [
    "https://scholarspithoragarh.com/wp-content/uploads/2024/02/parents-testimonials-final.mp4",
    "https://scholarspithoragarh.com/wp-content/uploads/2024/02/parents-testimonials-part-2.mp4",
    "https://scholarspithoragarh.com/wp-content/uploads/2024/02/parents-testimonial02.mp4",
  ];

  return (
    <section className="bg-slate-50 py-12 sm:py-16" id="testimonials">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            Parent&apos;s Voice
          </h2>
          <div className="mt-3 h-px w-16 mx-auto bg-gradient-to-r from-indigo-500 via-slate-400 to-amber-400" />
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Real stories from parents who trusted Scholar’s Academy with their
            children’s future.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((src, index) => (
            <ParentTestimonialCard key={src} src={src} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCallToAction: React.FC = () => {
  return (
    <section
      id="apply"
      className="relative overflow-hidden bg-slate-900 text-slate-50 py-12 sm:py-16"
    >
      {/* Background YouTube Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          <CustomVideoPlayer
            videoId="tA0H2PKbzfs"
            showMuteButton={false}
            disablePointerEvents
            fillMode="cover"
          />
        </div>
        {/* Left White Section */}
        <div
          className="absolute inset-y-0 left-0 bg-white z-[5]"
          style={{ width: "calc((100vw - 84rem) / 2)" }}
        ></div>
        {/* Right White Section */}
        <div
          className="absolute inset-y-0 right-0 bg-white z-[5]"
          style={{ width: "calc((100vw - 84rem) / 2)" }}
        ></div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Because you deserve to shine.
        </h2>
        <p className="text-sm sm:text-base text-slate-200">
          Enroll for a new admission on or before{" "}
          <span className="font-semibold text-amber-300">February 2024</span>.
          Give your child a space where curiosity, discipline and joy can grow
          together.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <a
            href="#admission"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 hover:bg-indigo-600 transition"
          >
            <span className="text-base">👆</span>
            Enroll Now
          </a>

          <button
            type="button"
            onClick={() =>
              window.open("https://youtu.be/tA0H2PKbzfs", "_blank")
            }
            className="inline-flex items-center gap-2 rounded-full border border-slate-500/80 bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-slate-800 transition"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 text-slate-900 text-xs">
              ▶
            </span>
            Video Tour
          </button>
        </div>
      </div>
    </section>
  );
};

const ScholarsAcademyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <HeroSection />
      <DiscoverSection />
      <HighlightsSection />
      <AtAGlanceSection />
      <ParentsTestimonialsVideos />
      <FinalCallToAction />
      <MobileNavbar />
    </div>
  );
};

export default ScholarsAcademyPage;
