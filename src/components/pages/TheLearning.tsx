import { GallerySection } from "../gallery/GallerySection";

export function TheLearning() {
  return (
    <>
      <section id="learning" className="py-20 bg-gray-50">
        <div className="container max-w-6xl px-4 mx-auto">
          {/* Section Header */}
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Learning at The Scholar's Academy
          </h2>

          {/* Introduction Section */}
          <div className="mb-12 text-center">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Learning at The Scholar's Academy is backed by state-of-the-art
              laboratories, workshops, and libraries. Our aim is to keep
              students up-to-date with the latest technology and trends.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Our teaching faculty consists of a perfect balance of men and
              women educators who work together to provide a dynamic learning
              environment. With a student-teacher ratio of 20:1, we ensure that
              each child receives personalized attention to help them thrive
              academically and personally.
            </p>
          </div>

          {/* Faculty and Student Ratio Stats */}
          <div className="flex justify-center space-x-12 mb-12">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-3xl font-semibold text-gray-800 mb-2">18</h3>
              <p className="text-lg text-gray-500">Teaching Faculty</p>
              <p className="text-md text-gray-400">2 Men & 16 Women</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-3xl font-semibold text-gray-800 mb-2">
                20:1
              </h3>
              <p className="text-lg text-gray-500">Student-Teacher Ratio</p>
              <p className="text-md text-gray-400">Personalized Attention</p>
            </div>
          </div>

          {/* Faculty Testimonial Section */}
          <div className="mb-12 flex justify-center">
            <div className="glow-border w-full max-w-3xl">
              <div className="glow-border__inner text-center px-8 py-10">
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  <q className="italic text-xl text-gray-800">
                    The Scholar's Academy is a wonderful place to work. My
                    colleagues are smart, kind, and supportive. The school is
                    well organized and efficient. But what keeps me coming back
                    are the wonderful kids I get to teach and learn from every
                    day. They are in the right hands.
                  </q>
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  Ajay Chandra Oli
                  <br />
                  Head of the School
                </p>
              </div>
            </div>
          </div>

          {/* Teachers’ Vision Section */}
          <div className="mb-12 text-center">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">
              Your Dreams, Our Dreams
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Teachers at The Scholar's Academy are not only experts in
              academics but also skilled in treating every child equally with
              compassion and care. We strive to foster an inclusive, supportive,
              and nurturing environment that encourages both academic and
              personal growth.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              The Scholar’s Academy is renowned for its dual commitment to
              academic excellence and compassionate care. Our educators
              prioritize not only knowledge, but also the social, emotional, and
              personal development of each student.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              At The Scholar’s Academy, students are not only encouraged to
              excel academically, but they are also nurtured to become
              compassionate, empathetic individuals, equipped to make a positive
              impact in the world.
            </p>
          </div>

          {/* Meet the Staff Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              Meet the Staff
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src="P1060256.jpg"
                  alt="Staff Member 1"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    John Doe
                  </h4>
                  <p className="text-md text-gray-500">Mathematics Teacher</p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src="IMG_20230805_114821.jpg"
                  alt="Staff Member 2"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    Jane Smith
                  </h4>
                  <p className="text-md text-gray-500">English Teacher</p>
                </div>
              </div>
            </div>
          </div>

          {/* Final Message */}
          <div className="text-center">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              The Scholar’s Academy is more than just a place of learning; it is
              a community dedicated to nurturing the minds and hearts of its
              students. Through unwavering commitment to academic excellence and
              compassionate care, we are shaping the leaders and changemakers of
              tomorrow.
            </p>
          </div>
        </div>
      </section>
      <GallerySection
        slug="theLearning"
        title="Learning Journeys"
        description="Lab builds, robotics jams, and outdoor science studios—updated directly from the academics team."
      />
    </>
  );
}
