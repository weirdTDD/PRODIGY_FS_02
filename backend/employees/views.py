from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Employee
from .serializers import (
    EmployeeSerializer,
    EmployeeListSerializer,
    EmployeeCreateUpdateSerializer
)
from .permissions import IsAdminUser

class EmployeeViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing employee CRUD operations.
    
    list: Get list of all employees (with pagination and filtering)
    create: Create a new employee (admin only)
    retrieve: Get details of a specific employee
    update: Update an employee (admin only)
    partial_update: Partially update an employee (admin only)
    destroy: Delete an employee (admin only)
    """
    queryset = Employee.objects.all()
    permission_classes = [IsAuthenticated, IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['department', 'employment_status', 'gender']
    search_fields = ['employee_id', 'first_name', 'last_name', 'email', 'position']
    ordering_fields = ['employee_id', 'first_name', 'last_name', 'hire_date', 'salary']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'list':
            return EmployeeListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return EmployeeCreateUpdateSerializer
        return EmployeeSerializer
    
    def perform_create(self, serializer):
        """Set the created_by field to current user"""
        try:
            serializer.save(created_by=self.request.user)
        except Exception as e:
            print(f"Error creating employee: {str(e)}")
            raise
    
    def perform_update(self, serializer):
        """Set the updated_by field to current user"""
        serializer.save(updated_by=self.request.user)
    
    def destroy(self, request, *args, **kwargs):
        """Custom delete with proper response"""
        instance = self.get_object()
        employee_id = instance.employee_id
        self.perform_destroy(instance)
        return Response(
            {'message': f'Employee {employee_id} has been successfully deleted.'},
            status=status.HTTP_200_OK
        )
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get employee statistics"""
        total_employees = Employee.objects.count()
        active_employees = Employee.objects.filter(employment_status='ACTIVE').count()
        
        department_counts = {}
        for dept_code, dept_name in Employee.DEPARTMENT_CHOICES:
            count = Employee.objects.filter(department=dept_code).count()
            if count > 0:
                department_counts[dept_name] = count
        
        return Response({
            'total_employees': total_employees,
            'active_employees': active_employees,
            'inactive_employees': total_employees - active_employees,
            'department_distribution': department_counts,
        })
    
    @action(detail=True, methods=['patch'])
    def change_status(self, request, pk=None):
        """Change employment status of an employee"""
        employee = self.get_object()
        new_status = request.data.get('employment_status')
        
        if not new_status:
            return Response(
                {'error': 'employment_status is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if new_status not in dict(Employee.EMPLOYMENT_STATUS_CHOICES):
            return Response(
                {'error': 'Invalid employment status'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        employee.employment_status = new_status
        employee.updated_by = request.user
        employee.save()
        
        serializer = self.get_serializer(employee)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def search_advanced(self, request):
        """Advanced search with multiple criteria"""
        query = request.query_params.get('q', '')
        department = request.query_params.get('department', '')
        status_filter = request.query_params.get('status', '')
        
        queryset = self.queryset
        
        if query:
            queryset = queryset.filter(
                Q(employee_id__icontains=query) |
                Q(first_name__icontains=query) |
                Q(last_name__icontains=query) |
                Q(email__icontains=query) |
                Q(position__icontains=query)
            )
        
        if department:
            queryset = queryset.filter(department=department)
        
        if status_filter:
            queryset = queryset.filter(employment_status=status_filter)
        
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = EmployeeListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = EmployeeListSerializer(queryset, many=True)
        return Response(serializer.data)
