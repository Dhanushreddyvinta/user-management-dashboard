import { useState } from 'react'
import { FiEye, FiEdit3, FiTrash2, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export default function ResponsiveTable({ users, onDelete, selectedUsers, onSelectionChange }) {
  const [sortField, setSortField] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')
  const [expandedRows, setExpandedRows] = useState(new Set())
  const navigate = useNavigate()

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      onSelectionChange(users.map(u => u._id))
    } else {
      onSelectionChange([])
    }
  }

  const handleSelectUser = (userId, checked) => {
    if (checked) {
      onSelectionChange([...selectedUsers, userId])
    } else {
      onSelectionChange(selectedUsers.filter(id => id !== userId))
    }
  }

  const toggleRowExpansion = (userId) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId)
    } else {
      newExpanded.add(userId)
    }
    setExpandedRows(newExpanded)
  }

  const sortedUsers = [...users].sort((a, b) => {
    let aVal = a[sortField] || ''
    let bVal = b[sortField] || ''
    
    if (sortField === 'city') {
      aVal = a.address?.city || ''
      bVal = b.address?.city || ''
    }
    
    if (sortDirection === 'asc') {
      return aVal.toString().localeCompare(bVal.toString())
    } else {
      return bVal.toString().localeCompare(aVal.toString())
    }
  })

  const SortIcon = ({ field }) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
  }

  return (
    <div className="responsive-table-container">
      {/* Desktop Table */}
      <div className="desktop-table">
        <table className="table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedUsers.length === users.length && users.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th onClick={() => handleSort('name')} className="sortable">
                Name <SortIcon field="name" />
              </th>
              <th onClick={() => handleSort('email')} className="sortable">
                Email <SortIcon field="email" />
              </th>
              <th onClick={() => handleSort('company')} className="sortable">
                Company <SortIcon field="company" />
              </th>
              <th onClick={() => handleSort('role')} className="sortable">
                Role <SortIcon field="role" />
              </th>
              <th onClick={() => handleSort('city')} className="sortable">
                City <SortIcon field="city" />
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map(user => (
              <tr key={user._id} className={selectedUsers.includes(user._id) ? 'selected' : ''}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    onChange={(e) => handleSelectUser(user._id, e.target.checked)}
                  />
                </td>
                <td>
                  <div className="user-info">
                    <img 
                      src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=2563eb&color=fff`} 
                      alt={user.name}
                      className="user-avatar"
                    />
                    <span>{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.company}</td>
                <td>
                  <span className={`role-badge role-${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>{user.address?.city || '-'}</td>
                <td>
                  <div className="actions">
                    <button 
                      className="btn-icon" 
                      onClick={() => navigate(`/view/${user._id}`)}
                      title="View"
                    >
                      <FiEye />
                    </button>
                    <button 
                      className="btn-icon" 
                      onClick={() => navigate(`/edit/${user._id}`)}
                      title="Edit"
                    >
                      <FiEdit3 />
                    </button>
                    <button 
                      className="btn-icon danger" 
                      onClick={() => onDelete(user._id)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="mobile-cards">
        {sortedUsers.map(user => (
          <div key={user._id} className={`user-card ${selectedUsers.includes(user._id) ? 'selected' : ''}`}>
            <div className="user-card-header">
              <input
                type="checkbox"
                checked={selectedUsers.includes(user._id)}
                onChange={(e) => handleSelectUser(user._id, e.target.checked)}
              />
              <div className="user-info">
                <img 
                  src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=2563eb&color=fff`} 
                  alt={user.name}
                  className="user-avatar"
                />
                <div>
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
              </div>
              <button 
                className="expand-btn"
                onClick={() => toggleRowExpansion(user._id)}
              >
                {expandedRows.has(user._id) ? <FiChevronUp /> : <FiChevronDown />}
              </button>
            </div>

            <div className="user-card-summary">
              <span className={`role-badge role-${user.role.toLowerCase()}`}>
                {user.role}
              </span>
              <span className="company">{user.company}</span>
            </div>

            {expandedRows.has(user._id) && (
              <div className="user-card-details">
                <div className="detail-row">
                  <span className="label">Phone:</span>
                  <span>{user.phone}</span>
                </div>
                <div className="detail-row">
                  <span className="label">City:</span>
                  <span>{user.address?.city || '-'}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Address:</span>
                  <span>{user.address?.street || '-'}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Joined:</span>
                  <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            )}

            <div className="user-card-actions">
              <button 
                className="btn secondary"
                onClick={() => navigate(`/view/${user._id}`)}
              >
                <FiEye /> View
              </button>
              <button 
                className="btn"
                onClick={() => navigate(`/edit/${user._id}`)}
              >
                <FiEdit3 /> Edit
              </button>
              <button 
                className="btn danger"
                onClick={() => onDelete(user._id)}
              >
                <FiTrash2 /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
