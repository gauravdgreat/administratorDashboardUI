import React, { useState } from "react";
import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "active",
    permissions: {
      read: false,
      write: false,
      delete: false,
    },
    customAttributes: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        permissions: {
          ...prev.permissions,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers((prevUsers) => [...prevUsers, formData]);
    setFormData({
      name: "",
      email: "",
      role: "",
      status: "active",
      permissions: {
        read: false,
        write: false,
        delete: false,
      },
      customAttributes: "",
    });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    const user = users[index];
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      permissions: { ...user.permissions },
      customAttributes: user.customAttributes,
    });
    setShowForm(true);
    setUsers(users.filter((_, i) => i !== index));
  };

  const handleDelete = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <nav>
        <h1>Administrator Dashboard</h1>
        <button onClick={() => setShowForm(true)}>Add New User</button>
      </nav>

      {showForm && (
        <div>
          <h2 className="formHeader">Add User</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Role:</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Status:</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label>Permissions:</label>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="read"
                    checked={formData.permissions.read}
                    onChange={handleChange}
                  />
                  Read
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="write"
                    checked={formData.permissions.write}
                    onChange={handleChange}
                  />
                  Write
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="delete"
                    checked={formData.permissions.delete}
                    onChange={handleChange}
                  />
                  Delete
                </label>
              </div>
            </div>
            <div>
              <label>Custom Attributes:</label>
              <textarea
                name="customAttributes"
                value={formData.customAttributes}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      <h2>User List</h2>
      {users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Permissions</th>
              <th>Custom Attributes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  {user.permissions.read && "Read "}
                  {user.permissions.write && "Write "}
                  {user.permissions.delete && "Delete"}
                </td>
                <td>{user.customAttributes}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
