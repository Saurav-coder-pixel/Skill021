import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import {
  FileText, Download, Bookmark, Share2, Lock, Search, Filter,
  Star, Clock, BookOpen, ChevronDown, Eye, CheckCircle
} from 'lucide-react'
import { useContentStore, ResourceType, ResourceCategory } from '../store/contentStore'
import toast from 'react-hot-toast'

const RESOURCE_TYPES: { label: ResourceType; icon: typeof FileText; color: string }[] = [
  { label: 'Notes', icon: FileText, color: 'text-blue-500' },
  { label: 'Roadmaps', icon: BookOpen, color: 'text-green-500' },
  { label: 'Previous Year Papers', icon: FileText, color: 'text-orange-500' },
  { label: 'E-Books', icon: BookOpen, color: 'text-red-500' },
  { label: 'Cheat Sheets', icon: FileText, color: 'text-yellow-500' },
  { label: 'Interview Questions', icon: FileText, color: 'text-indigo-500' },
  { label: 'Practice Sheets', icon: FileText, color: 'text-teal-500' },
  { label: 'Formula Sheets', icon: FileText, color: 'text-pink-500' },
  { label: 'Coding Resources', icon: BookOpen, color: 'text-purple-500' },
  { label: 'Career Resources', icon: BookOpen, color: 'text-cyan-500' },
]

const CATEGORY_GROUPS = [
  {
    label: 'School Resources',
    categories: ['Class 1-5', 'Class 6-8', 'Class 9-10', 'Class 11-12'] as ResourceCategory[],
    color: 'text-blue-500',
  },
  {
    label: 'Competitive Exams',
    categories: ['JEE', 'NEET', 'CUET', 'Olympiads'] as ResourceCategory[],
    color: 'text-orange-500',
  },
  {
    label: 'Tech & Coding',
    categories: ['DSA', 'Web Development', 'Flutter', 'AI/ML', 'Data Science', 'Cyber Security', 'Cloud Computing'] as ResourceCategory[],
    color: 'text-purple-500',
  },
  {
    label: 'Counseling Guides',
    categories: ['JoSAA', 'AKTU', 'IPU', 'JAC Delhi', 'NEET Counseling', 'LPU', 'VIT', 'BITS'] as ResourceCategory[],
    color: 'text-teal-500',
  },
]

function ResourceCard({ resource }: { resource: ReturnType<typeof useContentStore>['resources'][0] }) {
  const [bookmarked, setBookmarked] = useState(false)

  const handleDownload = () => {
    if (resource.isPremium) {
      toast.error('This is a premium resource. Please purchase to download.')
      return
    }
    toast.success(`Downloading: ${resource.title}`)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => toast.success('Link copied to clipboard!'))
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      whileHover={{ y: -3 }}
      className="card p-5 relative overflow-hidden group"
    >
      {resource.isPremium && (
        <div className="absolute top-0 right-0 bg-gradient-to-br from-amber-400 to-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">
          PREMIUM
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
          <FileText size={22} className="text-primary-500" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-semibold text-primary-500 bg-primary-50 dark:bg-primary-900/20 px-2 py-0.5 rounded-full">
            {resource.type}
          </span>
          <h3 className="text-[14px] font-bold text-brand-text dark:text-brand-dark-text mt-1 leading-snug line-clamp-2 group-hover:text-primary-500 transition-colors">
            {resource.title}
          </h3>
        </div>
      </div>

      <p className="text-xs text-brand-muted dark:text-brand-dark-muted mb-3 line-clamp-2 leading-relaxed">
        {resource.description}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-3 text-[11px] text-brand-muted dark:text-brand-dark-muted mb-4 flex-wrap">
        <span className="flex items-center gap-1"><BookOpen size={11} />{resource.author}</span>
        <span className="flex items-center gap-1"><Clock size={11} />Updated {resource.lastUpdated}</span>
        <span className="flex items-center gap-1"><Download size={11} />{resource.downloads.toLocaleString()} downloads</span>
        <span className="px-2 py-0.5 bg-gray-100 dark:bg-white/10 rounded-full">{resource.category}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {resource.isPremium ? (
          <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity">
            <Lock size={13} /> Unlock for ₹{resource.price}
          </button>
        ) : (
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary-500 text-white rounded-xl text-xs font-semibold hover:bg-primary-600 transition-colors"
          >
            <Download size={13} /> Download Free
          </button>
        )}
        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`w-9 h-9 rounded-xl border transition-colors flex items-center justify-center ${bookmarked ? 'bg-primary-500 border-primary-500 text-white' : 'border-brand-border dark:border-brand-dark-border text-brand-muted dark:text-brand-dark-muted hover:border-primary-500 hover:text-primary-500'}`}
        >
          <Bookmark size={14} className={bookmarked ? 'fill-current' : ''} />
        </button>
        <button
          onClick={handleShare}
          className="w-9 h-9 rounded-xl border border-brand-border dark:border-brand-dark-border text-brand-muted dark:text-brand-dark-muted hover:border-primary-500 hover:text-primary-500 transition-colors flex items-center justify-center"
        >
          <Share2 size={14} />
        </button>
      </div>
    </motion.div>
  )
}

