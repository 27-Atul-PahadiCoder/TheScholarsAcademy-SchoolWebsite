import { useState } from 'react';

export function ContactSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <section id="contact" className="py-10">
      <div className="container">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-600 mb-1">Contact</div>
            <h2>Visit or reach out to us</h2>
          </div>
          <p className="text-sm text-gray-600 max-w-md">
            We welcome parents to visit the campus, understand our approach and experience the
            atmosphere in person.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6">
          {/* Contact Card */}
          <div className="bg-white rounded-[18px] p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)] border border-gray-200/90 text-sm">
            <div className="mb-2.5">
              <div className="text-xs uppercase tracking-widest text-gray-600 mb-1">Address</div>
              <div>
                District Hospital Road, Near Doctor&apos;s Colony,
                <br />
                Pithoragarh, Uttarakhand 262501
              </div>
            </div>
            <div className="mb-2.5">
              <div className="text-xs uppercase tracking-widest text-gray-600 mb-1">Phone</div>
              <div>+91 75258 38880</div>
            </div>
            <div className="mb-2.5">
              <div className="text-xs uppercase tracking-widest text-gray-600 mb-1">
                School timings
              </div>
              <div>Monday – Saturday • 8:30 AM – 3:00 PM</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-gray-600 mb-1">Visit</div>
              <div>
                Please call the office to schedule a visit or simply walk in during school hours.
              </div>
            </div>
          </div>

          {/* Newsletter Card */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-[18px] p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)] border border-blue-200/90 text-sm">
            <div className="mb-1">Join our newsletter</div>
            <p className="mb-3">
              Get school updates, event highlights and learning tips straight to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-wrap gap-2.5 mb-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 px-4 py-2 rounded-full border border-slate-400/90 outline-none focus:border-blue-600 focus:shadow-[0_0_0_1px_rgba(37,99,235,0.35)] text-sm"
                placeholder="Your email address"
                required
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-600">
              We respect your time and privacy. No spam, only school updates and useful content.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
