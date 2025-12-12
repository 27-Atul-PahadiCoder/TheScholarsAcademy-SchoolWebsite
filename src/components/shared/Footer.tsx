export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: '#about', label: 'About' },
    { href: '#academics', label: 'Academics' },
    { href: '#beyond', label: 'Beyond Academics' },
    { href: '#admissions', label: 'Admission' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer className="border-t border-slate-300/80 py-5 mt-8 text-xs text-gray-600 bg-gray-50/85 backdrop-blur-xl">
      <div className="container">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div>
            © {currentYear} The Scholar&apos;s Academy, Pithoragarh. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-3.5">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-gray-700 hover:text-blue-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
