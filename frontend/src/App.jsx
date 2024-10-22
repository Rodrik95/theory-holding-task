import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import { AuthContext } from "./contexts/AuthContext";

import Layout from "./components/Layout";
import { useContext } from "react";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/homepage" /> : <Login />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/homepage" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/homepage" /> : <Register />}
        />
        <Route element={<Layout />}>
          <Route
            path="/homepage"
            element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
