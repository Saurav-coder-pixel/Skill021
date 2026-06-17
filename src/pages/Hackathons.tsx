import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Search } from 'lucide-react'
import HackathonCard from '../components/HackathonCard'
import { hackathons } from '../data/hackathons'

const filters = ['All', 'Upcoming', 'Ongoing', 'Completed', 'Online', 'Offline', 'Hybrid'] as const
type Filter = typeof filters[number]

export default function Hackathons() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return hackathons.filter((h) => {
      const matchFilter =
        activeFilter === 'All' ||
        h.status === activeFilter ||
        h.mode === activeFilter
      const matchSearch =
        search === '' ||
        h.name.toLowerCase().includes(search.toLowerCase()) ||
        h.organizer.toLowerCase().includes(search.toLowerCase()) ||
        h.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      return matchFilter && matchSearch
    })
  }, [activeFilter, search])

  const counts = {
    upcoming: hackathons.filter((h) => h.status === 'Upcoming').length,
    ongoing: hackathons.filter((h) => h.status === 'Ongoing').length,
    completed: hackathons.filter((h) => h.status === 'Completed').length,
  }

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-brand-dark-bg pt-20">
      {/* Header */}
      <section className="bg-hero-gradient dark:bg-hero-dark border-b border-brand-border dark:border-brand-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-2">
              <Trophy size={20} className="text-amber-500" />
              <span className="text-sm font-semibold text-amber-500 uppercase tracking-wide">Hackathon Hub</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-text dark:text-brand-dark-text mb-3">
              Compete & Get Noticed
            </h1>
            <p className="text-brand-muted dark:text-brand-dark-muted text-lg max-w-xl mb-6">
              Stay updated with the latest hackathons and coding competitions across India.
            </p>
            <div className="grid grid-cols-3 max-w-sm gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{counts.upcoming}</div>
                <div className="text-xs text-brand-muted dark:text-brand-dark-muted">Upcoming</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-500">{counts.ongoing}</div>
                <div className="text-xs text-brand-muted dark:text-brand-dark-muted">Ongoing</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-500">{counts.completed}</div>
                <div className="text-xs text-brand-muted dark:text-brand-dark-muted">Completed</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-16 z-30 bg-white/95 dark:bg-[#0F0F1A]/95 backdrop-blur-md border-b border-brand-border dark:border-brand-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-1.5 flex-wrap">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeFilter === f
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-white/10 text-brand-muted dark:text-brand-dark-muted hover:bg-gray-200 dark:hover:bg-white/20'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search hackathons..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-bg text-sm text-brand-text dark:text-brand-dark-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Trophy size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-brand-text dark:text-brand-dark-text mb-2">No hackathons found</h3>
            <p className="text-brand-muted dark:text-brand-dark-muted">Try a different filter or search term</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-brand-muted dark:text-brand-dark-muted mb-6">
              Showing <span className="font-semibold text-brand-text dark:text-brand-dark-text">{filtered.length}</span> hackathons
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((hack, i) => (
                <HackathonCard key={hack.id} hackathon={hack} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
