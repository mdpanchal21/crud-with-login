import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [authUsers, setAuthUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const loadAuthUsers = async () => {
    const res = await fetch(`${BASE_URL}/admin/auth-users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setAuthUsers(data);
  };

  const loadUsers = async () => {
    const res = await fetch(`${BASE_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUsers(data);
  };

  const deleteAuthUser = async (id) => {
    if (!window.confirm("Delete auth user?")) return;
    await fetch(`${BASE_URL}/admin/auth-user/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    loadAuthUsers();
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete user?")) return;
    await fetch(`${BASE_URL}/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    loadUsers();
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  const handleUpdate = async () => {
    await fetch(`${BASE_URL}/admin/users/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email }),
    });
    setEditId(null);
    setName("");
    setEmail("");
    loadUsers();
  };

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  navigate("/login");
};


  useEffect(() => {
    loadAuthUsers();
    loadUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
     <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold text-gray-800">
    Admin Dashboard
  </h1>

  <button
    onClick={handleLogout}
    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
  >
    Logout
  </button>
</div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AUTH USERS */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Auth Users</h2>

          <ul className="space-y-2">
            {authUsers.map((user) => (
              <li
                key={user.id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span className="text-sm">
                  {user.email} ({user.role})
                </span>
                <button
                  onClick={() => deleteAuthUser(user.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* APP USERS */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">App Users</h2>

          {/* Edit Form */}
          {editId && (
            <div className="mb-4 space-y-2">
              <input
                className="w-full border p-2 rounded"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full border p-2 rounded"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Update User
              </button>
            </div>
          )}

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full border text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
