import { GallerySection } from "../gallery/GallerySection";

const strategicValues = [
  {
    title: "Self-confidence",
    copy: "Learners take ownership of their journey and discover a confident voice on stage, in studios, and within the community.",
  },
  {
    title: "Constructive Questioning",
    copy: "Curiosity is celebrated. Students challenge assumptions, experiment boldly, and reflect with humility.",
  },
  {
    title: "Enjoyment in Learning",
    copy: "Joyful classrooms keep rigour human. We prioritise experiences that blend challenge with genuine delight.",
  },
  {
    title: "Responsibility with Compassion",
    copy: "Every child is coached to pair leadership with empathy so that service accompanies success.",
  },
];

const strategicObjectives = [
  {
    title: "Holistic Pathways",
    items: [
      "Integrate academics, arts, athletics, and service in every timetable.",
      "Offer personalised guidance that maps aspirations to actionable plans.",
    ],
  },
  {
    title: "Future-ready Learning",
    items: [
      "Blend experiential projects with digital fluency and research skills.",
      "Collaborate with industry mentors for authentic problem solving.",
    ],
  },
  {
    title: "Culture of Care",
    items: [
      "Prioritise student wellness through advisory circles and pastoral programmes.",
      "Partner with parents to ensure routines at school and home reinforce each other.",
    ],
  },
];

const parentExpectations = [
  "Keep communication channels lively by sharing observations, wins, and concerns with mentors.",
  "Model a growth mindset at home through reading, reflection, and balanced screen time.",
  "Be present at open houses, exhibitions, and showcases so children feel supported.",
  "Collaborate on routines that prioritise rest, nutrition, punctuality, and readiness to learn.",
  "Join community initiatives that extend the school’s ethos into the wider neighbourhood.",
];

