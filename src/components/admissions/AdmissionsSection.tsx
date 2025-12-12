export function AdmissionsSection() {
  return (
    <section id="admissions" className="py-10">
      <div className="container">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-600 mb-1">
              Admission
            </div>
            <h2>Ready to join The Scholar&apos;s Academy?</h2>
          </div>
          <p className="text-sm text-gray-600 max-w-md">
            Admissions are open for the new academic year. Our team will guide
            you through the complete process — from enquiry to fee structure.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-5 rounded-[26px] bg-gradient-to-br from-blue-50 to-slate-800 p-6 text-gray-200 shadow-[0_18px_45px_rgba(15,23,42,0.12)] mt-4">
          {/* Left */}
          <div>
            <div className="text-xl mb-1.5 text-black">How admission works</div>
            <p className="text-sm text-black mb-3.5 max-w-sm">
              Whether you are a parent from Pithoragarh or nearby areas, the
              process is straightforward and transparent.
            </p>

            <ul className="space-y-1.5 text-sm text-blue-100 mb-4">
              {[
                "Step 1 — Visit or call the school office for an enquiry.",
                "Step 2 — Collect the admission form and prospectus.",
                "Step 3 — Submit documents and complete interaction / assessment.",
                "Step 4 — Confirm admission and complete the fee formalities.",
              ].map((step, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+917525838880"
                className="px-5 py-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
              >
                Call office: +91 75258 38880
              </a>
              <a
                href="#contact"
                className="px-5 py-2 rounded-full bg-white/70 text-blue-900 border border-slate-400/70 hover:bg-blue-50 transition-colors"
              >
                Visit school &rarr;
              </a>
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="rounded-[18px] bg-slate-900/82 p-3.5 text-sm border border-slate-600/75">
              <div className="text-[15px] text-gray-200 mb-1">
                Transparent fee structure
              </div>
              <div className="mb-2 text-gray-200">
                Fee details are shared clearly with parents along with any
                additional facility charges.
              </div>
              <ul className="space-y-1.5 text-sm text-blue-100 mb-3">
                {[
                  "Age-appropriate class placement",
                  "Guidance on transport, uniforms & books",
                  "Parents testimonials available for reference",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="#"
                  className="px-4 py-2 rounded-full bg-white/70 text-blue-900 border border-slate-400/70 hover:bg-blue-50 transition-colors text-sm"
                >
                  Download Prospectus
                </a>
                <a
                  href="#"
                  className="px-4 py-2 rounded-full bg-white/70 text-blue-900 border border-slate-400/70 hover:bg-blue-50 transition-colors text-sm"
                >
                  View Fee Structure
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
