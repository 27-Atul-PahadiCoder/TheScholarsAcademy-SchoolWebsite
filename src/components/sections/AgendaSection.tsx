export function AgendaSection() {
  const cards = [
    {
      icon: '📘',
      title: 'Deep, structured learning',
      body: 'A clear curriculum, strong classroom teaching and regular assessments to build conceptual understanding, not just rote learning.',
      tags: ['The Learning', 'Curriculum'],
    },
    {
      icon: '🎭',
      title: 'Life beyond textbooks',
      body: 'Dance, music, sports and games are woven into the experience so that every student discovers their unique strengths.',
      tags: ['Dance & Music', 'Sports & Games', 'Yoga & Meditation'],
    },
    {
      icon: '📊',
      title: 'Daily tracking & feedback',
      body: 'A daily tracking and reporting system for every single student so parents know exactly how their child is progressing.',
      tags: ['Daily reporting', 'Parent transparency'],
    },
  ];

  return (
    <section className="py-10">
      <div className="container">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-600 mb-1">Our agenda</div>
            <h2>What The Scholar&apos;s Academy is built for</h2>
          </div>
          <p className="text-sm text-gray-600 max-w-md">
            Every decision — from classroom design to co-curricular activities — is aligned with
            one core agenda: helping students grow as confident, curious and disciplined human
            beings.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, idx) => (
            <article
              key={idx}
              className="bg-white rounded-[18px] p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)] border border-gray-200/90 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.16)] hover:border-indigo-300 transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-100/90 flex items-center justify-center mb-2.5">
                <span>{card.icon}</span>
              </div>
              <h3 className="mb-1.5">{card.title}</h3>
              <p className="text-sm text-gray-600 mb-2.5">{card.body}</p>
              <div className="flex flex-wrap gap-1.5">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-slate-900/3 text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