export function OurVision() {
  return (
    <>
      <section
        id="our-vision"
        className="relative overflow-hidden h-[48vh] lg:h-[50vh] flex items-end"
        style={{ minHeight: "48vh" }}
      >
        <div className="absolute inset-0">
          <img
            src="/PhotoMomemts/P1040609-scaled.jpg"
            alt="Scholars Academy campus"
            className="w-full h-full object-cover"
            loading="lazy"
            style={{ filter: "brightness(1.1) contrast(1.15)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/45 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-900/70 to-transparent" />
        </div>
        <div className="absolute inset-0 pointer-events-none flex">
          <div
            className="flex h-full items-center"
            style={{ transform: "translate(10%, 28%)", width: "100%" }}
          >
            <div
              className="ml-6 lg:ml-20 inline-flex items-center gap-4 px-10 py-5 rounded-full border border-white/70 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40 text-base lg:text-lg tracking-[0.45em] uppercase text-black shadow-2xl backdrop-blur-xl transition-transform duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-slate-900/90 hover:via-slate-900/70 hover:to-slate-900/50"
              style={{
                textShadow:
                  "0 0 6px rgba(255, 255, 255, 0.9), 0 0 12px rgba(255, 255, 255, 0.9)",
              }}
            >
              <span className="h-3.5 w-3.5 rounded-full bg-amber-400 shadow-lg" />{" "}
              Vision & Ethos
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 -mt-10 lg:-mt-16">
        <div className="container max-w-6xl mx-auto">
          <div className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
            <div className="relative">
              <div
                className="absolute -inset-3 lg:-inset-4 rounded-[36px] bg-gradient-to-br from-amber-200/30 via-white/40 to-slate-100/50 blur-3xl"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-3xl p-9 lg:p-12 shadow-2xl bg-white text-slate-900 border border-white/70">
                <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.08),_transparent_60%)]" />
                <div className="relative space-y-6">
                  <div className="rounded-[30px] border border-slate-100/70 bg-gradient-to-br from-white via-slate-50 to-amber-50/40 px-8 py-10 shadow-lg shadow-slate-900/5">
                    <p className="text-3xl lg:text-4xl font-semibold leading-tight text-slate-900">
                      A campus that celebrates
                      <span className="text-amber-500"> bold thinking</span>,
                      purposeful community work, and a culture of
                      <span className="italic text-slate-700">
                        {" "}
                        relentless curiosity.
                      </span>
                    </p>
                    <p className="mt-6 text-base lg:text-lg text-slate-600 leading-relaxed">
                      Students co-create projects with mentors, families, and
                      local changemakers, keeping imagination and impact woven
                      together every day.
                    </p>

                    <p className="text-base lg:text-lg text-slate-600 leading-relaxed">
                      Education at The Scholar's Academy is about
                      self-confidence, healthy challenge, and lasting enjoyment.
                      It teaches the art of constructive questioning and
                      nurtures a sense of responsibility that is anchored in
                      compassion, confidence, and creativity.
                    </p>
                    <div
                      className="flex flex-wrap gap-3 pt-4"
                      style={{ padding: "1%" }}
                    >
                      <a
                        href="#campus"
                        className="px-8 py-3 rounded-full border border-slate-200/70 text-slate-900 font-semibold backdrop-blur-md bg-white/70 shadow-md hover:bg-white"
                      >
                        Book a Campus Tour
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white text-slate-900 rounded-3xl p-8 lg:p-10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-white" />
              <div className="relative grid gap-8">
                <div>
                  <p className="text-2xl font-semibold leading-snug text-slate-900">
                    District Hospital Road, Near Doctor's Colony, Pithoragarh
                  </p>
                  <div className="mt-6 space-y-4 text-base text-slate-600">
                    <p>Timings · Mon – Sat · 8:30 AM – 3 PM</p>
                    <p>Admission Desk · +91 75258 38880</p>
                    <p>Mail · info@scholarspithoragarh.com</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <p className="font-semibold text-slate-900 mb-2">
                    Quick Checklist
                  </p>
                  <ul className="space-y-3 text-slate-600 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-slate-900" />
                      Guided campus immersion every Friday
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      Advisory studio meetings with faculty
                    </li>
                  </ul>
                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs uppercase tracking-[0.4em] text-slate-500">
                    Established in 2022
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container max-w-6xl px-6 mx-auto space-y-16">
          <div className="grid gap-10 lg:grid-cols-[3fr,2fr] items-center">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900 mb-4">
                The strategic values and objectives
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                We are an institution dedicated to inspiring, educating, and
                empowering students to reach their full potential. Our ethos is
                lived through small advisory circles, passionate faculty, and a
                learning design that blends discipline with imagination.
              </p>
            </div>
            <blockquote className="bg-white rounded-3xl shadow-sm p-6 border border-slate-100 text-slate-700">
              <p className="text-lg italic">
                "Education at The Scholar's Academy is about self confidence,
                challenge, and enjoyment. It teaches the importance of
                constructive questioning and a sense of responsibility with
                compassion, confidence, and creativity."
              </p>
              <footer className="mt-4 text-sm text-slate-500">
                Vision statement · The Scholar's Academy, Pithoragarh
              </footer>
            </blockquote>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 px-2 md:px-4 my-6">
            {strategicValues.map((value) => (
              <article
                key={value.title}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100"
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {value.copy}
                </p>
              </article>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2 px-2 md:px-4 my-6">
            <img
              src="/PhotoMomemts/P1050333-300x169.jpg"
              alt="Students collaborating"
              className="w-full h-80 object-cover rounded-3xl shadow-lg"
              loading="lazy"
            />
            <img
              src="/PhotoMomemts/P1040016-300x169.jpg"
              alt="Learning studios"
              className="w-full h-80 object-cover rounded-3xl shadow-lg"
              loading="lazy"
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-3 px-2 md:px-4 my-6">
            {strategicObjectives.map((objective) => (
              <article
                key={objective.title}
                className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm"
              >
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  {objective.title}
                </h3>
                <ul className="space-y-3 text-slate-600">
                  {objective.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed"
                    >
                      <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-14 my-14 grid gap-8 lg:grid-cols-[2fr,1fr] items-center">
            <div>
              <h3 className="text-3xl font-semibold mb-4">
                Expectation from Parents
              </h3>
              <p className="text-slate-200 mb-6">
                We see parents as strategic partners. Your encouragement at home
                amplifies every experience children have on campus.
              </p>
              <ul className="space-y-4 text-slate-100 text-sm">
                {parentExpectations.map((expectation) => (
                  <li key={expectation} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
                    <span>{expectation}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/20 text-sm text-slate-200">
              <p className="uppercase tracking-[0.4em] text-xs text-slate-300 mb-4">
                Community note
              </p>
              <p className="leading-relaxed">
                Join our newsletter to receive free educational tips,
                inspirations, and updates straight from the campus studios.
              </p>
              <a
                href="mailto:info@scholarspithoragarh.com"
                className="inline-flex mt-6 items-center text-amber-300 font-semibold"
              >
                info@scholarspithoragarh.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <GallerySection
        slug="our-vision"
        title="Vision In Action"
        description="Evidence boards, parent studios, and student-led nature expeditions that prove our ethos lives beyond the page."
      />
    </>
  );
}
