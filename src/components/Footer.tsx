import { Link } from 'react-router-dom'
import { Zap, Play, Globe, Link2, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Zap size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">Skills021</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Your one-stop platform for programming courses, DSA prep, and university counseling for AKTU, IPU, JoSAA & JAC Delhi students.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.youtube.com/@skills021"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-red-600 flex items-center justify-center transition-colors duration-200"
                aria-label="YouTube"
              >
                <Play size={18} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-gray-700 flex items-center justify-center transition-colors duration-200"
                aria-label="GitHub"
              >
                <Globe size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Link2 size={18} />
              </a>
              <a
                href="mailto:contact@skills021.com"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-primary-500 flex items-center justify-center transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Courses</h3>
            <ul className="space-y-3">
              {['DSA with Java', 'Advanced DSA', 'Java Programming A-Z', 'Django Web Dev', 'DevOps & Docker', 'Python for Data Science'].map((item) => (
                <li key={item}>
                  <Link to="/courses" className="text-sm text-gray-400 hover:text-primary-400 transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Counseling */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Counseling</h3>
            <ul className="space-y-3">
              {['AKTU Counseling', 'IPU Counseling', 'JoSAA Guidance', 'JAC Delhi Help', 'Hackathon Hub', 'Career Guidance'].map((item) => (
                <li key={item}>
                  <Link to="/counseling" className="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              {[
                { name: 'About Skills021', path: '/' },
                { name: 'Contact Us', path: '/' },
                { name: 'Privacy Policy', path: '/' },
                { name: 'Terms of Service', path: '/' },
                { name: 'Refund Policy', path: '/' },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2025 Skills021. All rights reserved. Made with ❤️ for Indian students.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-gray-600">🇮🇳 India</span>
            <a href="https://www.youtube.com/@skills021" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-red-400 transition-colors">
              YouTube Channel
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
