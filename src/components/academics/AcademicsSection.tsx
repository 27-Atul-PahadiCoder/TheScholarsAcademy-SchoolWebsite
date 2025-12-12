export function AcademicsSection() {
  const beyondCards = [
    {
      icon: '🎶',
      title: 'Dance & Music',
      body: 'Expression, rhythm and confidence training through performances.',
    },
    {
      icon: '🏏',
      title: 'Sports & Games',
      body: 'Teamwork, fitness and resilience on the ground, not just in theory.',
    },
    {
      icon: '🧘‍♀️',
      title: 'Yoga & Meditation',
      body: 'Calm focus and emotional balance through regular mindfulness practices.',
    },
  ];

  return (
    <section id="academics" className="py-10">
      <div className="container">
        <div className="grid lg:grid-cols-[1.3fr_1.1fr] gap-8 mb-8">
          {/* Academics */}
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-600 mb-1">Academics</div>
            <h2>Strong foundation, joyful classrooms</h2>
            <p className="text-sm text-gray-600 max-w-md mb-4">
              Learning is not a container to be filled, but a fire to be kindled. Classrooms are
              designed to be interactive, disciplined and genuinely engaging.
            </p>
            <ul className="space-y-2.5">
              {[
                'Structured curriculum with clear yearly learning outcomes.',
                'Regular tests and progress reviews to identify gaps early.',
                'Teacher mentoring and feedback for both academic and personal growth.',
                'Calm, focused classroom culture that rewards effort and discipline.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-500/90 flex-shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Beyond Academics */}
          <div id="beyond">
            <div className="text-xs uppercase tracking-widest text-gray-600 mb-1">
              Beyond academics
            </div>
            <h2>Music, movement & mindfulness</h2>
            <p className="text-sm text-gray-600 max-w-md mb-4">
              Children learn best when their body, mind and emotions are all engaged. Co-curricular
              activities at The Scholar&apos;s Academy are not an afterthought; they are part of the
              core experience.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {beyondCards.map((card, idx) => (
                <article
                  key={idx}
                  className="bg-white rounded-[18px] p-3.5 shadow-[0_10px_30px_rgba(15,23,42,0.08)] border border-gray-200/90 hover:-translate-y-1 transition-all"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-100/90 flex items-center justify-center mb-2">
                    <span>{card.icon}</span>
                  </div>
                  <h3 className="text-[15px] mb-1">{card.title}</h3>
                  <p className="text-sm text-gray-600">{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="rounded-full bg-gradient-to-r from-blue-700 via-indigo-600 to-orange-500 px-5 py-2.5 flex flex-wrap gap-4 items-center text-gray-200 text-sm shadow-lg shadow-blue-800/58">
          <div className="flex flex-wrap gap-5 flex-1">
            <div className="flex flex-col gap-0.5 min-w-[90px]">
              <span className="text-xs uppercase tracking-widest opacity-85">Daily tracking</span>
              <span>Every student monitored individually</span>
            </div>
            <div className="flex flex-col gap-0.5 min-w-[90px]">
              <span className="text-xs uppercase tracking-widest opacity-85">Holistic growth</span>
              <span>Academics + arts + sports + values</span>
            </div>
            <div className="flex flex-col gap-0.5 min-w-[90px]">
              <span className="text-xs uppercase tracking-widest opacity-85">Parents</span>
              <span>Regular reporting & open communication</span>
            </div>
          </div>
          <div className="text-xs max-w-[220px]">
            &quot;We strive to provide the spark that kindles a genuine love for knowledge and
            opens doors beyond conventional learning.&quot;
          </div>
        </div>
      </div>
    </section>
  );
}
