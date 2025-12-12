import { GallerySection } from "../gallery/GallerySection";

export function OurManagement() {
  return (
    <>
      <section id="our-management" className="py-20 bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Our Management
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Our management team is committed to maintaining the highest
            standards of education and administration. With years of experience
            in educational leadership, they ensure that The Scholar's Academy
            operates with integrity, transparency, and a focus on student
            welfare and academic excellence.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            The management believes in collaborative decision-making and values
            the input of all stakeholders including parents, teachers, and
            students.
          </p>
        </div>
      </section>
      <GallerySection
        slug="our-management"
        title="Transparent Leadership In Focus"
        description="Board meet-ups, parent councils, and data walls that show how our management team keeps innovation grounded in accountability."
      />
    </>
  );
}
