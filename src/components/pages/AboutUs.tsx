import { useState } from "react";
import EyeGame from "../Reusable Component/EyeGame";
import { GallerySection } from "../gallery/GallerySection";

export function AboutUs() {
  const [activatedCards, setActivatedCards] = useState<Set<number>>(
    () => new Set()
  );
  const [smileSignal, setSmileSignal] = useState(0);
  const [eyePopSignal, setEyePopSignal] = useState(0);
  const triggerSmile = () => setSmileSignal((prev) => prev + 1);
  const triggerEyePop = () => setEyePopSignal((prev) => prev + 1);
  const activateCard = (index: number) => {
    setActivatedCards((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };
  const handleCardInteraction = (index: number) => {
    triggerSmile();
    activateCard(index);
  };
  const scholarsPoints = [
    {
      letter: "S",
      badgeBg: "bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100", // Light gradient for rainbow
      badgeBorder: "border-indigo-100",
      title: "Smart, tech-enabled learning",
      description:
        "Smart classes and digital boards that make concepts visual, interactive and easier to retain.",
      hoverGradient: "linear-gradient(90deg,#e0e7ff,#f3e8ff,#fce7f3)",
    },
    {
      letter: "C",
      badgeBg: "bg-gradient-to-r from-pink-100 via-yellow-100 to-green-100",
      badgeBorder: "border-pink-100",
      title: "Communication & confidence",
      description:
        "Communication and personality development sessions that help students become leaders, not just learners.",
      hoverGradient: "linear-gradient(90deg,#fce7f3,#fef9c3,#dcfce7)",
    },
    {
      letter: "H",
      badgeBg: "bg-gradient-to-r from-green-100 via-blue-100 to-violet-100",
      badgeBorder: "border-green-100",
      title: "Hobbies, arts & expression",
      description:
        "Dedicated space for music, dance, art and martial arts so every child can discover their unique talents.",
      hoverGradient: "linear-gradient(90deg,#dcfce7,#dbeafe,#ede9fe)",
    },
    {
      letter: "O",
      badgeBg: "bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100",
      badgeBorder: "border-yellow-100",
      title: "Outdoor & real-world exposure",
      description:
        "Trips, outdoor activities and nature-based learning that move education beyond four classroom walls.",
      hoverGradient: "linear-gradient(90deg,#fef9c3,#ffedd5,#fee2e2)",
    },
    {
      letter: "L",
      badgeBg: "bg-gradient-to-r from-red-100 via-indigo-100 to-yellow-100",
      badgeBorder: "border-red-100",
      title: "Learning from best practices",
      description:
        "Blending historic, Vedic and global educational approaches to build a rich, future-ready foundation.",
      hoverGradient: "linear-gradient(90deg,#fee2e2,#e0e7ff,#fef9c3)",
    },
    {
      letter: "A",
      badgeBg: "bg-gradient-to-r from-orange-100 via-teal-100 to-sky-100",
      badgeBorder: "border-orange-100",
      title: "Advancing social skills",
      description:
        "Group projects, games and interactive sessions that nurture empathy, teamwork and respect.",
      hoverGradient: "linear-gradient(90deg,#ffedd5,#ccfbf1,#e0f2fe)",
    },
    {
      letter: "R",
      badgeBg: "bg-gradient-to-r from-teal-100 via-cyan-100 to-blue-100",
      badgeBorder: "border-teal-100",
      title: "Review, reflection & support",
      description:
        "Continuous feedback, progress tracking and personalised attention for every learner.",
      hoverGradient: "linear-gradient(90deg,#ccfbf1,#cffafe,#dbeafe)",
    },
    {
      letter: "S",
      badgeBg: "bg-gradient-to-r from-blue-100 via-purple-100 to-indigo-100",
      badgeBorder: "border-blue-100",
      title: "Special educators & care",
      description:
        "Access to counsellors and special educators so no child’s needs go unheard or unsupported.",
      hoverGradient: "linear-gradient(90deg,#dbeafe,#f3e8ff,#e0e7ff)",
    },
  ];

  return (
    <>
      <section
        id="about-us"
        className="py-16 bg-gradient-to-b from-slate-50 to-white"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.6fr)] items-start">
            {/* Left: Main text block */}
            <div className="lg:scale-[0.9] lg:origin-top">
              <p className="text-xs font-semibold tracking-[0.22em] text-purple-600 uppercase mb-2">
                About The Scholars Academy
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 leading-snug">
                What makes us different?
              </h2>

              <p className="text-slate-700 leading-relaxed mb-3 text-sm md:text-base">
                Children today grow up in a world overflowing with information,
                yet genuine curiosity and the courage to explore are often
                pushed into the background. Traditional systems still reward
                rote memorisation more than critical thinking, creativity and
                real-life skills.
              </p>

              <p className="text-slate-700 leading-relaxed mb-3 text-sm md:text-base">
                At The Scholars Academy, we step away from the one-size-fits-all
                model. We place each child at the centre of the learning journey
                and design experiences that honour their interests, pace and
                potential.
              </p>

              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Our classrooms are laboratories of life: spaces where questions
                are welcome, mistakes are part of the process, and learning
                connects directly to the world outside school.
              </p>
            </div>

            {/* Right: SCHOLARS spotlight + acronym cards */}
            <div className="rounded-[28px] p-[1px] bg-[linear-gradient(130deg,_#f87171,_#fbbf24,_#34d399,_#38bdf8,_#a78bfa)] shadow-lg lg:scale-[0.9] lg:origin-top">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-stretch rounded-[26px] bg-white/95 backdrop-blur-sm px-3 py-5 lg:px-4 lg:py-6">
                {/* EyeGame card */}
                <div
                  className="group rounded-2xl border border-slate-100 bg-white shadow-sm px-2 py-4 flex flex-col justify-center min-h-[340px] cursor-pointer transition-shadow duration-300"
                  onMouseEnter={triggerEyePop}
                  onFocus={triggerEyePop}
                  onTouchStart={triggerEyePop}
                  tabIndex={0}
                >
                  <div className="flex items-center justify-center h-full">
                    <div className="relative flex items-center justify-center w-full max-w-[165px] aspect-square rounded-2xl border border-slate-200 bg-slate-50 shadow-inner overflow-hidden group-hover:shadow-[0_0_25px_rgba(99,102,241,0.45)] group-focus-within:shadow-[0_0_30px_rgba(99,102,241,0.55)] transition-shadow duration-300">
                      <EyeGame
                        variant="embedded"
                        darkMode={false}
                        size={105}
                        eyeColor="#dff0ff"
                        pupilColor="#000"
                        smileSignal={smileSignal}
                        popSignal={eyePopSignal}
                      />
                    </div>
                  </div>
                </div>
                {/* Acronym cards */}
                <div className="space-y-3">
                  {scholarsPoints.map((item, index) => {
                    const isActive = activatedCards.has(index);
                    return (
                      <div
                        key={index}
                        onMouseEnter={() => handleCardInteraction(index)}
                        onFocus={() => handleCardInteraction(index)}
                        onTouchStart={() => handleCardInteraction(index)}
                        tabIndex={0}
                        className={`group flex items-stretch rounded-2xl border ${
                          item.badgeBorder
                        } shadow-sm overflow-hidden transition-colors duration-300 ${
                          isActive ? item.badgeBg : "bg-white"
                        }`}
                        style={
                          isActive
                            ? { backgroundImage: item.hoverGradient }
                            : undefined
                        }
                      >
                        {/* Letter block */}
                        <div className="flex items-center justify-center px-4 py-4 bg-white/70 border-r border-slate-100">
                          <span className="text-2xl font-semibold text-slate-800 tracking-[0.18em]">
                            {item.letter}
                          </span>
                        </div>

                        {/* Text block */}
                        <div className="flex-1 px-4 py-3">
                          <h3 className="text-xs sm:text-sm font-semibold text-slate-900 mb-1">
                            {item.title}
                          </h3>
                          <p className="text-[11px] sm:text-xs md:text-sm text-slate-700 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <GallerySection
        slug="about-us"
        title="Living, Breathing Classrooms"
        description="A rotating stream of nature walks, maker sessions, and tech-powered labs that keep our About Us story rooted in real student work."
        layout="masonry"
      />
    </>
  );
}
