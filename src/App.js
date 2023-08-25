import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const fetchUsers = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    setUsers(response.data);
  };

  const createUser = async () => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', formData);
      setUsers([...users, response.data]);
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (id) => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, formData);
      const updatedUsers = users.map(user => user.id === id ? response.data : user);
      setUsers(updatedUsers);
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>CRUD App</h1>
      <h2>Create User</h2>
      <form onSubmit={(e) => { e.preventDefault(); createUser(); }}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <button type="submit">Create</button>
      </form>
      
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.phone}
            <button onClick={() => updateUser(user.id)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

