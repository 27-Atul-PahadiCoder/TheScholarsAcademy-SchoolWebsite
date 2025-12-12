import { GallerySection } from "../gallery/GallerySection";

export function FoundersMessage() {
  return (
    <>
      <section id="founders-message" className="py-20 bg-gray-50">
        <div className="container max-w-6xl px-4 mx-auto">
          {/* Section Title */}
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Founder's Message
          </h2>

          {/* Welcome Message */}
          <div className="mb-12">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">
              MR. AJAY OLI
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              <span className="font-bold text-gray-800">Head of School</span>
              <br />
              Greetings to our extended school family. It is with immense joy
              and a sense of purpose that I welcome you to our vibrant learning
              community. As the founder of The Scholar’s Academy, I envisioned a
              haven where young minds could flourish, curiosity could thrive,
              and a lifelong love for learning could take root.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              At The Scholar’s Academy, we believe in nurturing not just
              students but lifelong learners. Our dedicated team of educators is
              committed to providing an environment that fosters intellectual
              curiosity, creativity, and character development. Together, we
              embark on a journey of exploration and growth, where each child is
              encouraged to discover their unique strengths and passions.
            </p>
          </div>

          {/* Image Section for Founder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="rounded-lg shadow-lg overflow-hidden">
              <img
                src="P1040391.jpg"
                alt="Founder Image"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="rounded-lg shadow-lg overflow-hidden">
              <img
                src="P1050379.jpg"
                alt="School Image"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* What makes a child gifted section */}
          <div className="mb-16">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">
              What Makes a Child Gifted
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              What makes a child gifted and talented may not always be good
              grades in school, but a different way of looking at the world and
              learning.
            </p>
          </div>

          {/* Learning by Involvement */}
          <div className="mb-16">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">
              Learning by Involvement
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Learning by involvement is like diving into an ocean of knowledge
              with both curiosity and enthusiasm as your guiding lights. It's
              not just about absorbing information passively; it's about
              actively participating in the journey of discovery. Whether it's
              through hands-on activities, group discussions, or interactive
              projects, involvement in the learning process sparks a sense of
              connection and relevance.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              At Scholar’s Academy, we aim to transform education from a mere
              transfer of facts to a dynamic, engaging experience where students
              become co-creators of their knowledge. In this immersive approach,
              every question is an opportunity, every challenge is a chance to
              grow, and every lesson is a stepping stone towards a deeper
              understanding of the world.
            </p>
            <div className="rounded-lg shadow-lg overflow-hidden">
              <img
                src="P1070932.jpg"
                alt="Interactive Learning"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* Teaching is Teamwork */}
          <div className="mb-16">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">
              Teaching is Teamwork
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Teaching is a collaborative dance, a harmonious partnership
              between educators and learners. It's not a one-sided transmission
              of information, but rather a dynamic exchange where both teachers
              and students contribute to the rhythm of understanding.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              At Scholar’s Academy, like a well-coordinated team, teachers
              provide guidance, support, and knowledge, while students bring
              their curiosity, energy, and unique perspectives to the mix. In
              this collective effort, the classroom transforms into a space
              where ideas are shared, challenges are faced together, and
              victories are celebrated as a team.
            </p>
          </div>

          {/* School Family Message */}
          <div className="mb-16">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Our school is more than just a place of education; it's a
              close-knit family where values like respect, kindness, and
              collaboration are instilled alongside academic excellence. We
              invite you, our parents, to join us as partners in this exciting
              adventure, working hand in hand to ensure the holistic development
              of your child.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Thank you for entrusting us with the privilege of shaping the
              future of your little ones. Here's to a remarkable journey of
              learning, laughter, and limitless possibilities.
            </p>
            <p className="text-lg font-semibold text-gray-800">Warm regards,</p>
            <p className="text-lg text-gray-600">Ajay Chandra Oli</p>
            <p className="text-lg text-gray-600">
              Founder, The Scholar’s Academy
            </p>
            <p className="text-lg text-gray-600">Head of School</p>
          </div>
        </div>
      </section>
      <GallerySection
        slug="founders-message"
        title="From The Founder’s Lens"
        description="Snapshots and video stills curated directly by our founder to show how nature, technology, and joyful rigor intersect on campus."
      />
    </>
  );
}
