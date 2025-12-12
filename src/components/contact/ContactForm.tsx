import { useEffect, useRef, useState } from "react";
import { AdminButton } from "../admin/AdminButton";

export function ContactForm() {
  const backgroundImage =
    "/images/Faculty-Staff/pexels-photo-872955-qdawmgbb24l6wdvk53jcflsth25gu0xtbrs6m27ya4.jpg";
  const sectionRef = useRef<HTMLElement | null>(null);
  const [cardLift, setCardLift] = useState(0);
  const parallaxShift = Math.min(cardLift * 1.25, 220);
  const handleAdminAccess = () => {
    window.location.href = "/admin";
  };

  useEffect(() => {
    let animationFrame: number | null = null;

    const handleScroll = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (section) {
          const rect = section.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const progress = Math.min(
            1,
            Math.max(0, (windowHeight - rect.top) / (windowHeight * 0.9))
          );
          setCardLift(progress * 90);
        }
        animationFrame = null;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact-form"
      className="relative isolate min-h-[150vh] overflow-visible bg-slate-900"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${parallaxShift * -0.15}px)`,
          transition: "transform 0.6s ease-out",
        }}
      >
        <img
          src={backgroundImage}
          alt="Contact background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/85 via-slate-900/70 to-slate-900/60" />
      </div>

      <div className="relative z-10 container flex min-h-screen max-w-5xl items-center justify-center py-24 sm:py-32 lg:py-40">
        <div
          className="pointer-events-none absolute inset-x-0 -top-20 flex justify-center px-4"
          style={{
            transform: `translateY(${parallaxShift * -0.55}px)`,
            transition: "transform 0.6s ease-out",
          }}
        >
          <div
            className="relative z-20 rounded-[36px] bg-white/98 p-8 text-center shadow-[0_40px_120px_rgba(15,23,42,0.35)] ring-1 ring-white/70 backdrop-blur lg:p-16"
            style={{
              transform: `translateY(${-cardLift * 0.9}px)`,
              transition: "transform 0.6s ease-out",
            }}
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-blue-50/90 px-5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-blue-800 mx-auto">
              Contact
            </div>
            <h2 className="mx-auto max-w-3xl text-5xl font-bold leading-tight text-black sm:text-6xl lg:text-7xl">
              Let&apos;s Start a Conversation
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-xl font-semibold leading-relaxed text-black sm:text-2xl">
              Have a message for us? Use our contact form to reach out directly.
              Whether you have questions, feedback, or inquiries, we&apos;d love
              to hear from you. Fill out the form with your details and message,
              and our team will respond to you as soon as possible.
            </p>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-36 rounded-t-[56px] bg-white shadow-[0_-25px_80px_rgba(15,23,42,0.25)]"
        style={{
          transform: `translateY(${Math.max(-cardLift * 0.55, -80)}px)`,
          transition: "transform 0.6s ease-out",
        }}
      ></div>
      <AdminButton onClick={handleAdminAccess} />
    </section>
  );
}
