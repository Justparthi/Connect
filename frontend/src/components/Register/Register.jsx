import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = { 
      name, 
      email, 
      password
    };

    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        // Parse response text even if not OK
        return res.json().then(data => ({
          status: res.status,
          data: data
        }));
      })
      .then(({ status, data }) => {
        if (status === 201) {
          // Successful registration
          setResponse('Registration successful!');
          // Reset form
          setName('');
          setEmail('');
          setPassword('');
          setErrors({});
        } else {
          // Handle error responses
          setResponse(data.message || 'Registration failed');
        }
      })
      .catch((err) => {
        console.error('Registration error:', err);
        setResponse('An unexpected error occurred');
      });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && (
            <div className="text-red-500 flex items-center mt-1">
              <AlertCircle size={16} className="mr-2" />
              {errors.name}
            </div>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && (
            <div className="text-red-500 flex items-center mt-1">
              <AlertCircle size={16} className="mr-2" />
              {errors.email}
            </div>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.password && (
            <div className="text-red-500 flex items-center mt-1">
              <AlertCircle size={16} className="mr-2" />
              {errors.password}
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Register
        </button>
      </form>

      {response && (
        <div className={`mt-4 p-3 rounded flex items-center 
          ${response.includes('failed') || response.includes('error') 
            ? 'bg-red-100 text-red-700' 
            : 'bg-green-100 text-green-700'}`
        }>
          {response.includes('failed') || response.includes('error')
            ? <AlertCircle size={20} className="mr-2" /> 
            : <CheckCircle size={20} className="mr-2" />
          }
          {response}
        </div>
      )}
    </div>
  );
};

export default Register;