import { TopStrip } from "./src/components/shared/TopStrip";
import { Header } from "./src/components/shared/Header";
import { AdminDashboard } from "./src/components/admin/AdminDashboard";
import { AdminButton } from "./src/components/admin/AdminButton";
import ScholarsAcademyPage from "./src/components/pages/BioSection";
import { Hero } from "./src/components/shared/Hero";
import { AgendaSection } from "./src/components/sections/AgendaSection";
import { AcademicsSection } from "./src/components/academics/AcademicsSection";
import { CampusSection } from "./src/components/campus/CampusSection";
import { AdmissionsSection } from "./src/components/admissions/AdmissionsSection";
import { ContactSection } from "./src/components/contact/ContactSection";
import { Footer } from "./src/components/shared/Footer";
import { AboutUs } from "./src/components/pages/AboutUs";
import { OurVision } from "./src/components/pages/OurVision";
import { FoundersMessage } from "./src/components/pages/FoundersMessage";
import { OurStaff } from "./src/components/pages/OurStaff";
import { OurManagement } from "./src/components/pages/OurManagement";
import { TheLearning } from "./src/components/pages/TheLearning";
import { AcademicsCurriculum } from "./src/components/academics/AcademicsCurriculum";
import { AcademicsFaculty } from "./src/components/academics/AcademicsFaculty";
import { AcademicsResults } from "./src/components/academics/AcademicsResults";
import { AcademicsPrograms } from "./src/components/academics/AcademicsPrograms";
import { Sports } from "./src/components/beyond/Sports";
import { ArtsCulture } from "./src/components/beyond/ArtsCulture";
import { ClubsSocieties } from "./src/components/beyond/ClubsSocieties";
import { CommunityService } from "./src/components/beyond/CommunityService";
import { AdmissionsProcess } from "./src/components/admissions/AdmissionsProcess";
import { AdmissionsFees } from "./src/components/admissions/AdmissionsFees";
import { AdmissionsRequirements } from "./src/components/admissions/AdmissionsRequirements";
import { AdmissionsContact } from "./src/components/admissions/AdmissionsContact";
import { CampusFacilities } from "./src/components/campus/CampusFacilities";
import { CampusAccommodation } from "./src/components/campus/CampusAccommodation";
import { CampusEvents } from "./src/components/campus/CampusEvents";
import { SchoolGallery } from "./src/components/campus/SchoolGallery";
import { ContactOffice } from "./src/components/contact/ContactOffice";
import { ContactAdmissions } from "./src/components/contact/ContactAdmissions";
import { ContactSupport } from "./src/components/contact/ContactSupport";
import { ContactForm } from "./src/components/contact/ContactForm";
import { useScrollReveal } from "./src/hooks/useScrollReveal";

export default function App() {
  useScrollReveal();
  const path = window.location.pathname;

  // Handle admin button click
  const handleAdminClick = () => {
    window.location.pathname = "/admin";
  };

  // Admin Dashboard Route
  if (path === "/admin") {
    return <AdminDashboard />;
  }

  // Render individual pages based on URL path
  if (path === "/about-us") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <AboutUs />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  if (path === "/our-vision") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <OurVision />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  if (path === "/founders-message") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <FoundersMessage />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  if (path === "/our-staff") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <OurStaff />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  if (path === "/our-management") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <OurManagement />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  // Academics
  if (path === "/academics-curriculum") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <AcademicsCurriculum />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  if (path === "/academics-faculty") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <AcademicsFaculty />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  if (path === "/academics-results") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <AcademicsResults />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  if (path === "/academics-programs") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <AcademicsPrograms />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  if (path === "/theLearning") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <TheLearning />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  // Beyond Academics
  if (path === "/sports") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <Sports />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  if (path === "/arts-culture") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <ArtsCulture />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  if (path === "/clubs-societies") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <ClubsSocieties />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  if (path === "/community-service") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <CommunityService />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  // Admissions
  if (path === "/admissions-process") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <AdmissionsProcess />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  if (path === "/admissions-fees") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <AdmissionsFees />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  if (path === "/admissions-requirements") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <AdmissionsRequirements />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  if (path === "/admissions-contact") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <AdmissionsContact />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  // School Life
  if (path === "/campus-facilities") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <CampusFacilities />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  if (path === "/campus-accommodation") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <CampusAccommodation />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  if (path === "/campus-events") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <CampusEvents />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  if (path === "/campus-gallery") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <SchoolGallery />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  // Contact
  if (path === "/contact-office") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <ContactOffice />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  if (path === "/contact-admissions") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <ContactAdmissions />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  if (path === "/contact-support") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <ContactSupport />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  if (path === "/contact-form") {
    return (
      <div className="min-h-screen flex flex-col" id="top">
        <TopStrip />
        <Header />
        <main className="flex-1">
          <ContactForm />
        </main>
        <Footer />
        <AdminButton onClick={handleAdminClick} />
      </div>
    );
  }

  // Default home page
  return (
    <div className="min-h-screen flex flex-col" id="top">
      <TopStrip />
      <Header />
      <main className="flex-1">
        <ScholarsAcademyPage />
        <Hero />
        <AgendaSection />
        <AcademicsSection />
        <CampusSection />
        <AdmissionsSection />
        <ContactSection />
      </main>
      <Footer />
      <AdminButton onClick={handleAdminClick} />
    </div>
  );
}
