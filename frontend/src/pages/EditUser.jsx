import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api'
import toast from 'react-hot-toast'

export default function EditUser() {
  const { id } = useParams()
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api.get(`/users/${id}`).then(res => {
      setForm(res.data)
      setLoading(false)
    })
  }, [id])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await api.put(`/users/${id}`, form)
      toast.success('User updated')
      navigate('/dashboard')
    } catch (err) {
      toast.error('Failed to update user')
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="container">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit} className="card grid cols-2">
        <div><label>Name</label><input name="name" value={form.name || ''} onChange={handleChange} /></div>
        <div><label>Email</label><input name="email" value={form.email || ''} onChange={handleChange} /></div>
        <div><label>Phone</label><input name="phone" value={form.phone || ''} onChange={handleChange} /></div>
        <div><label>Company</label><input name="company" value={form.company || ''} onChange={handleChange} /></div>
        <div><label>City</label><input name="city" value={form.address?.city || ''} onChange={handleChange} /></div>
        <div>
          <label>Role</label>
          <select name="role" value={form.role || 'User'} onChange={handleChange}>
            <option>User</option><option>Manager</option><option>Admin</option>
          </select>
        </div>
        <button className="btn" type="submit">Save</button>
      </form>
    </div>
  )
}
