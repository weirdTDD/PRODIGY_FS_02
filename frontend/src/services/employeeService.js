import api from './api';

const employeeService = {
  // Get all employees with optional filters
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/employees/', { params });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Failed to fetch employees',
      };
    }
  },

  // Get single employee by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/employees/${id}/`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Failed to fetch employee details',
      };
    }
  },

  // Create new employee
  create: async (employeeData) => {
    try {
      const formData = new FormData();
      
      // Append all fields to FormData
      Object.keys(employeeData).forEach((key) => {
        if (employeeData[key] !== null && employeeData[key] !== undefined) {
          if (key === 'profile_picture' && employeeData[key] instanceof File) {
            formData.append(key, employeeData[key]);
          } else {
            formData.append(key, employeeData[key]);
          }
        }
      });

      const response = await api.post('/employees/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Failed to create employee',
      };
    }
  },

  // Update employee
  update: async (id, employeeData) => {
    try {
      const formData = new FormData();
      
      Object.keys(employeeData).forEach((key) => {
        if (employeeData[key] !== null && employeeData[key] !== undefined) {
          if (key === 'profile_picture' && employeeData[key] instanceof File) {
            formData.append(key, employeeData[key]);
          } else {
            formData.append(key, employeeData[key]);
          }
        }
      });

      const response = await api.put(`/employees/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Failed to update employee',
      };
    }
  },

  // Partial update
  partialUpdate: async (id, employeeData) => {
    try {
      const response = await api.patch(`/employees/${id}/`, employeeData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Failed to update employee',
      };
    }
  },

  // Delete employee
  delete: async (id) => {
    try {
      const response = await api.delete(`/employees/${id}/`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Failed to delete employee',
      };
    }
  },

  // Get statistics
  getStatistics: async () => {
    try {
      const response = await api.get('/employees/statistics/');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Failed to fetch statistics',
      };
    }
  },

  // Change employee status
  changeStatus: async (id, status) => {
    try {
      const response = await api.patch(`/employees/${id}/change_status/`, {
        employment_status: status,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Failed to change status',
      };
    }
  },

  // Advanced search
  search: async (query, filters = {}) => {
    try {
      const params = { q: query, ...filters };
      const response = await api.get('/employees/search_advanced/', { params });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Search failed',
      };
    }
  },
};

export default employeeService;
