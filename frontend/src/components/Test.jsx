import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const Test = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    // Require password
    if (!password.trim()) {
      newErrors.password = 'Password is required';
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
      password: password.trim() || null // Explicitly set to null if empty
    };

    fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setResponse(data.message);
        // Reset form after successful submission
        setName('');
        setEmail('');
        setPassword('');
      })
      .catch((err) => {
        console.error('Error posting data:', err);
        setResponse('An error occurred. Please try again.');
      });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Submit your information</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Name"
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
            placeholder="Email"
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
            placeholder="Password"
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
          Submit
        </button>
      </form>

      {response && (
        <div className={`mt-4 p-3 rounded flex items-center 
          ${response.includes('error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`
        }>
          {response.includes('error') 
            ? <AlertCircle size={20} className="mr-2" /> 
            : <CheckCircle size={20} className="mr-2" />
          }
          {response}
        </div>
      )}
    </div>
  );
};

export default Test;