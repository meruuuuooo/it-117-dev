import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Login from "./components/auth/Login";
import UserMain from "./components/user/user"; // User layout component
import AdminMain from "./components/main/main"; // Admin layout component
import RegisterUser from "./components/auth/RegisterUser";

import axios from "axios";

const App = () => {
  const [selectedSideMenu, setSelectedSideMenu] = useState();
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [role, setRole] = useState(null);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const isAuth = JSON.parse(localStorage.getItem("is_authenticated"));
    const userRole = localStorage.getItem("role");

    if (isAuth !== null) {
      setIsAuthenticated(isAuth);
      setRole(userRole);
    }
  }, []);

  return (
    <Router>
      {isAuthenticated ? (
        <Routes>
          {role === "admin" ? (
            <Route
              path="/*"
              element={
                <AdminMain
                  selectedSideMenu={selectedSideMenu}
                  setSelectedSideMenu={setSelectedSideMenu}
                  products={products}
                  setIsAuthenticated={setIsAuthenticated}
                  role={role}
                  getProducts={getProducts}
                />
              }
            />
          ) : (
            <Route
              path="/*"
              element={
                <UserMain
                  selectedSideMenu={selectedSideMenu}
                  setSelectedSideMenu={setSelectedSideMenu}
                  products={products}
                  setIsAuthenticated={setIsAuthenticated}
                  role={role} // Pass role to UserMain
                  getProducts={getProducts}
                />
              }
            />
          )}
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      ) : (
        <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
      )}
    </Router>
  );
};

export default App;
