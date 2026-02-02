import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import employeeService from '../../services/employeeService';
import { toast } from 'react-toastify';
import { DEPARTMENTS, EMPLOYMENT_STATUS, GENDER } from '../../utils/constants';
import { validateForm } from '../../utils/validation';

const EmployeeForm = ({ mode = 'create' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    employee_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    gender: 'M',
    address: '',
    department: 'IT',
    position: '',
    hire_date: '',
    salary: '',
    employment_status: 'ACTIVE',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    emergency_contact_relationship: '',
    profile_picture: null,
  });

  useEffect(() => {
    if (mode === 'edit' && id) {
      fetchEmployee();
    }
  }, [id, mode]);

  const fetchEmployee = async () => {
    const result = await employeeService.getById(id);
    if (result.success) {
      setFormData({ ...result.data, profile_picture: null });
    } else {
      toast.error('Failed to load employee data');
      navigate('/');
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile_picture') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const requiredFields = [
      'employee_id', 'first_name', 'last_name', 'email', 'phone',
      'date_of_birth', 'gender', 'address', 'department', 'position',
      'hire_date', 'salary', 'emergency_contact_name', 'emergency_contact_phone'
    ];
    
    const validation = validateForm(formData, requiredFields);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      toast.error('Please fix the validation errors');
      return;
    }

    setLoading(true);
    setErrors({});

    const result = mode === 'create'
      ? await employeeService.create(formData)
      : await employeeService.update(id, formData);

    if (result.success) {
      toast.success(`Employee ${mode === 'create' ? 'created' : 'updated'} successfully`);
      navigate('/');
    } else {
      if (typeof result.error === 'object') {
        setErrors(result.error);
      }
      toast.error(result.error?.detail || 'Operation failed');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          {mode === 'create' ? 'Add New Employee' : 'Edit Employee'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-6">
        {/* Personal Information */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Employee ID *</label>
              <input
                type="text"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                className="input-field"
                placeholder="EMP0001"
                disabled={mode === 'edit'}
              />
              {errors.employee_id && <p className="text-red-500 text-sm mt-1">{errors.employee_id}</p>}
            </div>

            <div>
              <label className="label">First Name *</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="input-field"
              />
              {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
            </div>

            <div>
              <label className="label">Last Name *</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="input-field"
              />
              {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
            </div>

            <div>
              <label className="label">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="label">Phone *</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-field"
                placeholder="+1234567890"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="label">Date of Birth *</label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="input-field"
              />
              {errors.date_of_birth && <p className="text-red-500 text-sm mt-1">{errors.date_of_birth}</p>}
            </div>

            <div>
              <label className="label">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input-field"
              >
                {GENDER.map(g => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="label">Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="input-field"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="label">Profile Picture</label>
              <input
                type="file"
                name="profile_picture"
                onChange={handleChange}
                accept="image/*"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Employment Information */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Employment Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Department *</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="input-field"
              >
                {DEPARTMENTS.map(d => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Position *</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="input-field"
              />
              {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
            </div>

            <div>
              <label className="label">Hire Date *</label>
              <input
                type="date"
                name="hire_date"
                value={formData.hire_date}
                onChange={handleChange}
                className="input-field"
              />
              {errors.hire_date && <p className="text-red-500 text-sm mt-1">{errors.hire_date}</p>}
            </div>

            <div>
              <label className="label">Salary *</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="input-field"
                step="0.01"
              />
              {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary}</p>}
            </div>

            <div>
              <label className="label">Employment Status</label>
              <select
                name="employment_status"
                value={formData.employment_status}
                onChange={handleChange}
                className="input-field"
              >
                {EMPLOYMENT_STATUS.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Contact Name *</label>
              <input
                type="text"
                name="emergency_contact_name"
                value={formData.emergency_contact_name}
                onChange={handleChange}
                className="input-field"
              />
              {errors.emergency_contact_name && <p className="text-red-500 text-sm mt-1">{errors.emergency_contact_name}</p>}
            </div>

            <div>
              <label className="label">Contact Phone *</label>
              <input
                type="text"
                name="emergency_contact_phone"
                value={formData.emergency_contact_phone}
                onChange={handleChange}
                className="input-field"
              />
              {errors.emergency_contact_phone && <p className="text-red-500 text-sm mt-1">{errors.emergency_contact_phone}</p>}
            </div>

            <div>
              <label className="label">Relationship</label>
              <input
                type="text"
                name="emergency_contact_relationship"
                value={formData.emergency_contact_relationship}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : mode === 'create' ? 'Create Employee' : 'Update Employee'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
