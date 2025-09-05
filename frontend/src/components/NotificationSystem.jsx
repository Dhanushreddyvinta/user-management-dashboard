import { useState, useEffect } from 'react'
import { FiCheckCircle, FiXCircle, FiInfo, FiX } from 'react-icons/fi'

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState([])

  const addNotification = (type, title, message, duration = 5000) => {
    const id = Date.now()
    const notification = { id, type, title, message }
    
    setNotifications(prev => [...prev, notification])
    
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  // Expose addNotification globally
  useEffect(() => {
    window.showNotification = addNotification
    return () => {
      delete window.showNotification
    }
  }, [])

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <FiCheckCircle className="notification-icon" style={{ color: '#10b981' }} />
      case 'error': return <FiXCircle className="notification-icon" style={{ color: '#dc2626' }} />
      case 'info': return <FiInfo className="notification-icon" style={{ color: '#2563eb' }} />
      default: return <FiInfo className="notification-icon" style={{ color: '#2563eb' }} />
    }
  }

  if (notifications.length === 0) return null

  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <div key={notification.id} className={`notification ${notification.type}`}>
          {getIcon(notification.type)}
          <div className="notification-content">
            <div className="notification-title">{notification.title}</div>
            <div className="notification-message">{notification.message}</div>
          </div>
          <button 
            className="notification-close"
            onClick={() => removeNotification(notification.id)}
          >
            <FiX />
          </button>
        </div>
      ))}
    </div>
  )
}