export default function Resources() {
  const { resources } = useContentStore()
  const [searchParams] = useSearchParams()
  const initType = searchParams.get('type') as ResourceType | null

  const [activeType, setActiveType] = useState<ResourceType | null>(initType)
  const [activeCategory, setActiveCategory] = useState<ResourceCategory | null>(null)
  const [search, setSearch] = useState('')
  const [showPremium, setShowPremium] = useState<'all' | 'free' | 'premium'>('all')
  const [expandedGroup, setExpandedGroup] = useState<string | null>('School Resources')

  const published = resources.filter(r => r.status === 'Published')

  const filtered = useMemo(() => {
    return published.filter(r => {
      if (activeType && r.type !== activeType) return false
      if (activeCategory && r.category !== activeCategory) return false
      if (showPremium === 'free' && r.isPremium) return false
      if (showPremium === 'premium' && !r.isPremium) return false
      if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.description.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [published, activeType, activeCategory, search, showPremium])

  const totalDownloads = published.reduce((acc, r) => acc + r.downloads, 0)

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-brand-dark-bg pt-16">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0A0A1A] via-[#1A1040] to-[#0A1A1A] py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 text-xs font-bold text-teal-400 bg-teal-400/10 border border-teal-400/30 rounded-full mb-4 uppercase tracking-widest">
              Free & Premium Resources
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              The Ultimate <span className="gradient-text">Learning Library</span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto mb-4">
              {published.length}+ resources across notes, PYQs, roadmaps, cheat sheets and more — curated for every student.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-slate-300 mb-8">
              <span className="flex items-center gap-2"><Download size={14} className="text-teal-400" />{(totalDownloads / 1000).toFixed(0)}K+ downloads</span>
              <span className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" />Expert verified</span>
              <span className="flex items-center gap-2"><Star size={14} className="text-yellow-400" />Free & Premium</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="relative max-w-lg mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search resources..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </motion.div>
        </div>
      </div>

      {/* Resource Type Tabs */}
      <div className="sticky top-16 z-30 bg-white dark:bg-[#0F0F1A] border-b border-brand-border dark:border-brand-dark-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto no-scrollbar py-2">
            <button
              onClick={() => setActiveType(null)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${!activeType ? 'bg-primary-500 text-white' : 'text-brand-muted dark:text-brand-dark-muted hover:bg-gray-100 dark:hover:bg-white/5'}`}
            >
              All ({published.length})
            </button>
            {RESOURCE_TYPES.map(t => {
              const cnt = published.filter(r => r.type === t.label).length
              return (
                <button
                  key={t.label}
                  onClick={() => setActiveType(t.label)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeType === t.label ? 'bg-primary-500 text-white' : 'text-brand-muted dark:text-brand-dark-muted hover:bg-gray-100 dark:hover:bg-white/5'}`}
                >
                  <t.icon size={13} className={activeType === t.label ? '' : t.color} />
                  {t.label}
                  {cnt > 0 && <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${activeType === t.label ? 'bg-white/20' : 'bg-gray-100 dark:bg-white/10'}`}>{cnt}</span>}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
        {/* Sidebar */}
        <aside className="hidden md:block w-56 flex-shrink-0">
          <div className="sticky top-32 space-y-3">
            {/* Free/Premium filter */}
            <div className="card p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-brand-dark-muted mb-3">Access</h3>
              {(['all', 'free', 'premium'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setShowPremium(p)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize mb-0.5 transition-colors ${showPremium === p ? 'bg-primary-500 text-white font-semibold' : 'text-brand-muted dark:text-brand-dark-muted hover:bg-gray-50 dark:hover:bg-white/5'}`}
                >
                  {p === 'all' ? 'All Resources' : p === 'free' ? '🆓 Free Only' : '⭐ Premium Only'}
                </button>
              ))}
            </div>

            {/* Categories */}
            <div className="card p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-brand-dark-muted mb-3">Category</h3>
              <button
                onClick={() => setActiveCategory(null)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition-colors ${!activeCategory ? 'bg-primary-500 text-white font-semibold' : 'text-brand-muted dark:text-brand-dark-muted hover:bg-gray-50 dark:hover:bg-white/5'}`}
              >
                All Categories
              </button>
              {CATEGORY_GROUPS.map(grp => (
                <div key={grp.label} className="mb-2">
                  <button
                    onClick={() => setExpandedGroup(expandedGroup === grp.label ? null : grp.label)}
                    className={`w-full text-left px-2 py-1.5 text-[11px] font-bold uppercase tracking-wider flex items-center justify-between ${grp.color}`}
                  >
                    {grp.label}
                    <ChevronDown size={11} className={`transition-transform ${expandedGroup === grp.label ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {expandedGroup === grp.label && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        {grp.categories.map(cat => (
                          <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`w-full text-left pl-4 pr-2 py-1.5 text-sm rounded-lg transition-colors ${activeCategory === cat ? 'bg-primary-500 text-white font-semibold' : 'text-brand-muted dark:text-brand-dark-muted hover:bg-gray-50 dark:hover:bg-white/5'}`}
                          >
                            {cat}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-brand-text dark:text-brand-dark-text">
                {activeType || (activeCategory ? activeCategory + ' Resources' : 'All Resources')}
              </h2>
              <p className="text-sm text-brand-muted dark:text-brand-dark-muted mt-0.5">{filtered.length} resource{filtered.length !== 1 ? 's' : ''}</p>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <FileText size={48} className="mx-auto text-brand-muted opacity-30 mb-4" />
              <h3 className="text-lg font-semibold text-brand-text dark:text-brand-dark-text mb-2">No resources found</h3>
              <p className="text-brand-muted dark:text-brand-dark-muted text-sm">Try changing filters or search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {filtered.map(r => <ResourceCard key={r.id} resource={r} />)}
              </AnimatePresence>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
