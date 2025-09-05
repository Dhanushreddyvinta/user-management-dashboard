import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const active = ({ isActive }) => ({
    backgroundColor: isActive ? '#1f2937' : 'transparent'
  })
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/dashboard" className="brand">User Management</Link>
        <div>
          <NavLink to="/dashboard" style={active}>Dashboard</NavLink>
          <NavLink to="/add" style={active}>Add User</NavLink>
          <a href="https://example.com" target="_blank" rel="noreferrer">Docs</a>
        </div>
      </div>
    </nav>
  )
}
