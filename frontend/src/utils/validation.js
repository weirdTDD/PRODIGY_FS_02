export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^\+?1?\d{9,15}$/;
  return re.test(phone.replace(/[\s-]/g, ''));
};

export const validateEmployeeId = (employeeId) => {
  const re = /^EMP\d{4,}$/;
  return re.test(employeeId);
};

export const validateDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

export const validateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age >= 18 && age <= 100;
};

export const validateSalary = (salary) => {
  const salaryNum = parseFloat(salary);
  return !isNaN(salaryNum) && salaryNum > 0 && salaryNum <= 10000000;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const validateForm = (formData, requiredFields) => {
  const errors = {};
  
  requiredFields.forEach((field) => {
    if (!formData[field] || formData[field].toString().trim() === '') {
      errors[field] = `${field.replace(/_/g, ' ')} is required`;
    }
  });
  
  // Email validation
  if (formData.email && !validateEmail(formData.email)) {
    errors.email = 'Invalid email format';
  }
  
  // Phone validation
  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Invalid phone number format';
  }
  
  // Employee ID validation
  if (formData.employee_id && !validateEmployeeId(formData.employee_id)) {
    errors.employee_id = 'Employee ID must be in format: EMP0001';
  }
  
  // Date of birth validation
  if (formData.date_of_birth && !validateAge(formData.date_of_birth)) {
    errors.date_of_birth = 'Employee must be between 18 and 100 years old';
  }
  
  // Hire date validation
  if (formData.hire_date) {
    const hireDate = new Date(formData.hire_date);
    if (hireDate > new Date()) {
      errors.hire_date = 'Hire date cannot be in the future';
    }
  }
  
  // Salary validation
  if (formData.salary && !validateSalary(formData.salary)) {
    errors.salary = 'Invalid salary amount';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
