from rest_framework import serializers
from .models import Employee
from datetime import date

class EmployeeSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()
    age = serializers.ReadOnlyField()
    created_by_username = serializers.CharField(
        source='created_by.username',
        read_only=True
    )
    updated_by_username = serializers.CharField(
        source='updated_by.username',
        read_only=True
    )
    
    class Meta:
        model = Employee
        fields = [
            'id',
            'employee_id',
            'first_name',
            'last_name',
            'full_name',
            'email',
            'phone',
            'date_of_birth',
            'age',
            'gender',
            'address',
            'department',
            'position',
            'hire_date',
            'salary',
            'employment_status',
            'emergency_contact_name',
            'emergency_contact_phone',
            'emergency_contact_relationship',
            'profile_picture',
            'created_at',
            'updated_at',
            'created_by_username',
            'updated_by_username',
        ]
        read_only_fields = ['created_at', 'updated_at', 'created_by', 'updated_by']
    
    def validate_date_of_birth(self, value):
        """Validate that employee is at least 18 years old"""
        today = date.today()
        age = today.year - value.year - ((today.month, today.day) < (value.month, value.day))
        if age < 18:
            raise serializers.ValidationError("Employee must be at least 18 years old.")
        if age > 100:
            raise serializers.ValidationError("Invalid date of birth.")
        return value
    
    def validate_hire_date(self, value):
        """Validate hire date"""
        if value > date.today():
            raise serializers.ValidationError("Hire date cannot be in the future.")
        return value
    
    def validate_salary(self, value):
        """Validate salary is positive"""
        try:
            value = float(value)
        except (TypeError, ValueError):
            raise serializers.ValidationError("Salary must be a valid number.")
            
        if value <= 0:
            raise serializers.ValidationError("Salary must be greater than zero.")
        if value > 10000000:
            raise serializers.ValidationError("Salary seems unreasonably high. Please verify.")
        return value
    
    def validate_email(self, value):
        """Validate email uniqueness on update"""
        if self.instance:
            if Employee.objects.exclude(pk=self.instance.pk).filter(email=value).exists():
                raise serializers.ValidationError("An employee with this email already exists.")
        return value
    
    def validate_employee_id(self, value):
        """Validate employee ID format and uniqueness"""
        if not value.startswith('EMP'):
            raise serializers.ValidationError("Employee ID must start with 'EMP'.")
        if self.instance:
            if Employee.objects.exclude(pk=self.instance.pk).filter(employee_id=value).exists():
                raise serializers.ValidationError("An employee with this ID already exists.")
        return value


class EmployeeListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views"""
    full_name = serializers.ReadOnlyField()
    
    class Meta:
        model = Employee
        fields = [
            'id',
            'employee_id',
            'full_name',
            'email',
            'department',
            'position',
            'employment_status',
            'profile_picture',
        ]


class EmployeeCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer for create and update operations"""
    
    class Meta:
        model = Employee
        fields = [
            'employee_id',
            'first_name',
            'last_name',
            'email',
            'phone',
            'date_of_birth',
            'gender',
            'address',
            'department',
            'position',
            'hire_date',
            'salary',
            'employment_status',
            'emergency_contact_name',
            'emergency_contact_phone',
            'emergency_contact_relationship',
            'profile_picture',
        ]
    
    def validate(self, data):
        """Cross-field validation"""
        if 'hire_date' in data and 'date_of_birth' in data:
            if data['hire_date'] < data['date_of_birth']:
                raise serializers.ValidationError({
                    'hire_date': 'Hire date cannot be before date of birth.'
                })
        return data
