import { Navigate } from "react-router-dom";

function AdminProtectedRoute({children}) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
     
    if(!token){
        return <Navigate to="/login" />
    }

    if(role !== "admin"){
        return <Navigate to="/users" />
    }

    return  children;
}

export default AdminProtectedRoute;