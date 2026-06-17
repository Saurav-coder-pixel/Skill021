import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, ChevronDown, MessageCircle, ExternalLink } from 'lucide-react'
import CounselingCard from '../components/CounselingCard'
import { counselingPrograms, counselingFAQs } from '../data/counseling'

function FAQItem({ faq, index }: { faq: { id: string; question: string; answer: string }; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border border-brand-border dark:border-brand-dark-border rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-white dark:bg-brand-dark-card hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
      >
        <span className="font-semibold text-sm md:text-base text-brand-text dark:text-brand-dark-text pr-4">
          {faq.question}
        </span>
        <ChevronDown
          size={20}
          className={`text-brand-muted flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 bg-gray-50 dark:bg-white/5 text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed border-t border-brand-border dark:border-brand-dark-border">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Counseling() {
  return (
    <div className="min-h-screen bg-brand-bg dark:bg-brand-dark-bg pt-20">
      {/* Header */}
      <section className="bg-hero-gradient dark:bg-hero-dark border-b border-brand-border dark:border-brand-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap size={32} className="text-primary-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-text dark:text-brand-dark-text mb-3">
              University Counseling
            </h1>
            <p className="text-brand-muted dark:text-brand-dark-muted text-lg max-w-2xl mx-auto mb-6">
              Expert guidance for your admission journey — from choice filling to final seat allotment
            </p>
            <a
              href="https://forms.gle/BpcgGfoKjG1SVgFPA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-all duration-200"
            >
              <ExternalLink size={16} />
              Apply for Free Counseling Session
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white dark:bg-brand-dark-card border-b border-brand-border dark:border-brand-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '3,000+', label: 'Students Counseled', color: 'text-primary-500' },
              { value: '4', label: 'University Programs', color: 'text-teal-500' },
              { value: '95%', label: 'Success Rate', color: 'text-green-500' },
              { value: 'Free', label: 'Initial Consultation', color: 'text-amber-500' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-sm text-brand-muted dark:text-brand-dark-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Counseling Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">Choose Your Program</h2>
            <p className="section-subtitle">Expert guidance for AKTU, IPU, JoSAA, and JAC Delhi admissions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {counselingPrograms.map((program, i) => (
              <CounselingCard key={program.id} program={program} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white dark:bg-brand-dark-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Simple 3-step process to get expert counseling</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Fill the Form', desc: 'Submit your rank, category, and program preference via our Google Form. Takes just 2 minutes.', color: '#6C63FF' },
              { step: '02', title: 'Get Matched', desc: 'Our experts analyze your profile and match you with the right counseling program and strategy.', color: '#00BFA6' },
              { step: '03', title: 'Get Admitted', desc: 'Follow the personalized strategy, fill choices, and secure your seat in the best college for you.', color: '#F59E0B' },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-black text-white"
                  style={{ background: step.color }}
                >
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-brand-text dark:text-brand-dark-text mb-2">{step.title}</h3>
                <p className="text-sm text-brand-muted dark:text-brand-dark-muted">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-brand-bg dark:bg-brand-dark-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle size={24} className="text-primary-500" />
            </div>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Everything you need to know about university counseling</p>
          </div>
          <div className="space-y-3">
            {counselingFAQs.map((faq, i) => (
              <FAQItem key={faq.id} faq={faq} index={i} />
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-brand-muted dark:text-brand-dark-muted mb-4 text-sm">Have more questions? Reach out to us!</p>
            <a
              href="https://forms.gle/BpcgGfoKjG1SVgFPA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-primary"
            >
              <ExternalLink size={16} />
              Contact Our Counselors
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
