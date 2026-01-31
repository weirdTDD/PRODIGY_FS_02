# Employee Management System

A full-stack web application for managing employee records with CRUD operations, authentication, and role-based access control.

## 🚀 Tech Stack

### Backend
- **Django 4.2** - Python web framework
- **Django REST Framework** - RESTful API development
- **JWT Authentication** - Secure token-based authentication
- **SQLite** - Database (easily switchable to PostgreSQL/MySQL)
- **Django CORS Headers** - Cross-origin resource sharing

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **React Toastify** - Toast notifications

## ✨ Features

### Authentication & Security
- ✅ JWT-based authentication with access and refresh tokens
- ✅ Protected routes requiring authentication
- ✅ Role-based access control (Admin-only CRUD operations)
- ✅ Automatic token refresh on expiration
- ✅ Secure password validation
- ✅ CORS configuration for secure API access

### Employee Management
- ✅ **Create** - Add new employees with comprehensive details
- ✅ **Read** - View all employees with pagination and filtering
- ✅ **Update** - Edit employee information
- ✅ **Delete** - Remove employees with confirmation
- ✅ Profile picture upload support
- ✅ Advanced search and filtering
- ✅ Department and status-based filtering
- ✅ Real-time validation

### Data Validation
- ✅ Email format validation
- ✅ Phone number validation
- ✅ Age validation (minimum 18 years)
- ✅ Hire date validation
- ✅ Salary range validation
- ✅ Employee ID format validation (EMP####)
- ✅ Server-side and client-side validation

### User Interface
- ✅ Responsive design for mobile, tablet, and desktop
- ✅ Modern, clean UI with Tailwind CSS
- ✅ Loading states and error handling
- ✅ Toast notifications for user feedback
- ✅ Confirmation modals for destructive actions
- ✅ Pagination for large datasets

## 📁 Project Structure

```
employee-management-system/
├── backend/
│   ├── employee_system/        # Django project settings
│   ├── employees/              # Employee app
│   │   ├── models.py          # Employee model
│   │   ├── serializers.py     # DRF serializers
│   │   ├── views.py           # API views
│   │   ├── urls.py            # URL routing
│   │   └── permissions.py     # Custom permissions
│   ├── authentication/         # Auth app
│   │   ├── views.py           # Login/logout views
│   │   ├── serializers.py     # Auth serializers
│   │   └── urls.py            # Auth URLs
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/          # Login, ProtectedRoute
│   │   │   ├── employees/     # Employee CRUD components
│   │   │   ├── layout/        # Header, Layout
│   │   │   └── common/        # Reusable components
│   │   ├── services/          # API services
│   │   ├── context/           # React Context
│   │   ├── hooks/             # Custom hooks
│   │   ├── utils/             # Utilities, validation
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── package.json
│   └── tailwind.config.js
│
└── docs/                       # Documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create superuser:**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start development server:**
   ```bash
   python manage.py runserver
   ```

Backend will run at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

Frontend will run at `http://localhost:3000`

## 🔐 Default Admin Credentials

After creating a superuser, use those credentials to log in.

Example:
- Username: `admin`
- Password: `admin123`

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login/` | User login | No |
| POST | `/api/auth/logout/` | User logout | Yes |
| POST | `/api/auth/register/` | Register new user | No |
| GET | `/api/auth/profile/` | Get user profile | Yes |
| POST | `/api/auth/token/refresh/` | Refresh access token | No |

### Employee Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/employees/` | List all employees | Yes |
| POST | `/api/employees/` | Create employee | Yes (Admin) |
| GET | `/api/employees/{id}/` | Get employee details | Yes |
| PUT | `/api/employees/{id}/` | Update employee | Yes (Admin) |
| PATCH | `/api/employees/{id}/` | Partial update | Yes (Admin) |
| DELETE | `/api/employees/{id}/` | Delete employee | Yes (Admin) |
| GET | `/api/employees/statistics/` | Get statistics | Yes |
| PATCH | `/api/employees/{id}/change_status/` | Change status | Yes (Admin) |

### Query Parameters

**Filtering:**
- `?department=IT` - Filter by department
- `?employment_status=ACTIVE` - Filter by status
- `?gender=M` - Filter by gender

**Search:**
- `?search=john` - Search in name, email, ID

**Pagination:**
- `?page=2` - Get specific page
- `?page_size=20` - Items per page

**Ordering:**
- `?ordering=first_name` - Order by field
- `?ordering=-hire_date` - Descending order

## 🧪 Testing

### Backend Tests
```bash
cd backend
python manage.py test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🔒 Security Features

1. **JWT Authentication** - Secure token-based authentication
2. **Password Hashing** - Django's built-in password hashing
3. **CORS Protection** - Configured allowed origins
4. **CSRF Protection** - Django CSRF middleware
5. **SQL Injection Prevention** - Django ORM
6. **XSS Protection** - React's built-in XSS prevention
7. **Input Validation** - Server and client-side validation
8. **Role-Based Access** - Admin-only CRUD operations

## 🎨 UI Features

- **Responsive Design** - Works on all screen sizes
- **Dark Mode Ready** - Easy to implement
- **Accessible** - ARIA labels and semantic HTML
- **Fast** - Optimized performance with Vite
- **Modern** - Latest React patterns and hooks

## 📝 Environment Variables

### Backend (.env)
```
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000/api
```

## 🚀 Deployment

### Backend (Django)
1. Set `DEBUG=False` in production
2. Configure `ALLOWED_HOSTS`
3. Use PostgreSQL/MySQL in production
4. Set up static files serving
5. Use gunicorn or uwsgi
6. Configure HTTPS

### Frontend (React)
1. Build production bundle: `npm run build`
2. Deploy to Vercel, Netlify, or any static hosting
3. Configure environment variables
4. Set up CDN for assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For issues and questions:
- Open an issue on GitHub
- Check documentation in `/docs`
- Review API documentation

## 🎯 Future Enhancements

- [ ] Advanced reporting and analytics
- [ ] Export to PDF/Excel
- [ ] Email notifications
- [ ] Audit logs
- [ ] Multi-factor authentication
- [ ] Department hierarchies
- [ ] Performance reviews module
- [ ] Leave management
- [ ] Attendance tracking
- [ ] Payroll integration

## ⚙️ Configuration

See `/docs/SETUP_GUIDE.md` for detailed configuration options.

## 📊 Database Schema

See `/docs/ARCHITECTURE.md` for detailed database schema documentation.

---

Built with ❤️ using Django REST Framework and React
