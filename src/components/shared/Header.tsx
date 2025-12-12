import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { useSuboptionLock } from "../../hooks/useSuboptionLock";
import { AdminPanel } from "../admin/AdminPanel";
import { hasAdminSession } from "../../api/admin";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [desktopOpenDropdown, setDesktopOpenDropdown] = useState<string | null>(
    null
  );
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const { isUnlocked } = useSuboptionLock();

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  const ensureAdminAuth = () => {
    const allowed = hasAdminSession();
    if (!allowed) {
      window.alert(
        "Admin access only. Please sign in through the Admin Dashboard before using this panel."
      );
    }
    return allowed;
  };

  // Keyboard shortcut: Ctrl+Shift+A to open admin panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault();
        if (ensureAdminAuth()) {
          setAdminPanelOpen((prev) => !prev);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const aboutSubItems = [
    {
      href: "/about-us",
      label: "About Us",
      description: "Learn about our institution",
    },
    {
      href: "/our-vision",
      label: "Our Vision",
      description: "Our mission and values",
    },
    {
      href: "/founders-message",
      label: "Founder's Message",
      description: "Words from our founder",
    },
    {
      href: "/our-staff",
      label: "Our Staff",
      description: "Meet our dedicated team",
    },
    {
      href: "/our-management",
      label: "Our Management",
      description: "Leadership team",
    },
  ];

  const academicsSubItems = [
    {
      href: "/academics-curriculum",
      label: "Curriculum",
      description: "Comprehensive academic programs",
    },
    {
      href: "/theLearning",
      label: "theLearning",
      description: "Comprehensive academic programs",
    },
    {
      href: "/academics-faculty",
      label: "Faculty",
      description: "Experienced teaching professionals",
    },
    {
      href: "/academics-results",
      label: "Results & Achievements",
      description: "Student success stories",
    },
    {
      href: "/academics-programs",
      label: "Special Programs",
      description: "Unique learning opportunities",
    },
  ];

  const beyondSubItems = [
    {
      href: "/sports",
      label: "Sports",
      description: "Physical education & athletics",
    },
    {
      href: "/arts-culture",
      label: "Arts & Culture",
      description: "Creative expression",
    },
    {
      href: "/clubs-societies",
      label: "Clubs & Societies",
      description: "Student organizations",
    },
    {
      href: "/community-service",
      label: "Community Service",
      description: "Social responsibility",
    },
  ];

  const admissionsSubItems = [
    {
      href: "/admissions-process",
      label: "Admission Process",
      description: "How to apply",
    },
    {
      href: "/admissions-fees",
      label: "Fees & Scholarships",
      description: "Financial information",
    },
    {
      href: "/admissions-requirements",
      label: "Requirements",
      description: "Eligibility criteria",
    },
    {
      href: "/admissions-contact",
      label: "Contact Admissions",
      description: "Get in touch with us",
    },
  ];

  const campusSubItems = [
    {
      href: "/campus-facilities",
      label: "Facilities",
      description: "Campus infrastructure",
    },
    {
      href: "/campus-accommodation",
      label: "Accommodation",
      description: "Hostel information",
    },
    {
      href: "/campus-events",
      label: "Events",
      description: "Campus activities & events",
    },
    {
      href: "/campus-gallery",
      label: "Gallery",
      description: "Campus photos & videos",
    },
  ];

  const contactSubItems = [
    {
      href: "/contact-office",
      label: "Main Office",
      description: "Administrative office",
    },
    {
      href: "/contact-admissions",
      label: "Admissions Office",
      description: "Admission inquiries",
    },
    {
      href: "/contact-support",
      label: "Support",
      description: "Technical assistance",
    },
    {
      href: "/contact-form",
      label: "Contact Form",
      description: "Send us a message",
    },
  ];

  const navLinks = [
    {
      href: "#about",
      label: "About",
      hasDropdown: true,
      subitems: aboutSubItems,
    },
    {
      href: "#academics",
      label: "Academics",
      hasDropdown: true,
      subitems: academicsSubItems,
    },
    {
      href: "#beyond",
      label: "Beyond Academics",
      hasDropdown: true,
      subitems: beyondSubItems,
    },
    {
      href: "#admissions",
      label: "Admission",
      hasDropdown: true,
      subitems: admissionsSubItems,
    },
    {
      href: "#campus",
      label: "School Life",
      hasDropdown: true,
      subitems: campusSubItems,
    },
    {
      href: "#contact",
      label: "Contact",
      hasDropdown: true,
      subitems: contactSubItems,
    },
  ];

  // Map nav labels to optional suboption IDs that control visibility of the whole "Explore" dropdown
  const navLockIds: Record<string, string> = {
    "School Life": "campus-explore",
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-gray-50/85 border-b border-slate-300/30 w-full">
      <div className="w-full">
        <div className="flex items-center justify-between py-2 px-3 sm:px-4 gap-4 w-full">
          {/* Brand */}
          <a href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-200 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/55 group-hover:shadow-blue-600/70 group-hover:scale-110 transition-all duration-300 cursor-pointer">
              <img
                src="src\\components\\images\\logo\\logo.png"
                alt="School Logo"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div>
              <div className="text-xs sm:text-sm font-bold tracking-wide text-gray-900 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all duration-300">
                The Scholar&apos;s Academy
              </div>
              <div className="text-xs text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
                Pithoragarh
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-3">
              {navLinks.map((link, idx) => {
                const navId = navLockIds[link.label];
                const navUnlocked = navId ? isUnlocked(navId) : true;

                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => {
                      if (closeTimer.current) {
                        clearTimeout(closeTimer.current);
                        closeTimer.current = null;
                      }
                      setDesktopOpenDropdown(link.label);
                    }}
                    onMouseLeave={() => {
                      // delay closing so user can move to popover
                      closeTimer.current = window.setTimeout(() => {
                        setDesktopOpenDropdown(null);
                        closeTimer.current = null;
                      }, 180);
                    }}
                  >
                    {link.hasDropdown ? (
                      <>
                        <button
                          onClick={() =>
                            setDesktopOpenDropdown(
                              desktopOpenDropdown === link.label
                                ? null
                                : link.label
                            )
                          }
                          className={`relative py-0.5 px-1.5 text-sm rounded-lg transition-all duration-200 hover:bg-gray-100 hover:scale-110 flex items-center gap-1 cursor-pointer ${
                            idx === 0
                              ? "text-blue-900 font-medium"
                              : "text-gray-600 hover:text-blue-900"
                          }`}
                        >
                          {link.label}
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-300 ${
                              desktopOpenDropdown === link.label
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>

                        {/* Enhanced Popover-style Dropdown */}
                        {desktopOpenDropdown === link.label &&
                          link.subitems &&
                          navUnlocked && (
                            <div
                              className="absolute left-1/2 -translate-x-1/2 top-full mt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                              onMouseEnter={() => {
                                if (closeTimer.current) {
                                  clearTimeout(closeTimer.current);
                                  closeTimer.current = null;
                                }
                              }}
                              onMouseLeave={() => {
                                closeTimer.current = window.setTimeout(() => {
                                  setDesktopOpenDropdown(null);
                                  closeTimer.current = null;
                                }, 180);
                              }}
                            >
                              {/* Arrow pointer */}
                              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-l border-t border-slate-200 rotate-45"></div>

                              {/* Popover content */}
                              <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/80 border border-slate-100 overflow-hidden backdrop-blur-sm bg-opacity-95 min-w-[1400px] w-[1400px]">
                                {/* Items grid */}
                                <div className="p-2">
                                  {link.subitems
                                    .filter((subitem) =>
                                      isUnlocked(subitem.href.substring(1))
                                    )
                                    .map((subitem) => (
                                      <a
                                        key={subitem.href}
                                        href={subitem.href}
                                        className="group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-gray-100 hover:scale-105"
                                        onClick={() =>
                                          setDesktopOpenDropdown(null)
                                        }
                                      >
                                        <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:bg-blue-700 transition-colors flex-shrink-0"></div>
                                        <div className="flex-1">
                                          <div
                                            className={`text-sm font-bold ${
                                              subitem.label === "Contact Form"
                                                ? "text-red-600"
                                                : "text-gray-900"
                                            } group-hover:text-blue-900 transition-colors flex items-center gap-2`}
                                          >
                                            <span className="whitespace-nowrap">
                                              {subitem.label}
                                            </span>
                                          </div>
                                        </div>
                                      </a>
                                    ))}
                                </div>
                              </div>
                            </div>
                          )}
                      </>
                    ) : (
                      <a
                        href={link.href}
                        className={`relative py-0.5 px-1.5 text-sm rounded-lg transition-all duration-200 hover:scale-110 ${
                          idx === 0
                            ? "text-blue-900 font-medium"
                            : "text-gray-600 hover:text-blue-900 hover:bg-gray-100"
                        }`}
                      >
                        {link.label}
                      </a>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <a
                href="#admissions"
                className="px-3 py-1 text-sm rounded-full bg-white/70 text-blue-900 border border-slate-400/70 hover:bg-blue-50 transition-all duration-200 hover:scale-105"
              >
                Prospectus
              </a>
              <a
                href="#admissions"
                className="inline-flex items-center gap-1.5 px-3 py-1 text-sm rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-all duration-200 hover:scale-105 shadow-lg shadow-blue-500/45"
              >
                <span className="font-bold text-white">New Admission</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-8 h-8 rounded-full border border-slate-400/70 bg-white/70 flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? (
              <X className="w-4.5 h-4.5" />
            ) : (
              <Menu className="w-4.5 h-4.5" />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-2 border-t border-slate-300/70 mt-1 pt-1.5 px-3 sm:px-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const navId = navLockIds[link.label];
                const navUnlocked = navId ? isUnlocked(navId) : true;

                return (
                  <div key={link.href} className="flex flex-col">
                    {link.hasDropdown ? (
                      <>
                        <button
                          onClick={() => {
                            setOpenDropdown(
                              openDropdown === link.label ? null : link.label
                            );
                          }}
                          className="py-1.5 px-2 text-sm text-gray-600 hover:text-blue-900 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105 origin-left text-left flex items-center justify-between"
                        >
                          <span className="font-medium">{link.label}</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-300 ${
                              openDropdown === link.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Mobile Dropdown */}
                        {openDropdown === link.label &&
                          link.subitems &&
                          navUnlocked && (
                            <div className="bg-gradient-to-b from-blue-50/50 to-transparent rounded-lg mt-0.5 overflow-hidden border border-blue-100/50 animate-in fade-in slide-in-from-top-1 duration-200">
                              {link.subitems
                                .filter((subitem) =>
                                  isUnlocked(subitem.href.substring(1))
                                )
                                .map((subitem) => (
                                  <a
                                    key={subitem.href}
                                    href={subitem.href}
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                      setOpenDropdown(null);
                                    }}
                                    className="py-2 px-3 text-xs text-gray-600 hover:text-blue-900 hover:bg-gray-100 transition-all duration-200 hover:scale-105 origin-left flex items-start gap-2 border-b border-blue-100/30 last:border-b-0"
                                  >
                                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                                    <div className="flex-1">
                                      <div
                                        className={`text-sm font-medium whitespace-nowrap ${
                                          subitem.label === "Contact Form"
                                            ? "text-red-600"
                                            : "text-gray-900"
                                        }`}
                                      >
                                        {subitem.label}
                                      </div>
                                      <p className="text-xs text-gray-500 mt-0.5">
                                        {subitem.description}
                                      </p>
                                    </div>
                                  </a>
                                ))}
                            </div>
                          )}
                      </>
                    ) : (
                      <a
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-1.5 px-2 text-sm text-gray-600 hover:text-blue-900 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105 origin-left font-medium"
                      >
                        {link.label}
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <a
                href="#admissions"
                className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
              >
                New Admission
              </a>
              <a
                href="#admissions"
                className="px-3 py-1 text-xs rounded-full bg-white/70 text-blue-900 border border-slate-400/70 hover:bg-blue-50 transition-colors"
              >
                Prospectus
              </a>
            </div>
          </div>
        )}

        {/* Hidden Admin Button (Triple-click on logo) */}
        <button
          onClick={() => {
            if (ensureAdminAuth()) {
              setAdminPanelOpen(true);
            }
          }}
          className="hidden opacity-0 pointer-events-none"
          aria-label="Open admin panel"
        >
          Admin
        </button>

        {/* Admin Panel */}
        <AdminPanel
          isOpen={adminPanelOpen}
          onClose={() => setAdminPanelOpen(false)}
        />
      </div>
    </header>
  );
}
