import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Target, Building2, Trophy, ArrowRight, Play, Star, ChevronRight, Zap, Code2, Users2, Video, GraduationCap, MessageCircle } from 'lucide-react'
import CourseCard from '../components/CourseCard'
import HackathonCard from '../components/HackathonCard'
import { courses } from '../data/courses'
import { hackathons } from '../data/hackathons'

// Count-up hook
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return { count, ref }
}

// ─── Stat Card (bottom row, matching reference) ─────────────────────────────
function StatCard({
  value, suffix, label, sublabel, icon: Icon, iconBg, iconColor,
}: {
  value: number; suffix: string; label: string; sublabel: string
  icon: typeof Users2; iconBg: string; iconColor: string
}) {
  const { count, ref } = useCountUp(value)
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="bg-white dark:bg-brand-dark-card rounded-2xl shadow-card border border-brand-border dark:border-brand-dark-border px-6 py-5 flex items-center gap-4"
    >
      <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
        <Icon size={24} className={iconColor} />
      </div>
      <div>
        <div className="text-2xl font-black text-brand-text dark:text-brand-dark-text leading-none">
          {count.toLocaleString()}{suffix}
        </div>
        <div className="text-sm font-semibold text-brand-text dark:text-brand-dark-text mt-0.5">{label}</div>
        <div className="text-xs text-brand-muted dark:text-brand-dark-muted mt-0.5">{sublabel}</div>
      </div>
    </motion.div>
  )
}

