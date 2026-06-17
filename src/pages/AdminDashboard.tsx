import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, BookOpen, Trophy, Users, GraduationCap, Settings,
  Plus, Edit2, Trash2, Search, X, Shield, UserCheck, UserX,
  TrendingUp, AlertCircle, CheckCircle, Clock, MoreVertical
} from 'lucide-react'
import { courses as initialCourses, Course } from '../data/courses'
import { hackathons as initialHackathons, Hackathon } from '../data/hackathons'
import toast from 'react-hot-toast'

type AdminTab = 'overview' | 'courses' | 'hackathons' | 'users' | 'counseling' | 'settings'

const sidebarItems = [
  { id: 'overview' as AdminTab, label: 'Overview', icon: LayoutDashboard },
  { id: 'courses' as AdminTab, label: 'Manage Courses', icon: BookOpen },
  { id: 'hackathons' as AdminTab, label: 'Manage Hackathons', icon: Trophy },
  { id: 'users' as AdminTab, label: 'Manage Users', icon: Users },
  { id: 'counseling' as AdminTab, label: 'Counseling Apps', icon: GraduationCap },
  { id: 'settings' as AdminTab, label: 'Settings', icon: Settings },
]

const mockUsers = [
  { id: 'user-001', name: 'Rahul Sharma', email: 'rahul@example.com', college: 'AKTU-affiliated', enrolled: 3, joined: '2025-02-15', role: 'user', disabled: false },
  { id: 'user-002', name: 'Priya Verma', email: 'priya@example.com', college: 'IPU-affiliated', enrolled: 2, joined: '2025-03-10', role: 'user', disabled: false },
  { id: 'user-003', name: 'Amit Singh', email: 'amit@example.com', college: 'DTU', enrolled: 5, joined: '2025-01-20', role: 'user', disabled: false },
  { id: 'user-004', name: 'Neha Gupta', email: 'neha@example.com', college: 'NSIT', enrolled: 1, joined: '2025-04-05', role: 'user', disabled: true },
]

