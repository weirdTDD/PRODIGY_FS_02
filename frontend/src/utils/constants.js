export const DEPARTMENTS = [
  { value: 'HR', label: 'Human Resources' },
  { value: 'IT', label: 'Information Technology' },
  { value: 'FIN', label: 'Finance' },
  { value: 'MKT', label: 'Marketing' },
  { value: 'OPS', label: 'Operations' },
  { value: 'SALES', label: 'Sales' },
  { value: 'ENG', label: 'Engineering' },
];

export const EMPLOYMENT_STATUS = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'ON_LEAVE', label: 'On Leave' },
  { value: 'TERMINATED', label: 'Terminated' },
];

export const GENDER = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
  { value: 'O', label: 'Other' },
];

export const STATUS_COLORS = {
  ACTIVE: 'bg-green-100 text-green-800',
  INACTIVE: 'bg-gray-100 text-gray-800',
  ON_LEAVE: 'bg-yellow-100 text-yellow-800',
  TERMINATED: 'bg-red-100 text-red-800',
};

export const DEPARTMENT_COLORS = {
  HR: 'bg-purple-100 text-purple-800',
  IT: 'bg-blue-100 text-blue-800',
  FIN: 'bg-green-100 text-green-800',
  MKT: 'bg-pink-100 text-pink-800',
  OPS: 'bg-orange-100 text-orange-800',
  SALES: 'bg-indigo-100 text-indigo-800',
  ENG: 'bg-teal-100 text-teal-800',
};

export const API_MESSAGES = {
  CREATE_SUCCESS: 'Employee created successfully',
  UPDATE_SUCCESS: 'Employee updated successfully',
  DELETE_SUCCESS: 'Employee deleted successfully',
  FETCH_ERROR: 'Failed to fetch employee data',
  NETWORK_ERROR: 'Network error. Please check your connection.',
};