// Decorative floating badge shown near the illustration
function FloatingBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute bg-white dark:bg-brand-dark-card rounded-2xl shadow-card-hover border border-brand-border dark:border-brand-dark-border px-3 py-2.5 flex items-center gap-2 ${className}`}
    >
      {children}
    </motion.div>
  )
}

const avatarColors = ['#6C63FF', '#10B981', '#F59E0B', '#EF4444', '#00BFA6']
const avatarInitials = ['AR', 'SG', 'RK', 'PV', 'AK']

const testimonials = [
  {
    name: 'Ankit Rawat',
    college: 'ABES Engineering College, AKTU',
    quote: 'Skills021 completely transformed my DSA preparation. Got placed at TCS with ₹7 LPA package!',
    rating: 5,
    initials: 'AR',
    color: '#6C63FF',
  },
  {
    name: 'Sneha Gupta',
    college: 'MSIT, IP University',
    quote: 'The IPU counseling session was incredibly detailed. Got into my first-choice branch thanks to Skills021!',
    rating: 5,
    initials: 'SG',
    color: '#10B981',
  },
  {
    name: 'Rohit Kumar',
    college: 'DTU, Delhi',
    quote: 'JAC Delhi cutoff analysis was spot-on. The Java + DSA combo course got me ready for placements.',
    rating: 5,
    initials: 'RK',
    color: '#00BFA6',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* ═══════════════════════════════════════════════
          HERO SECTION — Light theme, two-column layout
          ═══════════════════════════════════════════════ */}
      <section className="relative bg-[#EEF0FF] dark:bg-[#13132A] overflow-hidden pt-24 pb-0 min-h-[92vh] flex flex-col">

        {/* Subtle background orbs */}
        <div
          className="absolute top-[-120px] right-[-80px] w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #6C63FF 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-[-60px] w-[300px] h-[300px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #00BFA6 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col">
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center py-8 lg:py-12">

            {/* ── LEFT: Text Content ── */}
            <div className="flex flex-col items-start">

              {/* Badge pill */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-white dark:bg-white/10 border border-primary-100 dark:border-white/20 rounded-full px-4 py-2 text-sm font-medium text-[#1A1A2E] dark:text-gray-200 mb-7 shadow-sm"
              >
                <Zap size={14} className="text-primary-500" />
                India's #1 Platform for CS Students
              </motion.div>

              {/* Main headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="text-5xl sm:text-6xl lg:text-[64px] font-black text-[#1A1A2E] dark:text-[#F1F1FF] leading-[1.1] tracking-tight mb-6"
              >
                Learn.{' '}
                <span className="text-primary-500">Build.</span>
                <br />
                Get Placed.
              </motion.h1>

              {/* Sub-headline */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16 }}
                className="text-base md:text-[17px] text-[#6B7280] dark:text-gray-400 leading-relaxed mb-8 max-w-lg"
              >
                Programming courses, DSA prep, and university counseling
                <br />
                for{' '}
                <span className="text-primary-500 font-semibold">AKTU</span>,{' '}
                <span className="text-teal-500 font-semibold">IPU</span>,{' '}
                <span className="text-amber-500 font-semibold">JoSAA</span>{' '}&{' '}
                <span className="text-green-600 font-semibold">JAC Delhi</span>{' '}students.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.24 }}
                className="flex flex-wrap items-center gap-4 mb-10"
              >
                <Link to="/courses">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-2.5 px-7 py-3.5 bg-primary-500 text-white font-bold rounded-xl text-base shadow-lg hover:bg-primary-600 transition-all duration-200"
                    style={{ boxShadow: '0 8px 24px rgba(108,99,255,0.3)' }}
                  >
                    Explore Courses
                    <ArrowRight size={18} />
                  </motion.button>
                </Link>
                <Link to="/counseling">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-2.5 px-7 py-3.5 bg-white dark:bg-white/10 border border-[#E5E7EB] dark:border-white/20 text-[#1A1A2E] dark:text-gray-200 font-bold rounded-xl text-base hover:border-primary-300 hover:bg-primary-50/60 dark:hover:bg-white/20 transition-all duration-200"
                  >
                    Get Counseling
                    <MessageCircle size={18} className="text-primary-500" />
                  </motion.button>
                </Link>
              </motion.div>

              {/* Social proof — Avatars + Rating */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.32 }}
                className="flex items-center gap-5"
              >
                {/* Stacked avatars */}
                <div className="flex items-center">
                  {avatarInitials.map((initials, i) => (
                    <div
                      key={initials}
                      className="w-9 h-9 rounded-full border-2 border-[#EEF0FF] dark:border-[#13132A] flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{
                        backgroundColor: avatarColors[i],
                        marginLeft: i === 0 ? 0 : -10,
                        zIndex: avatarInitials.length - i,
                      }}
                    >
                      {initials[0]}
                    </div>
                  ))}
                  <div
                    className="w-9 h-9 rounded-full border-2 border-[#EEF0FF] dark:border-[#13132A] bg-primary-50 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 text-xs font-bold"
                    style={{ marginLeft: -10 }}
                  >
                    12K+
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1, 2, 3, 4].map(i => (
                      <Star key={i} size={15} className="text-amber-400 fill-amber-400" />
                    ))}
                    <Star size={15} className="text-amber-400 fill-amber-400 opacity-60" />
                    <span className="ml-1 text-sm font-bold text-[#1A1A2E] dark:text-gray-200">4.8/5</span>
                  </div>
                  <p className="text-xs text-[#6B7280] dark:text-gray-500">Trusted by 12,000+ students</p>
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: 3D Illustration ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              {/* Illustration container with subtle glow bg */}
              <div className="relative w-full max-w-[520px] mx-auto">
                {/* Soft circle behind illustration */}
                <div
                  className="absolute inset-[5%] rounded-full opacity-30 blur-3xl"
                  style={{ background: 'radial-gradient(circle, #C7C4FF 0%, transparent 70%)' }}
                />
                <motion.img
                  src="/hero-illustration.png"
                  alt="Skills021 — Learn. Build. Get Placed."
                  className="relative z-10 w-full h-auto drop-shadow-2xl select-none"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  draggable={false}
                />
              </div>
            </motion.div>
          </div>

          {/* ── STAT CARDS ROW ── */}
          <div className="pb-8 lg:pb-12 mt-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                value={12000} suffix="+" label="Happy Students" sublabel="Growing community of learners"
                icon={Users2} iconBg="bg-primary-100 dark:bg-primary-900/30" iconColor="text-primary-500"
              />
              <StatCard
                value={150} suffix="+" label="Video Lectures" sublabel="High quality content"
                icon={Video} iconBg="bg-teal-100 dark:bg-teal-900/30" iconColor="text-teal-500"
              />
              <StatCard
                value={4} suffix="+" label="University Programs" sublabel="AKTU, IPU, JoSAA, JAC Delhi"
                icon={GraduationCap} iconBg="bg-violet-100 dark:bg-violet-900/30" iconColor="text-violet-500"
              />
              <StatCard
                value={100} suffix="+" label="Hackathon Updates" sublabel="Stay ahead & build"
                icon={Trophy} iconBg="bg-amber-100 dark:bg-amber-900/30" iconColor="text-amber-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES STRIP ─── */}
      <section className="py-16 bg-white dark:bg-brand-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: 'Expert-Led Courses',
                desc: 'DSA, Java, Python, Django, DevOps — everything you need to crack placements and build real projects.',
                color: 'text-primary-500',
                bg: 'bg-primary-50 dark:bg-primary-900/20',
              },
              {
                icon: Building2,
                title: 'University Counseling',
                desc: 'Expert guidance for AKTU, IPU, JoSAA, and JAC Delhi counseling rounds — from choice filling to final allotment.',
                color: 'text-teal-500',
                bg: 'bg-teal-50 dark:bg-teal-900/20',
              },
              {
                icon: Trophy,
                title: 'Hackathon Hub',
                desc: 'Stay updated with the latest hackathons and coding competitions. Find opportunities matching your skills.',
                color: 'text-amber-500',
                bg: 'bg-amber-50 dark:bg-amber-900/20',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card p-6 text-center group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon size={28} className={feature.color} />
                </div>
                <h3 className="text-lg font-bold text-brand-text dark:text-brand-dark-text mb-2">{feature.title}</h3>
                <p className="text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED COURSES ─── */}
      <section className="py-16 bg-brand-bg dark:bg-brand-dark-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="section-title">Top Courses</h2>
              <p className="section-subtitle">Learn from the best — built for Indian college students</p>
            </div>
            <Link
              to="/courses"
              className="hidden md:flex items-center gap-1 text-sm font-semibold text-primary-500 hover:gap-2 transition-all duration-200"
            >
              View All Courses <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 3).map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/courses">
              <motion.button whileTap={{ scale: 0.97 }} className="btn-primary">
                View All Courses <ArrowRight size={16} />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── COUNSELING BANNER ─── */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-teal-500" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <GraduationCap size={32} className="text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Confused about college admissions?
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Get expert guidance for AKTU, IPU, JoSAA, and JAC Delhi counseling rounds.
              Our experts have helped 3,000+ students get into their dream colleges.
            </p>
            <Link to="/counseling">
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-bold rounded-2xl text-base hover:bg-gray-50 transition-all duration-200 shadow-lg"
              >
                Start Counseling <ArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── LATEST HACKATHONS ─── */}
      <section className="py-16 bg-brand-bg dark:bg-brand-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="section-title">Latest Hackathons</h2>
              <p className="section-subtitle">Compete, build, and get noticed by top companies</p>
            </div>
            <Link
              to="/hackathons"
              className="hidden md:flex items-center gap-1 text-sm font-semibold text-primary-500 hover:gap-2 transition-all duration-200"
            >
              See All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hackathons.slice(0, 3).map((hack, i) => (
              <HackathonCard key={hack.id} hackathon={hack} index={i} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/hackathons">
              <motion.button whileTap={{ scale: 0.97 }} className="btn-outline">
                See All Hackathons <Trophy size={16} />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── YOUTUBE SECTION ─── */}
      <section className="py-16 bg-white dark:bg-brand-dark-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Play size={40} className="text-red-500" />
            </div>
            <h2 className="section-title mb-4">Free Tutorials on YouTube</h2>
            <p className="text-brand-muted dark:text-brand-dark-muted mb-8 text-lg">
              Watch 150+ free video lectures on DSA, Java, Python, Django, and more.
              Subscribe to never miss a new tutorial.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://www.youtube.com/@skills021"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-all duration-200 shadow-sm w-full sm:w-auto justify-center"
              >
                <Play size={20} />
                Subscribe Now
              </a>
              <a
                href="https://www.youtube.com/@skills021"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 border-2 border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 font-bold rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 w-full sm:w-auto justify-center"
              >
                <Play size={18} />
                Watch Tutorials
              </a>
            </div>
            <p className="text-sm text-brand-muted dark:text-brand-dark-muted mt-4">
              youtube.com/@skills021 · 12,000+ subscribers · 150+ videos
            </p>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-16 bg-brand-bg dark:bg-brand-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">What Our Students Say</h2>
            <p className="section-subtitle">Trusted by 12,000+ students across India</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-brand-muted dark:text-brand-dark-muted text-sm leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-brand-text dark:text-brand-dark-text">{t.name}</p>
                    <p className="text-xs text-brand-muted dark:text-brand-dark-muted">{t.college}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-16 bg-white dark:bg-brand-dark-card">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Code2 size={24} className="text-primary-500" />
              <span className="text-primary-500 font-semibold">Join 12,000+ Students</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text dark:text-brand-dark-text mb-4">
              Ready to start your journey?
            </h2>
            <p className="text-brand-muted dark:text-brand-dark-muted mb-8">
              Create your free account and access courses, counseling resources, and hackathon updates today.
            </p>
            <Link to="/register">
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="btn-primary text-base px-8 py-4"
              >
                Get Started — It's Free <ArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
