import { motion } from 'framer-motion'
import { Star, Clock, BookOpen, Play, Users } from 'lucide-react'
import { Course } from '../data/courses'
import toast from 'react-hot-toast'

interface CourseCardProps {
  course: Course
  index?: number
}

const levelColors = {
  Beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

const categoryColors: Record<string, string> = {
  DSA: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
  Java: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Python: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Django: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  DevOps: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Exam Prep': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'System Design': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
}

export default function CourseCard({ course, index = 0 }: CourseCardProps) {
  const handleEnroll = () => {
    toast.success(`Enrolled in "${course.title}"! Check your dashboard.`, {
      duration: 3000,
      icon: '🎉',
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'}
      />
    ))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="card group overflow-hidden flex flex-col"
    >
      {/* Thumbnail */}
      <div
        className="h-44 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${course.gradientFrom} 0%, ${course.gradientTo} 100%)` }}
      >
        <BookOpen size={52} className="text-white/30" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
        {course.price === 'FREE' && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            FREE
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <span className={`badge text-xs ${categoryColors[course.category] || 'bg-gray-100 text-gray-700'}`}>
            {course.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className={`badge text-xs ${levelColors[course.level]}`}>
            {course.level}
          </span>
        </div>

        <h3 className="text-base font-bold text-brand-text dark:text-brand-dark-text mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
          {course.title}
        </h3>

        <p className="text-xs text-brand-muted dark:text-brand-dark-muted mb-3 line-clamp-2 flex-1">
          {course.description}
        </p>

        <div className="flex items-center gap-1 text-xs text-brand-muted dark:text-brand-dark-muted mb-1">
          <Users size={12} />
          <span>{course.instructor}</span>
        </div>

        <div className="flex items-center gap-4 text-xs text-brand-muted dark:text-brand-dark-muted mb-3">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen size={12} />
            <span>{course.lectures} lectures</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-0.5">
            {renderStars(course.rating)}
          </div>
          <span className="text-xs font-semibold text-amber-500">{course.rating}</span>
          <span className="text-xs text-brand-muted dark:text-brand-dark-muted">({course.reviews.toLocaleString()})</span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="text-xl font-bold text-brand-text dark:text-brand-dark-text">
            {course.price === 'FREE' ? (
              <span className="text-green-600 dark:text-green-400">FREE</span>
            ) : (
              <span>₹{course.price}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <a
              href={course.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
              title="Watch on YouTube"
            >
              <Play size={16} className="text-red-500" />
            </a>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleEnroll}
              className="px-4 py-2 bg-primary-500 text-white text-sm font-semibold rounded-xl hover:bg-primary-600 transition-all duration-200"
            >
              Enroll Now
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
