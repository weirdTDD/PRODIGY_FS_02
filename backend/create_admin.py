import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'employee_system.settings')
django.setup()

from django.contrib.auth.models import User

admin = User.objects.filter(username='admin').first()
if admin:
    print('Admin user already exists')
else:
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
  #  print('Created admin user with username: admin, password: admin123')