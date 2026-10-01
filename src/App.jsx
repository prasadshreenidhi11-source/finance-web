import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Finance from "./components/Finance";
import Portfolio from "./components/Portfolio";
import Accounts from "./components/Accounts";
import Insights from "./components/Insights";
import Goals from "./components/Goals";
import GoalPlan from "./components/GoalPlan";
import Reports from "./components/Reports";
import Settings from "./components/Settings";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
function ProtectedRoute({ children }) {
  const isAuthenticated =
    localStorage.getItem("orion_authenticated") === "true";

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Home */}
<Route
  path="/home"
  element={
    <ProtectedRoute>
      <Finance />
    </ProtectedRoute>
  }
/>

<Route
  path="/"
  element={<Navigate to="/login" replace />}
/>

        {/* Dashboard Pages */}
        <Route
          path="/portfolio"
          element={
            <ProtectedRoute>
              <Portfolio />
            </ProtectedRoute>
          }
        />

        <Route
          path="/accounts"
          element={
            <ProtectedRoute>
              <Accounts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/insights"
          element={
            <ProtectedRoute>
              <Insights />
            </ProtectedRoute>
          }
        />

        <Route
          path="/goals"
          element={
            <ProtectedRoute>
              <Goals />
            </ProtectedRoute>
          }
        />
        <Route
  path="/goal-plan"
  element={
    <ProtectedRoute>
      <GoalPlan />
    </ProtectedRoute>
  }
/>

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Any unknown URL */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;