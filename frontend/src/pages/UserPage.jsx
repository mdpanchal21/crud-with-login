import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, UserPlus, Pencil, Trash2, User, Mail } from "lucide-react";

function UsersPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();
  const getToken = () => localStorage.getItem("token");

  const loadUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to load users");
    }
  };

  const handleAdd = async () => {
    if (!name || !email) return alert("Name and Email are required");
    try {
      const url = editId ? `http://localhost:5000/users/${editId}` : "http://localhost:5000/users";
      const method = editId ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-type": "application/json", Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ name, email }),
      });

      if (response.status === 401) { navigate("/login"); return; }
      setName(""); setEmail(""); setEditId(null);
      loadUsers();
    } catch (error) { alert("Action failed"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      loadUsers();
    } catch (error) { alert("Delete failed"); }
  };

  useEffect(() => { loadUsers(); }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-slate-500">Manage your organization's team members</p>
          </div>
          <button 
            onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("role");  navigate("/login"); }}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"
          >
            <LogOut size={18} /> Logout
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Card (Responsive: Full width on mobile, 1/3 on desktop) */}
          <section className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                {editId ? <Pencil size={20} className="text-blue-500" /> : <UserPlus size={20} className="text-emerald-500" />}
                {editId ? "Edit User" : "Add New User"}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="email"
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  onClick={handleAdd}
                  className={`w-full py-2.5 rounded-lg font-semibold text-white transition-all shadow-md ${
                    editId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  {editId ? "Update Member" : "Add Member"}
                </button>
                
                {editId && (
                  <button 
                    onClick={() => { setEditId(null); setName(""); setEmail(""); }}
                    className="w-full text-sm text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* List Table Section (Responsive: Scrolls horizontally on tiny screens) */}
          <section className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                <h3 className="font-semibold">Users List</h3>
                <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-0.5 rounded-full font-medium">
                  {users.length} Total
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 text-slate-500 text-sm uppercase">
                    <tr>
                      <th className="px-6 py-4 font-semibold">User</th>
                      <th className="px-6 py-4 font-semibold">Email</th>
                      <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="px-6 py-12 text-center text-slate-400">
                          No users found. Start by adding one!
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4 font-medium text-slate-800">{user.name}</td>
                          <td className="px-6 py-4 text-slate-600">{user.email}</td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button 
                              onClick={() => { setName(user.name); setEmail(user.email); setEditId(user.id); }}
                              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            >
                              <Pencil size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(user.id)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

export default UsersPage;
