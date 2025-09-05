import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

// Date utility functions
const format = (date, formatStr) => {
  const d = new Date(date)
  if (formatStr === 'MMM dd') {
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
  }
  return d.toLocaleDateString()
}

const subDays = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() - days)
  return result
}

const startOfDay = (date) => {
  const result = new Date(date)
  result.setHours(0, 0, 0, 0)
  return result
}

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

export default function Analytics({ users }) {
  // Role distribution
  const roleData = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1
    return acc
  }, {})
  
  const roleChartData = Object.entries(roleData).map(([role, count]) => ({
    name: role,
    value: count
  }))

  // Company distribution (top 6)
  const companyData = users.reduce((acc, user) => {
    acc[user.company] = (acc[user.company] || 0) + 1
    return acc
  }, {})
  
  const companyChartData = Object.entries(companyData)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 6)
    .map(([company, count]) => ({
      name: company.length > 15 ? company.substring(0, 15) + '...' : company,
      users: count
    }))

  // City distribution (top 8)
  const cityData = users.reduce((acc, user) => {
    const city = user.address?.city || 'Unknown'
    acc[city] = (acc[city] || 0) + 1
    return acc
  }, {})
  
  const cityChartData = Object.entries(cityData)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 8)
    .map(([city, count]) => ({
      name: city,
      users: count
    }))

  // User registration trend (last 30 days)
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = startOfDay(subDays(new Date(), 29 - i))
    const count = users.filter(user => {
      const userDate = startOfDay(new Date(user.createdAt))
      return userDate.getTime() === date.getTime()
    }).length
    
    return {
      date: format(date, 'MMM dd'),
      users: count
    }
  })

  const totalUsers = users.length
  const activeUsers = users.filter(u => u.role !== 'Inactive').length
  const totalCompanies = new Set(users.map(u => u.company)).size
  const totalCities = new Set(users.map(u => u.address?.city)).size

  return (
    <div className="analytics-dashboard">
      <div className="analytics-header">
        <h2>📊 Analytics Dashboard</h2>
        <p>Comprehensive insights into your user data</p>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <h3>{totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">✅</div>
          <div className="metric-content">
            <h3>{activeUsers}</h3>
            <p>Active Users</p>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">🏢</div>
          <div className="metric-content">
            <h3>{totalCompanies}</h3>
            <p>Companies</p>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">🌆</div>
          <div className="metric-content">
            <h3>{totalCities}</h3>
            <p>Cities</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Role Distribution */}
        <div className="chart-card">
          <h3>User Roles Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={roleChartData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {roleChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="chart-legend">
            {roleChartData.map((entry, index) => (
              <div key={entry.name} className="legend-item">
                <div 
                  className="legend-color" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span>{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Company Distribution */}
        <div className="chart-card">
          <h3>Top Companies</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={companyChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* City Distribution */}
        <div className="chart-card">
          <h3>Users by City</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cityChartData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={80} fontSize={12} />
              <Tooltip />
              <Bar dataKey="users" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Registration Trend */}
        <div className="chart-card full-width">
          <h3>User Registration Trend (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={last30Days}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={{ fill: '#8b5cf6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
