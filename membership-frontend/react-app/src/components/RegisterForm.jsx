import { useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../AppContext';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { username, password });
      console.log('Registration successful:', res.data);
      dispatch({ type: 'SET_USER', payload: res.data.user });
    } catch (err) {
      console.error('Registration failed:', err.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Register</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full border rounded-md shadow-sm border-gray-300 focus:border-primary focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border rounded-md shadow-sm border-gray-300 focus:border-primary focus:ring-primary"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
