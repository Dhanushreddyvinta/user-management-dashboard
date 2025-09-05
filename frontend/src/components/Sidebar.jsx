import { Link, useNavigate } from 'react-router-dom'
import { 
  FiHome, 
  FiUsers, 
  FiUserPlus, 
  FiBarChart, 
  FiSettings, 
  FiBook 
} from 'react-icons/fi'

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link to="/dashboard" className="brand">
          <FiBarChart className="brand-icon" />
          User Management
        </Link>
      </div>
      
      <nav className="sidebar-nav">
        <button onClick={() => navigate('/dashboard')} className="nav-item">
          <FiHome className="nav-icon" />
          Dashboard
        </button>
        
        <button onClick={() => navigate('/users')} className="nav-item">
          <FiUsers className="nav-icon" />
          Users
        </button>
        
        <button onClick={() => navigate('/add')} className="nav-item">
          <FiUserPlus className="nav-icon" />
          Add User
        </button>
        
        <button onClick={() => navigate('/settings')} className="nav-item">
          <FiSettings className="nav-icon" />
          Settings
        </button>
        
        <a href="https://example.com" target="_blank" rel="noreferrer" className="nav-item">
          <FiBook className="nav-icon" />
          Docs
        </a>
      </nav>
    </aside>
  )
}
