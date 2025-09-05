import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'

export default function ViewUser() {
  const { id } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    api.get(`/users/${id}`).then(res => setUser(res.data))
  }, [id])

  if (!user) return <p>Loading...</p>

  return (
    <div className="container card">
      <h2>{user.name}</h2>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Phone:</b> {user.phone}</p>
      <p><b>Company:</b> {user.company}</p>
      <p><b>City:</b> {user.address?.city}</p>
      <p><b>Role:</b> {user.role}</p>
    </div>
  )
}
