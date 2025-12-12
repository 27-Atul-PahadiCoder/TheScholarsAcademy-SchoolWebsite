export function TopStrip() {
  return (
    <div className="bg-slate-900 text-gray-200">
      <div className="container">
        <div className="flex items-center justify-between gap-4 py-1.5 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 bg-opacity-80 border border-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span className="text-sm">Pithoragarh • CBSE School</span>
            </span>
            <span className="text-sm">Call us: +91 75258 38880</span>
            <span className="text-sm hidden sm:inline">Mon–Sat • 8:30 AM – 3:00 PM</span>
          </div>
          <div>
            <a
              href="#admissions"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-orange-500/35"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span className="text-sm">New Admissions Open</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
