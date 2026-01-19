import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UsersPage from "./pages/UserPage";
import ProtectedRoute from "./routes/ProtectedRoutes";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProtectedRoute from "./routes/AdminRoutes";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return(
    <BrowserRouter>
      <Routes>
    <Route path="/"  element={<Navigate to="/login" />} />

    <Route path="/login" element={<LoginPage />}/>

     <Route path="/register" element={<RegisterPage />} />

        <Route 
        path="/users"
        element={
          <ProtectedRoute> 
            <UsersPage/>
          </ProtectedRoute>
        } />

        <Route 
        path="/admin"
        element = {
            <AdminProtectedRoute>
                <AdminDashboard />
            </AdminProtectedRoute>
        }
          />

      </Routes>
    
    </BrowserRouter>
  )
}

export default App;