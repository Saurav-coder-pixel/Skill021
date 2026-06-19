import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Calendar, Users, Globe, MapPin, ChevronRight, Clock, Award, Zap, Filter } from 'lucide-react'
import { useEventStore, HackathonCategory } from '../store/eventStore'
import toast from 'react-hot-toast'

const CATEGORIES: HackathonCategory[] = ['School Level', 'College Level', 'National', 'International', 'Startup Competition', 'Innovation Challenge']

const CAT_COLORS: Record<HackathonCategory, string> = {
  'School Level': 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
  'College Level': 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
  'National': 'text-orange-500 bg-orange-50 dark:bg-orange-900/20',
  'International': 'text-red-500 bg-red-50 dark:bg-red-900/20',
  'Startup Competition': 'text-teal-500 bg-teal-50 dark:bg-teal-900/20',
  'Innovation Challenge': 'text-green-500 bg-green-50 dark:bg-green-900/20',
}

const STATUS_COLORS = {
  Upcoming: 'text-green-600 bg-green-50 dark:bg-green-900/20',
  Ongoing: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20',
  Completed: 'text-gray-500 bg-gray-100 dark:bg-gray-800',
}

const MODE_ICONS = { Online: Globe, Offline: MapPin, Hybrid: Zap }

export default function Hackathons() {
  const { hackathons } = useEventStore()
  const [activeCategory, setActiveCategory] = useState<HackathonCategory | null>(null)
  const [activeMode, setActiveMode] = useState<string>('All')

  const published = hackathons.filter(h => h.publishStatus === 'Published')
  const filtered = published.filter(h => {
    if (activeCategory && h.category !== activeCategory) return false
    if (activeMode !== 'All' && h.mode !== activeMode) return false
    return true
  })

  const stats = {
    total: published.length,
    upcoming: published.filter(h => h.status === 'Upcoming').length,
    totalPrize: '₹1Cr+',
    participants: published.reduce((a, h) => a + h.registrations, 0),
  }

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-brand-dark-bg pt-16">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0F0F1A] via-[#1A0F35] to-[#0F0A1A] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-full mb-4 uppercase tracking-widest">
              <Trophy size={13} /> Hackathons & Competitions
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Build. Innovate. <span className="gradient-text">Win.</span></h1>
            <p className="text-slate-400 max-w-xl mx-auto mb-8">
              Compete in hackathons from school to international level. Build real products, win prizes, get recognized.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { val: stats.total, label: 'Total Events' },
              { val: stats.upcoming, label: 'Upcoming' },
              { val: stats.totalPrize, label: 'Prize Pool' },
              { val: stats.participants.toLocaleString() + '+', label: 'Registered' },
            ].map(s => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
                <div className="text-xl font-bold text-white">{s.val}</div>
                <div className="text-xs text-slate-400">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-30 bg-white dark:bg-[#0F0F1A] border-b border-brand-border dark:border-brand-dark-border">
        <div className="max-w-6xl mx-auto px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveCategory(null)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${!activeCategory ? 'bg-primary-500 text-white' : 'text-brand-muted dark:text-brand-dark-muted hover:bg-gray-100 dark:hover:bg-white/5'}`}
          >
            All ({published.length})
          </button>
          {CATEGORIES.map(cat => {
            const cnt = published.filter(h => h.category === cat).length
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-primary-500 text-white' : `${CAT_COLORS[cat]} border border-transparent`}`}
              >
                {cat} ({cnt})
              </button>
            )
          })}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Mode filter */}
        <div className="flex items-center gap-2 mb-6">
          <Filter size={14} className="text-brand-muted" />
          <div className="flex gap-2">
            {['All', 'Online', 'Offline', 'Hybrid'].map(m => (
              <button
                key={m}
                onClick={() => setActiveMode(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeMode === m ? 'bg-primary-500 text-white' : 'bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border text-brand-muted dark:text-brand-dark-muted hover:border-primary-500'}`}
              >
                {m}
              </button>
            ))}
          </div>
          <span className="ml-auto text-sm text-brand-muted dark:text-brand-dark-muted">{filtered.length} events</span>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((h, idx) => {
                const ModeIcon = MODE_ICONS[h.mode]
                const deadline = new Date(h.registrationDeadline)
                const daysLeft = Math.max(0, Math.ceil((deadline.getTime() - Date.now()) / 86400000))
                return (
                  <motion.div
                    key={h.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: idx * 0.07 }}
                    whileHover={{ y: -4 }}
                    className="card overflow-hidden group"
                  >
                    {/* Banner */}
                    <div className="h-32 bg-gradient-to-br from-primary-600 to-teal-600 relative flex items-center justify-center">
                      <Trophy size={48} className="text-white/20" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[h.status]}`}>{h.status}</span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${CAT_COLORS[h.category]}`}>{h.category}</span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-base font-bold text-brand-text dark:text-brand-dark-text mb-1 group-hover:text-primary-500 transition-colors line-clamp-2">
                        {h.name}
                      </h3>
                      <p className="text-xs text-brand-muted dark:text-brand-dark-muted mb-3 line-clamp-2">{h.description}</p>

                      <div className="space-y-1.5 mb-4">
                        <div className="flex items-center gap-2 text-xs text-brand-muted dark:text-brand-dark-muted">
                          <Calendar size={11} className="text-primary-500 flex-shrink-0" />
                          <span>{h.startDate} – {h.endDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-brand-muted dark:text-brand-dark-muted">
                          <ModeIcon size={11} className="text-teal-500 flex-shrink-0" />
                          <span>{h.mode} · Team size: {h.maxTeamSize}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-brand-muted dark:text-brand-dark-muted">
                          <Award size={11} className="text-amber-500 flex-shrink-0" />
                          <span className="font-semibold text-amber-600 dark:text-amber-400">{h.prize}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-brand-muted dark:text-brand-dark-muted">
                          <Users size={11} className="flex-shrink-0" />
                          <span>{h.registrations.toLocaleString()} registered · By {h.organizer}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {h.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 bg-gray-100 dark:bg-white/10 text-brand-muted dark:text-brand-dark-muted rounded-full">{tag}</span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        {h.status === 'Upcoming' && daysLeft > 0 && (
                          <span className="text-xs font-semibold text-red-500 flex items-center gap-1">
                            <Clock size={11} /> {daysLeft}d left
                          </span>
                        )}
                        <button
                          onClick={() => {
                            if (h.registrationUrl && h.registrationUrl !== '#') window.open(h.registrationUrl, '_blank')
                            else toast.success(`Registered for "${h.name}"!`)
                          }}
                          disabled={h.status === 'Completed'}
                          className={`ml-auto flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${h.status === 'Completed' ? 'bg-gray-100 dark:bg-white/10 text-gray-400 cursor-not-allowed' : 'bg-primary-500 text-white hover:bg-primary-600'}`}
                        >
                          {h.status === 'Completed' ? 'Ended' : 'Register'} <ChevronRight size={13} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-20">
            <Trophy size={48} className="mx-auto text-brand-muted opacity-30 mb-4" />
            <h3 className="text-lg font-semibold text-brand-text dark:text-brand-dark-text">No hackathons found</h3>
            <p className="text-brand-muted text-sm mt-2">Check back soon for upcoming events!</p>
          </div>
        )}
      </div>
    </div>
  )
}
