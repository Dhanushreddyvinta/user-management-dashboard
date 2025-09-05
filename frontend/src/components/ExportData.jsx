import { FiDownload, FiFileText, FiFile } from 'react-icons/fi'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default function ExportData({ users, filteredUsers }) {
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Company', 'Role', 'City', 'Created At']
    const csvContent = [
      headers.join(','),
      ...filteredUsers.map(user => [
        `"${user.name}"`,
        `"${user.email}"`,
        `"${user.phone}"`,
        `"${user.company}"`,
        `"${user.role}"`,
        `"${user.address?.city || ''}"`,
        `"${new Date(user.createdAt).toLocaleDateString()}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `users_export_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    
    // Add title
    doc.setFontSize(20)
    doc.text('User Management Report', 14, 22)
    
    // Add metadata
    doc.setFontSize(12)
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 32)
    doc.text(`Total Users: ${filteredUsers.length}`, 14, 40)
    
    // Prepare table data
    const tableData = filteredUsers.map(user => [
      user.name,
      user.email,
      user.phone,
      user.company,
      user.role,
      user.address?.city || '',
      new Date(user.createdAt).toLocaleDateString()
    ])

    // Add table
    doc.autoTable({
      head: [['Name', 'Email', 'Phone', 'Company', 'Role', 'City', 'Created']],
      body: tableData,
      startY: 50,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [37, 99, 235] },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    })

    doc.save(`users_report_${new Date().toISOString().split('T')[0]}.pdf`)
  }

  return (
    <div className="export-data">
      <div className="export-buttons">
        <button className="btn secondary export-btn" onClick={exportToCSV}>
          <FiFile />
          Export CSV
        </button>
        <button className="btn secondary export-btn" onClick={exportToPDF}>
          <FiFileText />
          Export PDF
        </button>
      </div>
      <span className="export-info">
        {filteredUsers.length} of {users.length} users
      </span>
    </div>
  )
}
