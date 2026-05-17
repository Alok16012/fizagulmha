const quickLinks = ['Home', 'Courses', 'Admission', 'Student Zone', 'Law Entrance Exams', 'Gallery'];
const resources = ['Previous Year Papers', 'Current Affairs', 'Quizzes', 'Online Resources'];
const company = ['About Us', 'Careers', 'Faculty', 'Contact', 'Privacy Policy', 'Legal'];
const courses = ['CLAT', 'CLAT+AILET', 'CUET (UG)', 'CUET (PG)', 'OLET', 'CLAT+OLET', 'Booster Course'];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy-dark)' }} className="text-white">
      {/* CTA Banner */}
      <div style={{ background: 'var(--cyan)' }} className="py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-black text-xl text-white">Start Your CLAT Journey Today</h3>
            <p className="text-white/80 text-sm mt-0.5">Join 1.25 Lakh+ students who chose CLATians.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a href="tel:8507700177"
              className="px-5 py-2.5 rounded-xl font-bold text-cyan-700 bg-white text-sm hover:bg-gray-50 transition-colors">
              📞 Call Now
            </a>
            <a href="#admission"
              className="px-5 py-2.5 rounded-xl font-bold text-white border border-white/30 text-sm hover:bg-white/10 transition-colors">
              Apply Now →
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            {/* Logo */}
            <div className="mb-4">
              <div className="bg-white rounded-xl px-3 py-1.5 inline-block">
                <img src="/logo.png" alt="CLATians" className="h-10 w-auto object-contain" />
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Your trusted institute for CLAT, AILET, and other law entrance preparations. Expert guidance by NLU Alumni.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-5">
              {[
                { icon: 'f', label: 'Facebook', color: '#1877f2' },
                { icon: '📷', label: 'Instagram', color: '#e1306c' },
                { icon: '▶', label: 'YouTube', color: '#ff0000' },
                { icon: 'in', label: 'LinkedIn', color: '#0a66c2' },
                { icon: '𝕏', label: 'Twitter', color: '#000' },
              ].map((s) => (
                <a key={s.label} href="#" title={s.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-transform hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-5 space-y-2">
              <a href="tel:8507700177" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                <span>📞</span> 8507700177
              </a>
              <p className="text-xs text-white/40 leading-relaxed">
                2nd Floor, Gangotri Palace, Boring Rd, Patna, Bihar 800001
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-white/80 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-white/80 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-white/80 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              {company.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-white/80 uppercase tracking-wider">Courses</h4>
            <ul className="space-y-2">
              {courses.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">© 2026 CLATians – All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">Legal</a>
          </div>
        </div>
      </div>

      {/* Mobile bottom spacer (to avoid content hiding behind fixed bottom nav) */}
      <div className="h-16 md:hidden" />
    </footer>
  );
}
