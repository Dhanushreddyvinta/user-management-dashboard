import { useState } from 'react'
import { FiTrash2, FiEdit3, FiCheck, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function BulkActions({ selectedUsers, onBulkDelete, onBulkUpdate, onClearSelection }) {
  const [showBulkUpdate, setShowBulkUpdate] = useState(false)
  const [bulkUpdateData, setBulkUpdateData] = useState({
    role: '',
    company: ''
  })

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedUsers.length} selected users? This action cannot be undone.`)) {
      return
    }
    
    try {
      await onBulkDelete(selectedUsers)
      toast.success(`${selectedUsers.length} users deleted successfully`)
      onClearSelection()
    } catch (error) {
      toast.error('Failed to delete users')
    }
  }

  const handleBulkUpdate = async () => {
    if (!bulkUpdateData.role && !bulkUpdateData.company) {
      toast.error('Please select at least one field to update')
      return
    }

    try {
      await onBulkUpdate(selectedUsers, bulkUpdateData)
      toast.success(`${selectedUsers.length} users updated successfully`)
      setShowBulkUpdate(false)
      setBulkUpdateData({ role: '', company: '' })
      onClearSelection()
    } catch (error) {
      toast.error('Failed to update users')
    }
  }

  if (selectedUsers.length === 0) return null

  return (
    <div className="bulk-actions">
      <div className="bulk-actions-header">
        <span className="selected-count">
          {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
        </span>
        <div className="bulk-actions-buttons">
          <button 
            className="btn secondary"
            onClick={() => setShowBulkUpdate(!showBulkUpdate)}
          >
            <FiEdit3 />
            Bulk Update
          </button>
          <button 
            className="btn danger"
            onClick={handleBulkDelete}
          >
            <FiTrash2 />
            Delete Selected
          </button>
          <button 
            className="btn secondary"
            onClick={onClearSelection}
          >
            <FiX />
            Clear Selection
          </button>
        </div>
      </div>

      {showBulkUpdate && (
        <div className="bulk-update-panel">
          <h4>Update Selected Users</h4>
          <div className="bulk-update-form">
            <div className="form-group">
              <label>Role</label>
              <select 
                value={bulkUpdateData.role}
                onChange={(e) => setBulkUpdateData(prev => ({ ...prev, role: e.target.value }))}
              >
                <option value="">Keep Current</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="User">User</option>
              </select>
            </div>
            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                placeholder="Keep current or enter new company"
                value={bulkUpdateData.company}
                onChange={(e) => setBulkUpdateData(prev => ({ ...prev, company: e.target.value }))}
              />
            </div>
            <div className="form-actions">
              <button className="btn" onClick={handleBulkUpdate}>
                <FiCheck />
                Update {selectedUsers.length} Users
              </button>
              <button 
                className="btn secondary" 
                onClick={() => setShowBulkUpdate(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
