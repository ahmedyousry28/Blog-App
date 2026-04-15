import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContext } from "./providers/userProvider";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { useContext } from "react";

function App() {
  const { userData } = useContext(UserContext);
  const isLoggedIn = !!userData?.accessToken;
  return (
    <div className="container mx-auto px-12">
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute isLoggedIn={!isLoggedIn}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute isLoggedIn={!isLoggedIn}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} to="/login">
              <Post />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