const mockCounselingApps = [
  { id: 'ca-1', name: 'Ravi Kumar', email: 'ravi@example.com', program: 'AKTU Counseling', date: '2026-06-01', status: 'Under Review' },
  { id: 'ca-2', name: 'Pooja Singh', email: 'pooja@example.com', program: 'JoSAA Counseling', date: '2026-06-05', status: 'Pending' },
  { id: 'ca-3', name: 'Arjun Mehta', email: 'arjun@example.com', program: 'IPU Counseling', date: '2026-06-08', status: 'Completed' },
  { id: 'ca-4', name: 'Divya Sharma', email: 'divya@example.com', program: 'JAC Delhi Counseling', date: '2026-06-10', status: 'Pending' },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview')
  const [courseList, setCourseList] = useState<Course[]>(initialCourses)
  const [hackathonList, setHackathonList] = useState<Hackathon[]>(initialHackathons)
  const [users, setUsers] = useState(mockUsers)
  const [counselingApps, setCounselingApps] = useState(mockCounselingApps)
  const [courseSearch, setCourseSearch] = useState('')
  const [userSearch, setUserSearch] = useState('')
  const [showCourseModal, setShowCourseModal] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  const filteredCourses = courseList.filter(c =>
    c.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
    c.category.toLowerCase().includes(courseSearch.toLowerCase())
  )
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  )

  const handleDeleteCourse = (id: string) => {
    setCourseList(prev => prev.filter(c => c.id !== id))
    setShowDeleteConfirm(null)
    toast.success('Course deleted successfully')
  }

  const handleSaveCourse = () => {
    if (!editingCourse?.title) { toast.error('Course title is required'); return }
    if (editingCourse.id) {
      setCourseList(prev => prev.map(c => c.id === editingCourse.id ? { ...c, ...editingCourse } as Course : c))
      toast.success('Course updated!')
    } else {
      const newCourse: Course = {
        id: `course-${Date.now()}`,
        title: editingCourse.title || '',
        category: editingCourse.category as Course['category'] || 'DSA',
        instructor: 'Skills021 Team',
        duration: editingCourse.duration || '0 hours',
        lectures: 0,
        level: editingCourse.level as Course['level'] || 'Beginner',
        rating: 4.5,
        reviews: 0,
        price: editingCourse.price || 'FREE',
        description: editingCourse.description || '',
        tags: [],
        youtubeUrl: editingCourse.youtubeUrl || 'https://www.youtube.com/@skills021',
        status: editingCourse.status as Course['status'] || 'Draft',
        enrolled: 0,
        gradientFrom: '#6C63FF',
        gradientTo: '#00BFA6',
      }
      setCourseList(prev => [...prev, newCourse])
      toast.success('Course added successfully! 🎉')
    }
    setShowCourseModal(false)
    setEditingCourse(null)
  }

  const toggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, disabled: !u.disabled } : u))
    const user = users.find(u => u.id === userId)
    toast.success(`User ${user?.disabled ? 'enabled' : 'disabled'} successfully`)
  }

  const updateCounselingStatus = (id: string, status: string) => {
    setCounselingApps(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    toast.success('Status updated!')
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-brand-text dark:text-brand-dark-text">Admin Overview</h2>
              <p className="text-brand-muted dark:text-brand-dark-muted mt-1">Manage Skills021 platform</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Users', value: users.length + 1, icon: Users, color: 'text-primary-500', bg: 'bg-primary-50 dark:bg-primary-900/20' },
                { label: 'Total Courses', value: courseList.length, icon: BookOpen, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
                { label: 'Active Hackathons', value: hackathonList.filter(h => h.status !== 'Completed').length, icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
                { label: 'Counseling Apps', value: counselingApps.length, icon: GraduationCap, color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-900/20' },
              ].map((stat) => (
                <div key={stat.label} className="card p-5">
                  <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                    <stat.icon size={20} className={stat.color} />
                  </div>
                  <div className="text-3xl font-bold text-brand-text dark:text-brand-dark-text">{stat.value}</div>
                  <div className="text-xs text-brand-muted dark:text-brand-dark-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Registrations */}
            <div className="card overflow-hidden">
              <div className="p-5 border-b border-brand-border dark:border-brand-dark-border flex items-center justify-between">
                <h3 className="font-bold text-brand-text dark:text-brand-dark-text flex items-center gap-2">
                  <TrendingUp size={18} className="text-primary-500" /> Recent Registrations
                </h3>
                <button onClick={() => setActiveTab('users')} className="text-xs text-primary-500 hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-white/5">
                    <tr>
                      {['Name', 'Email', 'College', 'Joined'].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-brand-muted dark:text-brand-dark-muted uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border dark:divide-brand-dark-border">
                    {mockUsers.map(u => (
                      <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                        <td className="px-5 py-4 font-medium text-brand-text dark:text-brand-dark-text">{u.name}</td>
                        <td className="px-5 py-4 text-brand-muted dark:text-brand-dark-muted">{u.email}</td>
                        <td className="px-5 py-4 text-brand-muted dark:text-brand-dark-muted">{u.college}</td>
                        <td className="px-5 py-4 text-brand-muted dark:text-brand-dark-muted">{u.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Add Course', icon: Plus, tab: 'courses' as AdminTab, color: 'bg-primary-500' },
                { label: 'Add Hackathon', icon: Plus, tab: 'hackathons' as AdminTab, color: 'bg-amber-500' },
                { label: 'View Users', icon: Users, tab: 'users' as AdminTab, color: 'bg-teal-500' },
                { label: 'View Apps', icon: GraduationCap, tab: 'counseling' as AdminTab, color: 'bg-green-500' },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={() => setActiveTab(action.tab)}
                  className={`${action.color} text-white py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
                >
                  <action.icon size={16} /> {action.label}
                </button>
              ))}
            </div>
          </div>
        )

      case 'courses':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-brand-text dark:text-brand-dark-text">Manage Courses</h2>
              <button
                onClick={() => { setEditingCourse({}); setShowCourseModal(true) }}
                className="flex items-center gap-2 btn-primary text-sm"
              >
                <Plus size={16} /> Add Course
              </button>
            </div>
            <div className="relative w-full max-w-xs">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input
                type="text"
                value={courseSearch}
                onChange={e => setCourseSearch(e.target.value)}
                placeholder="Search courses..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-bg text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-white/5">
                    <tr>
                      {['Title', 'Category', 'Price', 'Enrolled', 'Status', 'Actions'].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-brand-muted dark:text-brand-dark-muted uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border dark:divide-brand-dark-border">
                    {filteredCourses.map(course => (
                      <tr key={course.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                        <td className="px-5 py-4 font-medium text-brand-text dark:text-brand-dark-text max-w-[200px] truncate">{course.title}</td>
                        <td className="px-5 py-4">
                          <span className="badge bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 text-xs">{course.category}</span>
                        </td>
                        <td className="px-5 py-4 text-brand-text dark:text-brand-dark-text font-medium">
                          {course.price === 'FREE' ? <span className="text-green-600">FREE</span> : `₹${course.price}`}
                        </td>
                        <td className="px-5 py-4 text-brand-muted dark:text-brand-dark-muted">{course.enrolled.toLocaleString()}</td>
                        <td className="px-5 py-4">
                          <span className={`badge text-xs ${course.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
                            {course.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => { setEditingCourse(course); setShowCourseModal(true) }}
                              className="p-1.5 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 text-primary-500 transition-colors"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(course.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Delete Confirm Dialog */}
            <AnimatePresence>
              {showDeleteConfirm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                    className="bg-white dark:bg-brand-dark-card rounded-2xl p-6 max-w-sm w-full shadow-xl"
                  >
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Trash2 size={22} className="text-red-500" />
                    </div>
                    <h3 className="text-lg font-bold text-brand-text dark:text-brand-dark-text text-center mb-2">Delete Course?</h3>
                    <p className="text-sm text-brand-muted dark:text-brand-dark-muted text-center mb-6">This action cannot be undone.</p>
                    <div className="flex gap-3">
                      <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 py-2.5 border border-brand-border dark:border-brand-dark-border rounded-xl text-sm font-semibold text-brand-text dark:text-brand-dark-text hover:bg-gray-50 dark:hover:bg-white/5">
                        Cancel
                      </button>
                      <button onClick={() => handleDeleteCourse(showDeleteConfirm)} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600">
                        Delete
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Course Modal */}
            <AnimatePresence>
              {showCourseModal && editingCourse !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto"
                >
                  <motion.div
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    className="bg-white dark:bg-brand-dark-card rounded-2xl p-6 max-w-lg w-full shadow-xl my-4"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-brand-text dark:text-brand-dark-text">
                        {editingCourse.id ? 'Edit Course' : 'Add New Course'}
                      </h3>
                      <button onClick={() => setShowCourseModal(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10">
                        <X size={18} className="text-brand-muted" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-text dark:text-brand-dark-text mb-1">Title *</label>
                        <input
                          type="text"
                          value={editingCourse.title || ''}
                          onChange={e => setEditingCourse(p => ({ ...p, title: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-bg text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Course title"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-brand-text dark:text-brand-dark-text mb-1">Category</label>
                          <select
                            value={editingCourse.category || 'DSA'}
                            onChange={e => setEditingCourse(p => ({ ...p, category: e.target.value as Course['category'] }))}
                            className="w-full px-4 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-bg text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500"
                          >
                            {['DSA', 'Java', 'Python', 'Django', 'DevOps', 'Exam Prep', 'System Design'].map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-brand-text dark:text-brand-dark-text mb-1">Level</label>
                          <select
                            value={editingCourse.level || 'Beginner'}
                            onChange={e => setEditingCourse(p => ({ ...p, level: e.target.value as Course['level'] }))}
                            className="w-full px-4 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-bg text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500"
                          >
                            {['Beginner', 'Intermediate', 'Advanced'].map(l => <option key={l} value={l}>{l}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-brand-text dark:text-brand-dark-text mb-1">Price (₹ or FREE)</label>
                          <input
                            type="text"
                            value={editingCourse.price === 'FREE' ? 'FREE' : editingCourse.price || ''}
                            onChange={e => {
                              const val = e.target.value.toUpperCase()
                              setEditingCourse(p => ({ ...p, price: val === 'FREE' ? 'FREE' : (parseInt(val) || 0) as Course['price'] }))
                            }}
                            placeholder="FREE or 499"
                            className="w-full px-4 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-bg text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-brand-text dark:text-brand-dark-text mb-1">Duration</label>
                          <input
                            type="text"
                            value={editingCourse.duration || ''}
                            onChange={e => setEditingCourse(p => ({ ...p, duration: e.target.value }))}
                            placeholder="e.g., 40 hours"
                            className="w-full px-4 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-bg text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-text dark:text-brand-dark-text mb-1">YouTube Link</label>
                        <input
                          type="url"
                          value={editingCourse.youtubeUrl || ''}
                          onChange={e => setEditingCourse(p => ({ ...p, youtubeUrl: e.target.value }))}
                          placeholder="https://youtube.com/@skills021"
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-bg text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-text dark:text-brand-dark-text mb-1">Description</label>
                        <textarea
                          value={editingCourse.description || ''}
                          onChange={e => setEditingCourse(p => ({ ...p, description: e.target.value }))}
                          rows={3}
                          placeholder="Course description..."
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-bg text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-text dark:text-brand-dark-text mb-1">Status</label>
                        <select
                          value={editingCourse.status || 'Draft'}
                          onChange={e => setEditingCourse(p => ({ ...p, status: e.target.value as Course['status'] }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-bg text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="Active">Active</option>
                          <option value="Draft">Draft</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button onClick={() => { setShowCourseModal(false); setEditingCourse(null) }} className="flex-1 py-3 border border-brand-border dark:border-brand-dark-border rounded-xl text-sm font-semibold text-brand-text dark:text-brand-dark-text hover:bg-gray-50 dark:hover:bg-white/5">
                        Cancel
                      </button>
                      <button onClick={handleSaveCourse} className="flex-1 py-3 bg-primary-500 text-white rounded-xl text-sm font-semibold hover:bg-primary-600">
                        {editingCourse.id ? 'Update Course' : 'Add Course'}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )

      case 'hackathons':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-brand-text dark:text-brand-dark-text">Manage Hackathons</h2>
              <button className="flex items-center gap-2 btn-primary text-sm">
                <Plus size={16} /> Add Hackathon
              </button>
            </div>
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-white/5">
                    <tr>
                      {['Name', 'Organizer', 'Date', 'Status', 'Mode', 'Actions'].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-brand-muted dark:text-brand-dark-muted uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border dark:divide-brand-dark-border">
                    {hackathonList.map(h => (
                      <tr key={h.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                        <td className="px-5 py-4 font-medium text-brand-text dark:text-brand-dark-text max-w-[180px] truncate">{h.name}</td>
                        <td className="px-5 py-4 text-brand-muted dark:text-brand-dark-muted max-w-[140px] truncate">{h.organizer}</td>
                        <td className="px-5 py-4 text-brand-muted dark:text-brand-dark-muted whitespace-nowrap">{h.startDate}</td>
                        <td className="px-5 py-4">
                          <span className={`badge text-xs ${
                            h.status === 'Upcoming' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            h.status === 'Ongoing' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                            'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                          }`}>{h.status}</span>
                        </td>
                        <td className="px-5 py-4 text-brand-muted dark:text-brand-dark-muted">{h.mode}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 text-primary-500"><Edit2 size={14}/></button>
                            <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"><Trash2 size={14}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'users':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-brand-text dark:text-brand-dark-text">Manage Users</h2>
              <div className="text-sm text-brand-muted dark:text-brand-dark-muted">
                {users.length + 1} total users
              </div>
            </div>
            <div className="relative max-w-xs">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input
                type="text"
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
                placeholder="Search users..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-bg text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-white/5">
                    <tr>
                      {['Name', 'Email', 'College', 'Courses', 'Joined', 'Role', 'Status', 'Actions'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-brand-muted dark:text-brand-dark-muted uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border dark:divide-brand-dark-border">
                    {filteredUsers.map(u => (
                      <tr key={u.id} className={`hover:bg-gray-50 dark:hover:bg-white/5 ${u.disabled ? 'opacity-60' : ''}`}>
                        <td className="px-4 py-4 font-medium text-brand-text dark:text-brand-dark-text">{u.name}</td>
                        <td className="px-4 py-4 text-brand-muted dark:text-brand-dark-muted">{u.email}</td>
                        <td className="px-4 py-4 text-brand-muted dark:text-brand-dark-muted">{u.college}</td>
                        <td className="px-4 py-4 text-center text-brand-text dark:text-brand-dark-text">{u.enrolled}</td>
                        <td className="px-4 py-4 text-brand-muted dark:text-brand-dark-muted">{u.joined}</td>
                        <td className="px-4 py-4">
                          <span className={`badge text-xs ${u.role === 'admin' ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`badge text-xs ${u.disabled ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                            {u.disabled ? 'Disabled' : 'Active'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => toggleUserStatus(u.id)}
                            className={`p-1.5 rounded-lg transition-colors ${u.disabled ? 'hover:bg-green-50 dark:hover:bg-green-900/20 text-green-500' : 'hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500'}`}
                            title={u.disabled ? 'Enable user' : 'Disable user'}
                          >
                            {u.disabled ? <UserCheck size={14}/> : <UserX size={14}/>}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'counseling':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-brand-text dark:text-brand-dark-text">Counseling Applications</h2>
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-white/5">
                    <tr>
                      {['Applicant', 'Email', 'Program', 'Applied', 'Status', 'Update'].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-brand-muted dark:text-brand-dark-muted uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border dark:divide-brand-dark-border">
                    {counselingApps.map(app => (
                      <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                        <td className="px-5 py-4 font-medium text-brand-text dark:text-brand-dark-text">{app.name}</td>
                        <td className="px-5 py-4 text-brand-muted dark:text-brand-dark-muted">{app.email}</td>
                        <td className="px-5 py-4 text-brand-muted dark:text-brand-dark-muted">{app.program}</td>
                        <td className="px-5 py-4 text-brand-muted dark:text-brand-dark-muted">{app.date}</td>
                        <td className="px-5 py-4">
                          <span className={`badge text-xs ${
                            app.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            app.status === 'Under Review' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                            'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                          }`}>{app.status}</span>
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={app.status}
                            onChange={e => updateCounselingStatus(app.id, e.target.value)}
                            className="text-xs px-3 py-1.5 rounded-lg border border-brand-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-bg text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-brand-text dark:text-brand-dark-text">Settings</h2>
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                  <Shield size={24} className="text-primary-500" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-text dark:text-brand-dark-text">Admin Panel Settings</h3>
                  <p className="text-sm text-brand-muted dark:text-brand-dark-muted">Manage platform configurations</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Platform Name', value: 'Skills021' },
                  { label: 'YouTube Channel', value: 'youtube.com/@skills021' },
                  { label: 'Counseling Form URL', value: 'forms.gle/BpcgGfoKjG1SVgFPA' },
                ].map((setting) => (
                  <div key={setting.label} className="flex items-center justify-between py-3 border-b border-brand-border dark:border-brand-dark-border">
                    <span className="text-sm font-medium text-brand-text dark:text-brand-dark-text">{setting.label}</span>
                    <span className="text-sm text-brand-muted dark:text-brand-dark-muted">{setting.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-brand-dark-bg pt-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Admin Sidebar */}
          <aside className="hidden lg:flex flex-col w-64 flex-shrink-0">
            <div className="card p-5 sticky top-24">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-brand-border dark:border-brand-dark-border">
                <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                  <Shield size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-text dark:text-brand-dark-text text-sm">Admin Panel</h3>
                  <p className="text-xs text-brand-muted dark:text-brand-dark-muted">Skills021</p>
                </div>
              </div>
              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-primary-500 text-white shadow-sm'
                        : 'text-brand-muted dark:text-brand-dark-muted hover:bg-gray-100 dark:hover:bg-white/10'
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Mobile Tab Bar */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-brand-dark-card border-t border-brand-border dark:border-brand-dark-border flex overflow-x-auto">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-shrink-0 flex flex-col items-center gap-1 py-2 px-3 text-xs transition-colors ${
                  activeTab === item.id ? 'text-primary-500' : 'text-brand-muted dark:text-brand-dark-muted'
                }`}
              >
                <item.icon size={18} />
                <span className="whitespace-nowrap">{item.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0 pb-20 lg:pb-0">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}
