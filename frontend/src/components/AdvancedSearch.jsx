import { useState } from 'react'
import { FiSearch, FiFilter, FiX } from 'react-icons/fi'

export default function AdvancedSearch({ onSearch, onFilter, users }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    role: '',
    company: '',
    city: '',
    dateRange: ''
  })

  const handleSearch = (value) => {
    setSearchTerm(value)
    onSearch(value)
  }

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilter(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = { role: '', company: '', city: '', dateRange: '' }
    setFilters(clearedFilters)
    onFilter(clearedFilters)
  }

  const getUniqueValues = (field) => {
    const values = users.map(user => {
      if (field === 'city') return user.address?.city
      return user[field]
    }).filter(Boolean)
    return [...new Set(values)].sort()
  }

  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  return (
    <div className="advanced-search">
      <div className="search-bar">
        <div className="search-input-wrapper">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search users by name, email, company, or city..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => handleSearch('')}
            >
              <FiX />
            </button>
          )}
        </div>
        
        <button 
          className={`filter-toggle ${isFilterOpen ? 'active' : ''}`}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <FiFilter />
          Filters
          {activeFiltersCount > 0 && (
            <span className="filter-count">{activeFiltersCount}</span>
          )}
        </button>
      </div>

      {isFilterOpen && (
        <div className="filter-panel">
          <div className="filter-grid">
            <div className="filter-group">
              <label>Role</label>
              <select 
                value={filters.role}
                onChange={(e) => handleFilterChange('role', e.target.value)}
              >
                <option value="">All Roles</option>
                {getUniqueValues('role').map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Company</label>
              <select 
                value={filters.company}
                onChange={(e) => handleFilterChange('company', e.target.value)}
              >
                <option value="">All Companies</option>
                {getUniqueValues('company').map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>City</label>
              <select 
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
              >
                <option value="">All Cities</option>
                {getUniqueValues('city').map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Date Range</label>
              <select 
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              >
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>

          {activeFiltersCount > 0 && (
            <div className="filter-actions">
              <button className="btn secondary" onClick={clearFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
