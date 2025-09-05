import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import toast from 'react-hot-toast'

export default function AddUser() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', city: '', role: 'User' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/users', {
        ...form,
        address: { city: form.city }
      })
      alert('User created')
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.message || 'Failed to create user')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit} className="card grid cols-2">
        <div>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} required />
        </div>
        <div>
          <label>Company</label>
          <input name="company" value={form.company} onChange={handleChange} required />
        </div>
        <div>
          <label>City</label>
          <input name="city" value={form.city} onChange={handleChange} />
        </div>
        <div>
          <label>Role</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option>User</option>
            <option>Manager</option>
            <option>Admin</option>
          </select>
        </div>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  )
}
