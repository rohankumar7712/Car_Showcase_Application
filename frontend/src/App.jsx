import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminNavbar from "./components/AdminNavbar";
import UserNavbar from "./components/UserNavbar";
import AdminListings from "./pages/admin/AdminListings";
import UserListings from "./pages/user/UserListings";
import AddListing from "./pages/admin/AddListing";
import EditListing from "./pages/admin/EditListing";
import UserListingDetails from "./pages/user/UserListingDetails";
import ListingDetails from "./pages/admin/ListingDetails";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Browse from "./pages/user/Browse";
import CarSearch from "./pages/user/CarSearch";
import ShowUser from "./pages/admin/ShowUser";
import FeedPage from "./pages/user/Feedback";
import FeaturesPage from "./pages/user/FeaturesPage";
import FeatureOne from "./components/FeatureOne";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on first load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      axios
        .get("http://localhost:5050/auth/user", { withCredentials: true })
        .then((response) => {
          setUser(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        })
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return null;
    }
  };

  const logout = async () => {
    await axios.post(
      "http://localhost:5050/auth/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
    localStorage.removeItem("user");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {user?.role === "admin" && <AdminNavbar logout={logout} />}
      {user?.role === "user" && <UserNavbar logout={logout} />}
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/dashboard/admin" />
              ) : (
                <Navigate to="/dashboard/user" />
              )
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login login={login} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/dashboard/admin"
          element={
            user?.role === "admin" ? (
              <>
                <AdminDashboard />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/user"
          element={
            user?.role === "user" ? (
              <>
                <UserDashboard />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/admin/listings"
          element={
            user?.role === "admin" ? (
              <>
                <AdminListings />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/admin/edit/:id"
          element={
            user?.role === "admin" ? <EditListing /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/dashboard/admin/listings/:id"
          element={
            user?.role === "admin" ? (
              <>
                <ListingDetails user={user} />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/admin/addcar"
          element={
            user?.role === "admin" ? <AddListing /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/dashboard/user/listings"
          element={
            user?.role === "user" ? (
              <>
                <UserListings />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/user/listings/:id"
          element={
            user?.role === "user" ? (
              <>
                <UserListingDetails />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/user/browse"
          element={
            user?.role === "user" ? (
              <>
                <Browse />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/user/carsearch"
          element={
            user?.role === "user" ? (
              <>
                <CarSearch />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/admin/users"
          element={
            user?.role === "admin" ? (
              <>
                <ShowUser user={user} />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/user/feedback"
          element={
            user?.role === "user" ? (
              <>
                <FeedPage user={user} />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/user/features"
          element={
            user?.role === "user" ? (
              <>
                <FeaturesPage />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/allfeature"
          element={
            <>
              <FeatureOne />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
