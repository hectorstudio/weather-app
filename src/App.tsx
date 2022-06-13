import { Routes, Route, Navigate } from "react-router-dom";

import useAuth from "./hooks/useAuth";

import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  // RequireAuth Wrapper will redirect the App to /login when the user is not authorized
  const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const { authed } = useAuth();

    return authed === true ? children : <Navigate to="/login" replace />;
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
