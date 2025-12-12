/**
 * Suboptions Lock Configuration
 * Developers can lock/unlock suboptions by validating against secret keys
 * Each subitem has:
 * - id: unique identifier
 * - locked: default lock status
 * - secretKey: key required to unlock (keep secret in real app, use env vars)
 */

export interface SuboptionLock {
  id: string;
  label: string;
  href: string;
  locked: boolean;
  secretKey: string; // Use environment variables in production
}

export const SUBOPTIONS_LOCKS: Record<string, SuboptionLock[]> = {
  about: [
    {
      id: "about-us",
      label: "About Us",
      href: "/about-us",
      locked: false,
      secretKey: "dev-about-us-2024",
    },
    {
      id: "our-vision",
      label: "Our Vision",
      href: "/our-vision",
      locked: false,
      secretKey: "dev-vision-key",
    },
    {
      id: "founders-message",
      label: "Founder's Message",
      href: "/founders-message",
      locked: false,
      secretKey: "dev-founder-msg",
    },
    {
      id: "our-staff",
      label: "Our Staff",
      href: "/our-staff",
      locked: false,
      secretKey: "dev-staff-key",
    },
    {
      id: "our-management",
      label: "Our Management",
      href: "/our-management",
      locked: false,
      secretKey: "dev-management-key",
    },
  ],
  academics: [
    {
      id: "academics-curriculum",
      label: "Curriculum",
      href: "/academics-curriculum",
      locked: false,
      secretKey: "dev-curriculum-2024",
    },
    {
      id: "theLearning",
      label: "theLearning",
      href: "/theLearning",
      locked: false,
      secretKey: "dev-learning-key",
    },
    {
      id: "academics-faculty",
      label: "Faculty",
      href: "/academics-faculty",
      locked: false,
      secretKey: "dev-faculty-key",
    },
    {
      id: "academics-results",
      label: "Results & Achievements",
      href: "/academics-results",
      locked: false,
      secretKey: "dev-results-key",
    },
    {
      id: "academics-programs",
      label: "Special Programs",
      href: "/academics-programs",
      locked: false,
      secretKey: "dev-programs-key",
    },
  ],
  beyond: [
    {
      id: "sports",
      label: "Sports",
      href: "/sports",
      locked: false,
      secretKey: "dev-sports-2024",
    },
    {
      id: "arts-culture",
      label: "Arts & Culture",
      href: "/arts-culture",
      locked: false,
      secretKey: "dev-arts-key",
    },
    {
      id: "clubs-societies",
      label: "Clubs & Societies",
      href: "/clubs-societies",
      locked: false,
      secretKey: "dev-clubs-key",
    },
    {
      id: "community-service",
      label: "Community Service",
      href: "/community-service",
      locked: false,
      secretKey: "dev-community-key",
    },
  ],
  admissions: [
    {
      id: "admissions-process",
      label: "Admission Process",
      href: "/admissions-process",
      locked: false,
      secretKey: "dev-process-2024",
    },
    {
      id: "admissions-fees",
      label: "Fees & Scholarships",
      href: "/admissions-fees",
      locked: false,
      secretKey: "dev-fees-key",
    },
    {
      id: "admissions-requirements",
      label: "Requirements",
      href: "/admissions-requirements",
      locked: false,
      secretKey: "dev-requirements-key",
    },
    {
      id: "admissions-contact",
      label: "Contact Admissions",
      href: "/admissions-contact",
      locked: false,
      secretKey: "dev-admissions-key",
    },
  ],
  campus: [
    {
      id: "campus-explore",
      label: "Explore School Life",
      href: "/campus",
      locked: false,
      secretKey: "dev-campus-explore-key",
    },
    {
      id: "campus-facilities",
      label: "Facilities",
      href: "/campus-facilities",
      locked: false,
      secretKey: "dev-facilities-2024",
    },
    {
      id: "campus-accommodation",
      label: "Accommodation",
      href: "/campus-accommodation",
      locked: false,
      secretKey: "dev-accommodation-key",
    },
    {
      id: "campus-events",
      label: "Events",
      href: "/campus-events",
      locked: false,
      secretKey: "dev-events-key",
    },
    {
      id: "campus-gallery",
      label: "Gallery",
      href: "/campus-gallery",
      locked: false,
      secretKey: "dev-gallery-key",
    },
  ],
  contact: [
    {
      id: "contact-office",
      label: "Main Office",
      href: "/contact-office",
      locked: false,
      secretKey: "dev-office-2024",
    },
    {
      id: "contact-admissions",
      label: "Admissions Office",
      href: "/contact-admissions",
      locked: false,
      secretKey: "dev-contact-admissions-key",
    },
    {
      id: "contact-support",
      label: "Support",
      href: "/contact-support",
      locked: false,
      secretKey: "dev-support-key",
    },
    {
      id: "contact-form",
      label: "Contact Form",
      href: "/contact-form",
      locked: false,
      secretKey: "dev-contact-form-key",
    },
  ],
};

/**
 * Get all suboptions for a category
 */
export function getSuboptionsForCategory(category: string): SuboptionLock[] {
  return SUBOPTIONS_LOCKS[category] || [];
}

/**
 * Get a specific suboption by id
 */
export function getSuboptionById(id: string): SuboptionLock | undefined {
  for (const category in SUBOPTIONS_LOCKS) {
    const found = SUBOPTIONS_LOCKS[category].find((item) => item.id === id);
    if (found) return found;
  }
  return undefined;
}

export const ALL_SUBOPTIONS: SuboptionLock[] =
  Object.values(SUBOPTIONS_LOCKS).flat();

/**
 * Validate secret key for a suboption
 */
export function validateSecretKey(
  suboptionId: string,
  providedKey: string
): boolean {
  const subitem = getSuboptionById(suboptionId);
  if (!subitem) return false;
  return subitem.secretKey === providedKey;
}
