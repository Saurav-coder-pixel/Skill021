import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Award, Briefcase, GraduationCap, Quote, Filter, ChevronRight, Heart } from 'lucide-react'
import { useTestimonialsStore } from '../store/testimonialsStore'

const STORY_TYPES = ['All', 'Placement', 'Admission', 'Internship'] as const
const TEST_TYPES = ['All', 'General', 'Placement', 'Admission', 'Internship', 'Counseling'] as const

const TYPE_ICONS = {
  Placement: Briefcase,
  Admission: GraduationCap,
  Internship: Award,
  General: Star,
  Counseling: Star,
}

const TYPE_COLORS = {
  Placement: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
  Admission: 'text-green-500 bg-green-50 dark:bg-green-900/20',
  Internship: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20',
  General: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
  Counseling: 'text-teal-500 bg-teal-50 dark:bg-teal-900/20',
}

export default function SuccessStories() {
  const { testimonials, stories } = useTestimonialsStore()
  const [activeTab, setActiveTab] = useState<'stories' | 'testimonials'>('stories')
  const [storyFilter, setStoryFilter] = useState<string>('All')
  const [testFilter, setTestFilter] = useState<string>('All')

  const publishedStories = stories.filter(s => s.status === 'Published')
  const publishedTests = testimonials.filter(t => t.status === 'Published')

  const filteredStories = storyFilter === 'All' ? publishedStories : publishedStories.filter(s => s.type === storyFilter)
  const filteredTests = testFilter === 'All' ? publishedTests : publishedTests.filter(t => t.type === testFilter)

  const stats = [
    { val: (publishedStories.length + publishedTests.length) + '+', label: 'Success Stories' },
    { val: '500+', label: 'Placements' },
    { val: '200+', label: 'IIT/NIT Admits' },
    { val: '₹40 LPA', label: 'Highest Package' },
  ]

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-brand-dark-bg pt-16">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0F0F1A] via-[#1A1040] to-[#0A1A0A] py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 rounded-full mb-4 uppercase tracking-widest">
              <Star size={13} /> Success Stories
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Real Students. <span className="gradient-text">Real Results.</span>
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto mb-8">
              Hear from students who transformed their lives with Skill021. From tier-3 colleges to FAANG, from average scores to IIT.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {stats.map(s => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
                <div className="text-xl font-bold text-white">{s.val}</div>
                <div className="text-xs text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-gray-100 dark:bg-white/5 p-1 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab('stories')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'stories' ? 'bg-white dark:bg-brand-dark-card text-brand-text dark:text-brand-dark-text shadow-sm' : 'text-brand-muted dark:text-brand-dark-muted'}`}
          >
            Success Stories ({publishedStories.length})
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'testimonials' ? 'bg-white dark:bg-brand-dark-card text-brand-text dark:text-brand-dark-text shadow-sm' : 'text-brand-muted dark:text-brand-dark-muted'}`}
          >
            Testimonials ({publishedTests.length})
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'stories' ? (
            <motion.div key="stories" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {/* Story Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {STORY_TYPES.map(t => (
                  <button
                    key={t}
                    onClick={() => setStoryFilter(t)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${storyFilter === t ? 'bg-primary-500 text-white' : 'bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border text-brand-muted dark:text-brand-dark-muted hover:border-primary-500'}`}
                  >
                    {t} {t === 'All' && `(${publishedStories.length})`}
                  </button>
                ))}
              </div>

              <div className="space-y-5">
                {filteredStories.map((story, idx) => {
                  const TypeIcon = TYPE_ICONS[story.type]
                  return (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="card p-6 hover:shadow-card-hover transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Left */}
                        <div className="md:w-48 flex-shrink-0 flex md:flex-col items-center gap-4 md:gap-2 md:text-center">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                            {story.studentName[0]}
                          </div>
                          <div>
                            <h4 className="font-bold text-brand-text dark:text-brand-dark-text text-sm">{story.studentName}</h4>
                            <p className="text-xs text-brand-muted dark:text-brand-dark-muted">{story.fromCollege}</p>
                            {(story.toCompany || story.toCollege) && (
                              <p className="text-xs font-semibold text-primary-500 flex items-center gap-1 md:justify-center">
                                <ChevronRight size={11} /> {story.toCompany || story.toCollege}
                              </p>
                            )}
                            {story.package && (
                              <span className="text-xs font-bold text-green-500">{story.package}</span>
                            )}
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden md:block w-px bg-brand-border dark:bg-brand-dark-border flex-shrink-0" />

                        {/* Right */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${TYPE_COLORS[story.type]}`}>
                              <TypeIcon size={11} /> {story.type} Success
                            </span>
                            {story.course && (
                              <span className="text-xs text-brand-muted dark:text-brand-dark-muted bg-gray-100 dark:bg-white/10 px-2.5 py-1 rounded-full">
                                {story.course}
                              </span>
                            )}
                            <span className="ml-auto text-xs text-brand-muted dark:text-brand-dark-muted">{story.year}</span>
                          </div>
                          <div className="relative">
                            <Quote size={20} className="text-primary-200 dark:text-primary-800 absolute -top-1 -left-1" />
                            <p className="text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed pl-5 italic">{story.story}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
                {filteredStories.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-brand-muted dark:text-brand-dark-muted">No stories available for this category.</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div key="testimonials" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {/* Testimonial Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {TEST_TYPES.map(t => (
                  <button
                    key={t}
                    onClick={() => setTestFilter(t)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${testFilter === t ? 'bg-primary-500 text-white' : 'bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border text-brand-muted dark:text-brand-dark-muted hover:border-primary-500'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredTests.map((t, idx) => {
                  const TypeIcon = TYPE_ICONS[t.type] || Star
                  return (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="card p-5"
                    >
                      {/* Stars */}
                      <div className="flex items-center gap-0.5 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={14} className={i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 dark:text-gray-700'} />
                        ))}
                        <span className={`ml-2 text-[11px] font-bold px-2 py-0.5 rounded-full ${TYPE_COLORS[t.type]}`}>
                          {t.type}
                        </span>
                      </div>

                      <div className="relative mb-4">
                        <Quote size={18} className="text-primary-200 dark:text-primary-800 absolute -top-1 -left-0.5" />
                        <p className="text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed pl-4 italic">{t.content}</p>
                      </div>

                      {t.achievement && (
                        <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/10 rounded-xl px-3 py-2 mb-4">
                          <Award size={14} className="text-green-500" />
                          <span className="text-xs font-semibold text-green-600 dark:text-green-400">{t.achievement}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {t.studentName[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-brand-text dark:text-brand-dark-text">{t.studentName}</p>
                          <p className="text-xs text-brand-muted dark:text-brand-dark-muted">{t.designation}{t.college ? ` · ${t.college}` : ''}</p>
                        </div>
                        {t.course && (
                          <span className="ml-auto text-[10px] text-primary-500 bg-primary-50 dark:bg-primary-900/20 px-2 py-0.5 rounded-full font-medium">{t.course}</span>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
                {filteredTests.length === 0 && (
                  <div className="col-span-2 text-center py-12">
                    <p className="text-brand-muted dark:text-brand-dark-muted">No testimonials for this category.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
