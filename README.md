# User Management Dashboard (MERN)

A comprehensive full-stack user management system with advanced features including analytics, bulk operations, data export, and responsive design.

## 🚀 Features

### Core Functionality
- ✅ **CRUD Operations**: Create, Read, Update, Delete users
- ✅ **Advanced Search & Filtering**: Multi-field search with role, company, city, and date filters
- ✅ **Data Export**: Export user data to CSV and PDF formats
- ✅ **Bulk Operations**: Select multiple users for bulk delete and updates
- ✅ **Analytics Dashboard**: Interactive charts showing user statistics and trends

### UI/UX Features
- ✅ **Responsive Design**: Mobile-first approach with adaptive layouts
- ✅ **Dark/Light Theme**: Toggle between themes with persistent preference
- ✅ **Real-time Validation**: Advanced form validation with visual feedback
- ✅ **Notifications**: Toast notifications and custom notification system
- ✅ **Loading States**: Smooth loading indicators and error handling

### Technical Features
- ✅ **Pagination**: Efficient data loading with pagination controls
- ✅ **Sorting**: Sort users by various fields
- ✅ **Role-based System**: Admin, Manager, and User roles
- ✅ **Real-time Updates**: Hot module replacement for development

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **React Router** for client-side routing
- **Axios** for API communication
- **React Hot Toast** for notifications
- **React Icons** for consistent iconography
- **Recharts** for data visualization
- **jsPDF** for PDF generation
- **Custom CSS** with CSS variables for theming

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **Express Validator** for input validation
- **CORS** for cross-origin requests
- **dotenv** for environment configuration

## 📁 Project Structure
```
user-management-dashboard/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── AdvancedSearch.jsx
    │   │   ├── Analytics.jsx
    │   │   ├── BulkActions.jsx
    │   │   ├── ExportData.jsx
    │   │   ├── ResponsiveTable.jsx
    │   │   ├── ThemeToggle.jsx
    │   │   ├── NotificationSystem.jsx
    │   │   └── UserForm.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── AddUser.jsx
    │   │   ├── EditUser.jsx
    │   │   └── ViewUser.jsx
    │   ├── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── styles.css
    ├── index.html
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### 1) Clone the Repository
```bash
git clone <your-repo-url>
cd user-management-dashboard
```

### 2) Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your MongoDB URI in .env
npm start
```
Backend runs at `http://localhost:8080`

### 3) Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5175`

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/user-management
FRONTEND_URL=http://localhost:5175
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8080/api
```

## 📊 API Endpoints

### Users
- `GET /api/users` - Get all users with pagination
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Health Check
- `GET /api/health` - Server health status

## 🎨 Component Overview

### Dashboard Components
- **AdvancedSearch**: Multi-field search and filtering
- **Analytics**: Charts and statistics visualization
- **BulkActions**: Multi-select operations
- **ExportData**: CSV and PDF export functionality
- **ResponsiveTable**: Adaptive table/card layout
- **ThemeToggle**: Dark/light mode switcher
- **NotificationSystem**: Global notification management

### Form Components
- **UserForm**: Advanced form with real-time validation
- **Validation**: Client and server-side validation

## 🔒 User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String (required),
  company: String (required),
  address: {
    street: String,
    city: String,
    zipcode: String,
    geo: { lat: String, lng: String }
  },
  role: String (Admin/Manager/User),
  avatar: String,
  createdAt: Date
}
```

## 🚀 Deployment

### GitHub Pages (Automatic)
The project is configured for automatic deployment to GitHub Pages using GitHub Actions:

1. **Push to main branch** - The workflow automatically triggers on push to `main` or `master` branch
2. **Automatic build** - GitHub Actions builds the React app using Vite
3. **Deploy to Pages** - The built files are automatically deployed to GitHub Pages

**Live URL**: `https://yourusername.github.io/user-management-dashboard/`

### Manual Deployment
You can also deploy manually using the gh-pages package:

```bash
cd frontend
npm install
npm run deploy
```

### Setup Instructions
1. Go to your GitHub repository settings
2. Navigate to **Pages** section
3. Set **Source** to "GitHub Actions"
4. The site will be available at `https://yourusername.github.io/user-management-dashboard/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the flexible database
- Recharts for beautiful data visualization
- React Icons for comprehensive icon library
