import { useState, useEffect } from 'react'
import { FiCheck, FiX, FiAlertCircle, FiUser, FiMail, FiPhone, FiBriefcase, FiMapPin } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function UserForm({ user, onSubmit, submitText = 'Save' }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    role: user?.role || 'User',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      zipcode: user?.address?.zipcode || '',
      geo: {
        lat: user?.address?.geo?.lat || '',
        lng: user?.address?.geo?.lng || ''
      }
    },
    avatar: user?.avatar || ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required'
        if (value.length < 2) return 'Name must be at least 2 characters'
        return ''
      case 'email':
        if (!value.trim()) return 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email'
        return ''
      case 'phone':
        if (!value.trim()) return 'Phone is required'
        if (!/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ''))) return 'Please enter a valid phone number'
        return ''
      case 'company':
        if (!value.trim()) return 'Company is required'
        return ''
      default:
        return ''
    }
  }

  const handleChange = (path, value) => {
    setFormData(prev => {
      const obj = structuredClone(prev)
      const segs = path.split('.')
      let ref = obj
      for (let i = 0; i < segs.length - 1; i++) {
        ref = ref[segs[i]]
      }
      ref[segs[segs.length - 1]] = value
      return obj
    })

    // Real-time validation
    const fieldName = path.split('.')[0]
    const error = validateField(fieldName, value)
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }))

    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }))
  }

  const handleBlur = (fieldName) => {
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    newErrors.name = validateField('name', formData.name)
    newErrors.email = validateField('email', formData.email)
    newErrors.phone = validateField('phone', formData.phone)
    newErrors.company = validateField('company', formData.company)
    
    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error !== '')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      company: true
    })

    if (!validateForm()) {
      toast.error('Please fix the errors before submitting')
      return
    }

    setLoading(true)
    try {
      await onSubmit(formData)
    } catch (error) {
      toast.error('Failed to save user')
    } finally {
      setLoading(false)
    }
  }

  const getFieldStatus = (fieldName) => {
    if (!touched[fieldName]) return 'default'
    return errors[fieldName] ? 'error' : 'success'
  }

  const FieldIcon = ({ status }) => {
    switch (status) {
      case 'success': return <FiCheck className="field-icon success" />
      case 'error': return <FiX className="field-icon error" />
      default: return null
    }
  }

  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, ...user }))
    }
  }, [user])

  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit} className="user-form">
        {/* Basic Information */}
        <div className="form-section">
          <div className="section-header">
            <FiUser className="section-icon" />
            <h3>Basic Information</h3>
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <div className="input-wrapper">
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  placeholder="Enter full name"
                  className={`form-input ${getFieldStatus('name')}`}
                />
                <FieldIcon status={getFieldStatus('name')} />
              </div>
              {touched.name && errors.name && (
                <div className="form-error">
                  <FiAlertCircle />
                  {errors.name}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="Enter email address"
                  className={`form-input ${getFieldStatus('email')}`}
                />
                <FieldIcon status={getFieldStatus('email')} />
              </div>
              {touched.email && errors.email && (
                <div className="form-error">
                  <FiAlertCircle />
                  {errors.email}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <div className="input-wrapper">
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  placeholder="Enter phone number"
                  className={`form-input ${getFieldStatus('phone')}`}
                />
                <FieldIcon status={getFieldStatus('phone')} />
              </div>
              {touched.phone && errors.phone && (
                <div className="form-error">
                  <FiAlertCircle />
                  {errors.phone}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="company">Company *</label>
              <div className="input-wrapper">
                <input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  onBlur={() => handleBlur('company')}
                  placeholder="Enter company name"
                  className={`form-input ${getFieldStatus('company')}`}
                />
                <FieldIcon status={getFieldStatus('company')} />
              </div>
              {touched.company && errors.company && (
                <div className="form-error">
                  <FiAlertCircle />
                  {errors.company}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                className="form-input"
              >
                <option value="User">User</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="avatar">Avatar URL</label>
              <input
                id="avatar"
                type="url"
                value={formData.avatar}
                onChange={(e) => handleChange('avatar', e.target.value)}
                placeholder="Enter avatar URL (optional)"
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="form-section">
          <div className="section-header">
            <FiMapPin className="section-icon" />
            <h3>Address Information</h3>
          </div>
          
          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="street">Street Address</label>
              <input
                id="street"
                type="text"
                value={formData.address.street}
                onChange={(e) => handleChange('address.street', e.target.value)}
                placeholder="Enter street address"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                value={formData.address.city}
                onChange={(e) => handleChange('address.city', e.target.value)}
                placeholder="Enter city"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="zipcode">Zip Code</label>
              <input
                id="zipcode"
                type="text"
                value={formData.address.zipcode}
                onChange={(e) => handleChange('address.zipcode', e.target.value)}
                placeholder="Enter zip code"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lat">Latitude</label>
              <input
                id="lat"
                type="text"
                value={formData.address.geo.lat}
                onChange={(e) => handleChange('address.geo.lat', e.target.value)}
                placeholder="Enter latitude"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lng">Longitude</label>
              <input
                id="lng"
                type="text"
                value={formData.address.geo.lng}
                onChange={(e) => handleChange('address.geo.lng', e.target.value)}
                placeholder="Enter longitude"
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="submit"
            disabled={loading}
            className="btn primary"
          >
            {loading ? (
              <>
                <div className="loading-spinner" />
                Saving...
              </>
            ) : (
              <>
                <FiCheck />
                {submitText}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
