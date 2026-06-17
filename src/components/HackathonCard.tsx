import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Trophy, ExternalLink, Tag } from 'lucide-react'
import { Hackathon } from '../data/hackathons'

interface HackathonCardProps {
  hackathon: Hackathon
  index?: number
}

const statusConfig = {
  Upcoming: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', dot: 'bg-green-500' },
  Ongoing: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', dot: 'bg-amber-500' },
  Completed: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-600 dark:text-gray-400', dot: 'bg-gray-400' },
}

const modeColors = {
  Online: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Offline: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Hybrid: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
}

export default function HackathonCard({ hackathon, index = 0 }: HackathonCardProps) {
  const status = statusConfig[hackathon.status]
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="card p-6 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
              {hackathon.status.toUpperCase()}
            </span>
            <span className={`badge text-xs ${modeColors[hackathon.mode]}`}>
              {hackathon.mode}
            </span>
          </div>
          <h3 className="text-lg font-bold text-brand-text dark:text-brand-dark-text leading-tight">
            {hackathon.name}
          </h3>
          <p className="text-sm text-brand-muted dark:text-brand-dark-muted mt-1">
            by {hackathon.organizer}
          </p>
        </div>
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-teal-500 rounded-xl flex items-center justify-center">
          <Trophy size={24} className="text-white" />
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-brand-muted dark:text-brand-dark-muted line-clamp-2">
        {hackathon.description}
      </p>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 text-xs text-brand-muted dark:text-brand-dark-muted">
          <Calendar size={14} className="text-primary-500 flex-shrink-0" />
          <span>{formatDate(hackathon.startDate)} – {formatDate(hackathon.endDate)}</span>
        </div>
        {hackathon.location && (
          <div className="flex items-center gap-2 text-xs text-brand-muted dark:text-brand-dark-muted">
            <MapPin size={14} className="text-teal-500 flex-shrink-0" />
            <span>{hackathon.location}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-xs text-brand-muted dark:text-brand-dark-muted">
          <Trophy size={14} className="text-amber-500 flex-shrink-0" />
          <span className="font-semibold text-brand-text dark:text-brand-dark-text">{hackathon.prizePool}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-brand-muted dark:text-brand-dark-muted">
          <Users size={14} className="text-primary-500 flex-shrink-0" />
          <span>{hackathon.teamSize}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <Tag size={12} className="text-brand-muted dark:text-brand-dark-muted" />
        {hackathon.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-white/10 text-brand-muted dark:text-brand-dark-muted rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-auto pt-2 border-t border-brand-border dark:border-brand-dark-border">
        {hackathon.status !== 'Completed' ? (
          <a
            href={hackathon.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-500 text-white text-sm font-semibold rounded-xl hover:bg-primary-600 transition-all duration-200"
          >
            <ExternalLink size={14} />
            Register Now
          </a>
        ) : (
          <button disabled className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-white/10 text-gray-400 text-sm font-semibold rounded-xl cursor-not-allowed">
            Registration Closed
          </button>
        )}
        <button className="px-4 py-2.5 border border-brand-border dark:border-brand-dark-border text-sm font-semibold text-brand-text dark:text-brand-dark-text rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
          Details
        </button>
      </div>
    </motion.div>
  )
}
