import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useAppContext } from '../AppContext';

const MemberForm = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAppContext(); // Using context to handle global state

  const refreshToken = async () => {
    try {
      const oldToken = localStorage.getItem('jwt_token');
      const response = await axios.post('http://localhost:5000/api/auth/refresh-token', { token: oldToken });
      localStorage.setItem('jwt_token', response.data.token);
    } catch (error) {
      console.error('Token refresh failed:', error);
      // Handle token refresh failure (e.g., redirect to login)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('middleName', middleName);
    formData.append('lastName', lastName);
    formData.append('idNumber', idNumber);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('photo', photo);

    let formErrors = {};
    if (!firstName) formErrors.firstName = 'First name is required';
    if (!lastName) formErrors.lastName = 'Last name is required';
    if (!idNumber) formErrors.idNumber = 'ID number is required';
    if (!dateOfBirth) formErrors.dateOfBirth = 'Date of birth is required';
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
      return;
    }

    setErrors({});
    
    try {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        console.error('Token not found');
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      const res = await axios.post('http://localhost:5000/api/members', formData, config);
      console.log('Add member response:', res.data);
      dispatch({ type: 'ADD_MEMBER', payload: res.data });
      setFirstName('');
      setMiddleName('');
      setLastName('');
      setIdNumber('');
      setDateOfBirth('');
      setPhoto(null);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        await refreshToken();
        handleSubmit(e); // Retry the request after token refresh
      } else {
        console.error('Failed to add member:', err.response ? err.response.data : err.message);
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto space-y-6 w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add New Member</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`mt-1 block w-full border rounded-md shadow-sm ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:border-primary focus:ring-primary`}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Middle Name</label>
            <input
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className="mt-1 block w-full border rounded-md shadow-sm border-gray-300 focus:border-primary focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`mt-1 block w-full border rounded-md shadow-sm ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:border-primary focus:ring-primary`}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">ID Number</label>
            <input
              type="text"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              className={`mt-1 block w-full border rounded-md shadow-sm ${errors.idNumber ? 'border-red-500' : 'border-gray-300'} focus:border-primary focus:ring-primary`}
            />
            {errors.idNumber && <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className={`mt-1 block w-full border rounded-md shadow-sm ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} focus:border-primary focus:ring-primary`}
            />
            {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Photo</label>
            <input
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="mt-1 block w-full border rounded-md shadow-sm border-gray-300 focus:border-primary focus:ring-primary"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Member'}
        </button>
      </form>
    </div>
  );
};

MemberForm.propTypes = {
  addMember: PropTypes.func.isRequired,
};

export default MemberForm;
