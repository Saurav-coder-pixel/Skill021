import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, BookOpen, Filter } from 'lucide-react'
import CourseCard from '../components/CourseCard'
import { courses } from '../data/courses'

const tabs = ['All', 'DSA', 'Java', 'Python', 'Django', 'DevOps', 'Exam Prep', 'System Design'] as const
type Tab = typeof tabs[number]

export default function Courses() {
  const [activeTab, setActiveTab] = useState<Tab>('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchTab = activeTab === 'All' || c.category === activeTab
      const matchSearch = search === '' || c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase()) || c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
      return matchTab && matchSearch
    })
  }, [activeTab, search])

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-brand-dark-bg pt-20">
      {/* Header */}
      <section className="bg-hero-gradient dark:bg-hero-dark border-b border-brand-border dark:border-brand-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={20} className="text-primary-500" />
              <span className="text-sm font-semibold text-primary-500 uppercase tracking-wide">Courses & Study Material</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-text dark:text-brand-dark-text mb-3">
              Learn. Code. Excel.
            </h1>
            <p className="text-brand-muted dark:text-brand-dark-muted text-lg max-w-xl">
              Expert-crafted courses in DSA, Java, Python, Django, DevOps and more — built for Indian college students.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-16 z-30 bg-white/95 dark:bg-[#0F0F1A]/95 backdrop-blur-md border-b border-brand-border dark:border-brand-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-white/10 text-brand-muted dark:text-brand-dark-muted hover:bg-gray-200 dark:hover:bg-white/20'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-bg text-sm text-brand-text dark:text-brand-dark-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Filter size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-brand-text dark:text-brand-dark-text mb-2">No courses found</h3>
            <p className="text-brand-muted dark:text-brand-dark-muted">Try a different search term or category</p>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-brand-muted dark:text-brand-dark-muted">
                Showing <span className="font-semibold text-brand-text dark:text-brand-dark-text">{filtered.length}</span> courses
              </p>
              <div className="flex items-center gap-1.5 text-xs text-brand-muted dark:text-brand-dark-muted">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>{filtered.filter(c => c.price === 'FREE').length} FREE</span>
                <span className="ml-2 w-2 h-2 rounded-full bg-primary-500"></span>
                <span>{filtered.filter(c => c.price !== 'FREE').length} Paid</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
