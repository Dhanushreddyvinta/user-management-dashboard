import { Link } from 'react-router-dom'

export default function UserList({ users, onDelete }) {
  return (
    <div className="card">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
        <h2 style={{margin:0}}>Users</h2>
        <span className="badge">{users.length} total</span>
      </div>
      <div style={{overflowX:'auto'}}>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.company}</td>
                <td>{u.address?.city || '-'}</td>
                <td className="actions">
                  <Link className="btn secondary" to={`/view/${u._id}`}>View</Link>
                  <Link className="btn" to={`/edit/${u._id}`}>Edit</Link>
                  <button className="btn danger" onClick={() => onDelete(u._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody> */}
          <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td data-label="Name">{u.name}</td>
              <td data-label="Email">{u.email}</td>
              <td data-label="Phone">{u.phone}</td>
              <td data-label="Company">{u.company}</td>
              <td data-label="City">{u.address?.city || '-'}</td>
              <td data-label="Actions" className="actions">
                <Link className="btn secondary" to={`/view/${u._id}`}>View</Link>
                <Link className="btn" to={`/edit/${u._id}`}>Edit</Link>
                <button className="btn danger" onClick={() => onDelete(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
