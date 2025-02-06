import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/login', { 
        email, 
        password 
      }, {
        // Add detailed error logging
        validateStatus: function (status) {
          return status >= 200 && status < 500; // Reject only if server error
        }
      });

      if (response.status === 200) {
        // Successful login
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/profile');
      } else {
        // Handle client-side authentication errors
        setError(response.data.message || 'Login failed');
        console.error('Login error:', response.data);
      }
    } catch (error) {
      // Comprehensive error handling
      console.error('Full login error:', error);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        setError(error.response.data.message || 'Login failed');
        console.error('Server response error:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your network connection.');
        console.error('No server response:', error.request);
      } else {
        // Something happened in setting up the request
        setError('Error processing login. Please try again.');
        console.error('Login error:', error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <form 
          onSubmit={handleLogin} 
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded focus:outline-blue-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded focus:outline-blue-500"
              required
            />
          </div>

          {error && (
            <div className="mb-4 flex items-center text-red-500">
              <AlertCircle className="mr-2" size={20} />
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
          >
            Log In
          </button>
          
          <p className="text-center mt-4 text-gray-600">
            Don't have an account? 
            <a href="/register" className="text-blue-500 ml-1 hover:underline">
              Register
            </a>
          </p>
        </form>

        
      </div>
    </div>
  );
}

export default Login;