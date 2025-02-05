import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    skills: [],
    courses: []
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user profile
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile');
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...profile.skills];
    newSkills[index] = value;
    setProfile(prev => ({ ...prev, skills: newSkills }));
  };

  const addSkill = () => {
    setProfile(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/profile/${profile.id}`, profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsEditing(false);
      alert('Profile Updated Successfully');
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">My Profile</h2>
        
        {!isEditing ? (
          <div>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone || 'Not set'}</p>
            
            <div className="mt-4">
              <strong>Skills:</strong>
              <ul className="list-disc pl-5">
                {profile.skills?.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            
            <button 
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={profile.phone || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-2">Skills</label>
              {profile.skills?.map((skill, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    className="w-full px-3 py-2 border rounded mr-2"
                  />
                </div>
              ))}
              <button 
                type="button"
                onClick={addSkill}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Skill
              </button>
            </div>
            
            <div className="flex space-x-4">
              <button 
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save Profile
              </button>
              <button 
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;