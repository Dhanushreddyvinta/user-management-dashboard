import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiPlus, FiBarChart2, FiUsers, FiDownload } from 'react-icons/fi'
import api from '../api'
import toast from 'react-hot-toast'
import AdvancedSearch from '../components/AdvancedSearch'
import ExportData from '../components/ExportData'
import BulkActions from '../components/BulkActions'
import Analytics from '../components/Analytics'
import ResponsiveTable from '../components/ResponsiveTable'
// Date utility functions
const isToday = (date) => {
  const today = new Date()
  const targetDate = new Date(date)
  return today.toDateString() === targetDate.toDateString()
}

const isThisWeek = (date) => {
  const today = new Date()
  const targetDate = new Date(date)
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()))
  const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6))
  return targetDate >= startOfWeek && targetDate <= endOfWeek
}

const isThisMonth = (date) => {
  const today = new Date()
  const targetDate = new Date(date)
  return today.getMonth() === targetDate.getMonth() && today.getFullYear() === targetDate.getFullYear()
}

const isThisYear = (date) => {
  const today = new Date()
  const targetDate = new Date(date)
  return today.getFullYear() === targetDate.getFullYear()
}

export default function Dashboard() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({})
  const [selectedUsers, setSelectedUsers] = useState([])
  const [currentView, setCurrentView] = useState('users') // 'users' or 'analytics'
  const [page, setPage] = useState(1)
  const navigate = useNavigate()
  const pageSize = 10

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users')
      const data = res.data || []
      setUsers(data)
      setFilteredUsers(data)
    } catch (e) {
      console.error(e)
      toast.error('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUsers() }, [])

  const handleSearch = (term) => {
    setSearchTerm(term)
    applyFilters(term, filters)
  }

  const handleFilter = (newFilters) => {
    setFilters(newFilters)
    applyFilters(searchTerm, newFilters)
  }

  const applyFilters = (search, filterObj) => {
    let filtered = users

    // Apply search
    if (search) {
      filtered = filtered.filter(u =>
        [u.name, u.email, u.company, u.address?.city]
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    }

    // Apply filters
    if (filterObj.role) {
      filtered = filtered.filter(u => u.role === filterObj.role)
    }
    if (filterObj.company) {
      filtered = filtered.filter(u => u.company === filterObj.company)
    }
    if (filterObj.city) {
      filtered = filtered.filter(u => u.address?.city === filterObj.city)
    }
    if (filterObj.dateRange) {
      const now = new Date()
      filtered = filtered.filter(u => {
        const userDate = new Date(u.createdAt)
        switch (filterObj.dateRange) {
          case 'today': return isToday(userDate)
          case 'week': return isThisWeek(userDate)
          case 'month': return isThisMonth(userDate)
          case 'year': return isThisYear(userDate)
          default: return true
        }
      })
    }

    setFilteredUsers(filtered)
    setPage(1) // Reset to first page when filtering
  }

  const onDelete = async (id) => {
    if (!confirm('Delete this user?')) return
    try {
      await api.delete(`/users/${id}`)
      const updatedUsers = users.filter(u => u._id !== id)
      setUsers(updatedUsers)
      applyFilters(searchTerm, filters)
      setSelectedUsers(prev => prev.filter(userId => userId !== id))
      toast.success('User deleted')
    } catch (e) {
      console.error(e)
      toast.error('Failed to delete user')
    }
  }

  const handleBulkDelete = async (userIds) => {
    try {
      await Promise.all(userIds.map(id => api.delete(`/users/${id}`)))
      const updatedUsers = users.filter(u => !userIds.includes(u._id))
      setUsers(updatedUsers)
      applyFilters(searchTerm, filters)
      setSelectedUsers([])
    } catch (error) {
      throw error
    }
  }

  const handleBulkUpdate = async (userIds, updateData) => {
    try {
      const updates = {}
      if (updateData.role) updates.role = updateData.role
      if (updateData.company) updates.company = updateData.company

      await Promise.all(userIds.map(id => api.put(`/users/${id}`, updates)))
      
      const updatedUsers = users.map(user => 
        userIds.includes(user._id) ? { ...user, ...updates } : user
      )
      setUsers(updatedUsers)
      applyFilters(searchTerm, filters)
      setSelectedUsers([])
    } catch (error) {
      throw error
    }
  }

  // Pagination
  const start = (page - 1) * pageSize
  const paginated = filteredUsers.slice(start, start + pageSize)
  const totalPages = Math.ceil(filteredUsers.length / pageSize)

  if (loading) return (
    <div className="container">
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
        <h2>Loading Dashboard...</h2>
        <p>Please wait while we fetch your data</p>
      </div>
    </div>
  )

  return (
    <div className="container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div>
            <h1>User Management Dashboard</h1>
            <p>Manage and analyze your user data with advanced tools</p>
          </div>
          <div className="header-actions">
            <button 
              className={`btn ${currentView === 'users' ? '' : 'secondary'}`}
              onClick={() => setCurrentView('users')}
            >
              <FiUsers /> Users
            </button>
            <button 
              className={`btn ${currentView === 'analytics' ? '' : 'secondary'}`}
              onClick={() => setCurrentView('analytics')}
            >
              <FiBarChart2 /> Analytics
            </button>
            <button className="btn" onClick={() => navigate('/add')}>
              <FiPlus /> Add User
            </button>
          </div>
        </div>
      </div>

      {currentView === 'analytics' ? (
        <Analytics users={users} />
      ) : (
        <>
          {/* Advanced Search */}
          <AdvancedSearch 
            onSearch={handleSearch}
            onFilter={handleFilter}
            users={users}
          />

          {/* Export and Bulk Actions */}
          <div className="dashboard-controls">
            <ExportData users={users} filteredUsers={filteredUsers} />
          </div>

          {/* Bulk Actions */}
          <BulkActions 
            selectedUsers={selectedUsers}
            onBulkDelete={handleBulkDelete}
            onBulkUpdate={handleBulkUpdate}
            onClearSelection={() => setSelectedUsers([])}
          />

          {/* User Table */}
          {filteredUsers.length === 0 ? (
            <div className="empty-state">
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>👥</div>
                <h2>No Users Found</h2>
                <p>
                  {users.length === 0 
                    ? "Get started by adding your first user" 
                    : "Try adjusting your search or filters"
                  }
                </p>
                <button className="btn" onClick={() => navigate('/add')}>
                  <FiPlus /> Add User
                </button>
              </div>
            </div>
          ) : (
            <>
              <ResponsiveTable 
                users={paginated}
                onDelete={onDelete}
                selectedUsers={selectedUsers}
                onSelectionChange={setSelectedUsers}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <div className="pagination-info">
                    Showing {start + 1}-{Math.min(start + pageSize, filteredUsers.length)} of {filteredUsers.length} users
                  </div>
                  <div className="pagination-controls">
                    <button 
                      className="btn secondary"
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                    >
                      Previous
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum
                      if (totalPages <= 5) {
                        pageNum = i + 1
                      } else if (page <= 3) {
                        pageNum = i + 1
                      } else if (page >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = page - 2 + i
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          className={`btn ${page === pageNum ? '' : 'secondary'}`}
                          onClick={() => setPage(pageNum)}
                        >
                          {pageNum}
                        </button>
                      )
                    })}
                    <button 
                      className="btn secondary"
                      onClick={() => setPage(page + 1)}
                      disabled={page === totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

