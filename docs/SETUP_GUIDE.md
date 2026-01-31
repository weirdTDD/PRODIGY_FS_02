# Setup Guide - Employee Management System

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Database Configuration](#database-configuration)
5. [Environment Variables](#environment-variables)
6. [Running the Application](#running-the-application)
7. [Troubleshooting](#troubleshooting)

## System Requirements

### Required Software
- **Python:** 3.8 or higher
- **Node.js:** 16.x or higher
- **npm:** 8.x or higher (comes with Node.js)
- **Git:** Latest version
- **Code Editor:** VS Code, PyCharm, or similar

### Optional
- **PostgreSQL:** 12+ (for production)
- **Redis:** For caching (future enhancement)

## Backend Setup

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd employee-management-system/backend
```

### Step 2: Create Virtual Environment

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**On Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

### Step 3: Install Python Dependencies
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### Step 4: Configure Environment Variables
Create a `.env` file in the backend directory:

```bash
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database (SQLite - default)
# DATABASE_URL=sqlite:///db.sqlite3

# Database (PostgreSQL - production)
# DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

**Generate Secret Key:**
```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Step 5: Initialize Database
```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

Follow the prompts to create your admin account.

### Step 6: Create Initial Data (Optional)
```bash
python manage.py shell
```

Then in the Python shell:
```python
from django.contrib.auth.models import User
from employees.models import Employee

# Create sample employee
employee = Employee.objects.create(
    employee_id='EMP0001',
    first_name='John',
    last_name='Doe',
    email='john.doe@example.com',
    phone='+1234567890',
    date_of_birth='1990-01-01',
    gender='M',
    address='123 Main St, City, State',
    department='IT',
    position='Software Engineer',
    hire_date='2024-01-01',
    salary=75000.00,
    employment_status='ACTIVE',
    emergency_contact_name='Jane Doe',
    emergency_contact_phone='+1234567891',
    emergency_contact_relationship='Spouse'
)
```

### Step 7: Run Development Server
```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

## Frontend Setup

### Step 1: Navigate to Frontend Directory
```bash
cd ../frontend
```

### Step 2: Install Node Dependencies
```bash
npm install
```

If you encounter any errors, try:
```bash
npm install --legacy-peer-deps
```

### Step 3: Configure Environment Variables
Create a `.env` file in the frontend directory:

```bash
VITE_API_URL=http://localhost:8000/api
```

### Step 4: Run Development Server
```bash
npm run dev
```

The frontend application will be available at `http://localhost:3000`

## Database Configuration

### SQLite (Development - Default)
SQLite is configured by default. No additional setup required.

### PostgreSQL (Production)

1. **Install PostgreSQL:**
   ```bash
   # macOS
   brew install postgresql

   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib

   # Windows
   # Download from https://www.postgresql.org/download/windows/
   ```

2. **Create Database:**
   ```bash
   psql postgres
   CREATE DATABASE employee_db;
   CREATE USER employee_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE employee_db TO employee_user;
   \q
   ```

3. **Update Django Settings:**
   In `backend/employee_system/settings.py`:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'employee_db',
           'USER': 'employee_user',
           'PASSWORD': 'your_password',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```

4. **Install psycopg2:**
   ```bash
   pip install psycopg2-binary
   ```

5. **Run Migrations:**
   ```bash
   python manage.py migrate
   ```

## Environment Variables

### Backend Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| SECRET_KEY | Django secret key | - | Yes |
| DEBUG | Debug mode | False | Yes |
| ALLOWED_HOSTS | Allowed hosts | localhost | Yes |
| DATABASE_URL | Database connection | sqlite | No |
| CORS_ALLOWED_ORIGINS | CORS origins | http://localhost:3000 | No |

### Frontend Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| VITE_API_URL | Backend API URL | http://localhost:8000/api | Yes |

## Running the Application

### Development Mode

1. **Start Backend:**
   ```bash
   cd backend
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   python manage.py runserver
   ```

2. **Start Frontend (in another terminal):**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access Application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Admin Panel: http://localhost:8000/admin

### Production Mode

1. **Build Frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Collect Static Files:**
   ```bash
   cd backend
   python manage.py collectstatic
   ```

3. **Run with Gunicorn:**
   ```bash
   pip install gunicorn
   gunicorn employee_system.wsgi:application --bind 0.0.0.0:8000
   ```

## Troubleshooting

### Common Backend Issues

**Issue: "ModuleNotFoundError: No module named 'X'"**
```bash
pip install -r requirements.txt
```

**Issue: "django.db.utils.OperationalError"**
```bash
python manage.py migrate
```

**Issue: "CORS errors"**
- Check CORS_ALLOWED_ORIGINS in settings.py
- Ensure frontend URL is included

**Issue: "Permission denied for database"**
```bash
# PostgreSQL
GRANT ALL PRIVILEGES ON DATABASE employee_db TO employee_user;
```

### Common Frontend Issues

**Issue: "Cannot find module"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Issue: "Port 3000 is already in use"**
```bash
# Kill process on port 3000
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Issue: "Network Error"**
- Check backend is running on port 8000
- Verify VITE_API_URL in .env
- Check CORS configuration

### Database Migration Issues

**Reset migrations:**
```bash
# Delete db.sqlite3
rm db.sqlite3

# Delete migration files
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc" -delete

# Recreate migrations
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### Performance Issues

**Backend optimization:**
```python
# Add database indexes in models.py
class Meta:
    indexes = [
        models.Index(fields=['employee_id']),
        models.Index(fields=['email']),
    ]
```

**Frontend optimization:**
```bash
# Analyze bundle size
npm run build -- --analyze
```

## Testing

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

### API Testing with cURL

**Login:**
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

**Get Employees:**
```bash
curl -X GET http://localhost:8000/api/employees/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## IDE Setup

### VS Code Extensions
- Python
- Pylance
- Django
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- GitLens

### PyCharm Configuration
1. Set Python interpreter to virtual environment
2. Enable Django support
3. Configure code style for Python and JavaScript

## Docker Setup (Optional)

### Dockerfile for Backend
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "employee_system.wsgi:application", "--bind", "0.0.0.0:8000"]
```

### Dockerfile for Frontend
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "preview"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DEBUG=False
    volumes:
      - ./backend:/app
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

## Support

If you encounter any issues not covered here:
1. Check the main README.md
2. Review the API documentation
3. Check Django and React documentation
4. Open an issue on GitHub

---

Last Updated: 2024
