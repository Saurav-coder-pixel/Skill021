import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { BookOpen, Clock, Users, Star, ChevronRight, Search, SlidersHorizontal, Play, Lock, Filter } from 'lucide-react'
import { useContentStore, CourseGroup, CourseSubcategory } from '../store/contentStore'

const GROUPS: { label: CourseGroup; color: string; bg: string }[] = [
  { label: 'Foundation Programs', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { label: 'Competitive Exams', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  { label: 'College & Tech Courses', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
]

const SUBCATEGORIES: Record<CourseGroup, CourseSubcategory[]> = {
  'Foundation Programs': ['Class 1-5', 'Class 6-8', 'Class 9-10', 'Class 11-12'],
  'Competitive Exams': ['JEE Preparation', 'NEET Preparation', 'CUET Preparation', 'Olympiads', 'NTSE'],
  'College & Tech Courses': [
    'DSA', 'Web Development', 'App Development', 'Flutter Development',
    'AI & Machine Learning', 'Data Science', 'Cyber Security', 'Cloud Computing',
    'Aptitude Preparation', 'Interview Preparation',
  ],
}

const LEVELS = ['All Levels', 'Beginner', 'Intermediate', 'Advanced']
const PRICES = ['All', 'Free', 'Paid']

function CourseCard({ course }: { course: ReturnType<typeof useContentStore>['courses'][0] }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="card overflow-hidden group cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden" style={{ background: `linear-gradient(135deg, ${course.gradientFrom}, ${course.gradientTo})` }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen size={48} className="text-white/30" />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 text-xs font-bold bg-white/20 backdrop-blur-sm text-white rounded-full border border-white/30">
            {course.level}
          </span>
          {course.price === 'FREE' && (
            <span className="px-2.5 py-1 text-xs font-bold bg-green-500 text-white rounded-full">FREE</span>
          )}
        </div>
        {/* Play button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50">
            <Play size={22} className="text-white ml-1" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-[11px] font-semibold text-primary-500 bg-primary-50 dark:bg-primary-900/20 px-2 py-0.5 rounded-full">
            {course.subcategory}
          </span>
        </div>
        <h3 className="text-[15px] font-bold text-brand-text dark:text-brand-dark-text mb-1 leading-snug line-clamp-2 group-hover:text-primary-500 transition-colors">
          {course.title}
        </h3>
        <p className="text-xs text-brand-muted dark:text-brand-dark-muted mb-3 line-clamp-2 leading-relaxed">
          {course.description}
        </p>
        <p className="text-xs text-brand-muted dark:text-brand-dark-muted mb-3">By {course.instructor}</p>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-brand-muted dark:text-brand-dark-muted mb-4">
          <span className="flex items-center gap-1"><Star size={11} className="text-yellow-400 fill-yellow-400" />{course.rating}</span>
          <span className="flex items-center gap-1"><Clock size={11} />{course.duration}</span>
          <span className="flex items-center gap-1"><Users size={11} />{course.enrolled.toLocaleString()}</span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            {course.price === 'FREE' ? (
              <span className="text-lg font-bold text-green-500">FREE</span>
            ) : (
              <span className="text-lg font-bold text-brand-text dark:text-brand-dark-text">₹{course.price}</span>
            )}
          </div>
          <a
            href={course.videoUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Play size={11} /> Start Learning
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Courses() {
  const { courses } = useContentStore()
  const [searchParams] = useSearchParams()
  const initGroup = (searchParams.get('group') || 'College & Tech Courses') as CourseGroup
  const initSub = searchParams.get('sub') as CourseSubcategory | null

  const [activeGroup, setActiveGroup] = useState<CourseGroup>(initGroup)
  const [activeSub, setActiveSub] = useState<CourseSubcategory | null>(initSub)
  const [activeLevel, setActiveLevel] = useState('All Levels')
  const [activePrice, setActivePrice] = useState('All')
  const [search, setSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const published = courses.filter(c => c.status === 'Published')

  const filtered = useMemo(() => {
    return published.filter(c => {
      if (c.group !== activeGroup) return false
      if (activeSub && c.subcategory !== activeSub) return false
      if (activeLevel !== 'All Levels' && c.level !== activeLevel) return false
      if (activePrice === 'Free' && c.price !== 'FREE') return false
      if (activePrice === 'Paid' && c.price === 'FREE') return false
      if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.description.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [published, activeGroup, activeSub, activeLevel, activePrice, search])

  const groupStats = GROUPS.map(g => ({
    ...g,
    count: published.filter(c => c.group === g.label).length
  }))

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-brand-dark-bg pt-16">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0F0F1A] via-[#1A1040] to-[#0F0F1A] py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-bold text-white mb-4">
            Learn Without <span className="gradient-text">Limits</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
            From Class 1 to placement — explore {published.length}+ expert-curated courses across all domains.
          </motion.p>
          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative max-w-lg mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
          </motion.div>
        </div>
      </div>

      {/* Group Tabs */}
      <div className="sticky top-16 z-30 bg-white dark:bg-[#0F0F1A] border-b border-brand-border dark:border-brand-dark-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto no-scrollbar py-2">
            {groupStats.map(g => (
              <button
                key={g.label}
                onClick={() => { setActiveGroup(g.label); setActiveSub(null) }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activeGroup === g.label ? `${g.bg} ${g.color}` : 'text-brand-muted dark:text-brand-dark-muted hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                {g.label}
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeGroup === g.label ? 'bg-white/60 dark:bg-black/20' : 'bg-gray-100 dark:bg-white/10'}`}>
                  {g.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
        {/* Sidebar */}
        <aside className="hidden md:block w-56 flex-shrink-0">
          <div className="sticky top-32">
            <div className="card p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-brand-dark-muted mb-3">Subcategory</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveSub(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!activeSub ? 'bg-primary-500 text-white font-semibold' : 'text-brand-muted dark:text-brand-dark-muted hover:bg-gray-50 dark:hover:bg-white/5'}`}
                >
                  All ({published.filter(c => c.group === activeGroup).length})
                </button>
                {SUBCATEGORIES[activeGroup].map(sub => {
                  const cnt = published.filter(c => c.group === activeGroup && c.subcategory === sub).length
                  return (
                    <button
                      key={sub}
                      onClick={() => setActiveSub(sub)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition-colors ${activeSub === sub ? 'bg-primary-500 text-white font-semibold' : 'text-brand-muted dark:text-brand-dark-muted hover:bg-gray-50 dark:hover:bg-white/5'}`}
                    >
                      <span className="truncate">{sub}</span>
                      {cnt > 0 && <span className={`text-[10px] font-bold ml-1 px-1.5 py-0.5 rounded-full ${activeSub === sub ? 'bg-white/20' : 'bg-gray-100 dark:bg-white/10'}`}>{cnt}</span>}
                    </button>
                  )
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-brand-border dark:border-brand-dark-border">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-brand-dark-muted mb-3">Level</h3>
                {LEVELS.map(l => (
                  <button key={l} onClick={() => setActiveLevel(l)} className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-0.5 transition-colors ${activeLevel === l ? 'bg-primary-500 text-white font-semibold' : 'text-brand-muted dark:text-brand-dark-muted hover:bg-gray-50 dark:hover:bg-white/5'}`}>{l}</button>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-brand-border dark:border-brand-dark-border">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-brand-dark-muted mb-3">Price</h3>
                {PRICES.map(p => (
                  <button key={p} onClick={() => setActivePrice(p)} className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-0.5 transition-colors ${activePrice === p ? 'bg-primary-500 text-white font-semibold' : 'text-brand-muted dark:text-brand-dark-muted hover:bg-gray-50 dark:hover:bg-white/5'}`}>{p}</button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-brand-text dark:text-brand-dark-text">{activeSub || activeGroup}</h2>
              <p className="text-sm text-brand-muted dark:text-brand-dark-muted mt-0.5">{filtered.length} course{filtered.length !== 1 ? 's' : ''} found</p>
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="md:hidden flex items-center gap-2 px-3 py-2 border border-brand-border dark:border-brand-dark-border rounded-xl text-sm text-brand-muted dark:text-brand-dark-muted">
              <Filter size={14} /> Filters
            </button>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen size={48} className="mx-auto text-brand-muted dark:text-brand-dark-muted opacity-30 mb-4" />
              <h3 className="text-lg font-semibold text-brand-text dark:text-brand-dark-text mb-2">No courses found</h3>
              <p className="text-brand-muted dark:text-brand-dark-muted text-sm">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(course => <CourseCard key={course.id} course={course} />)}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
