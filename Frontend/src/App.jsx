import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Analytics from "./pages/Analytics"
import Landing from "./pages/Landing"
import Settings from "./pages/Settings"
import ProtectedRoute from "./utils/ProtectedRoute"
import CursorEffect from "./components/CursorEffect"
import Tasks from "./pages/Tasks"
import Profile from "./components/Profile"
import "./index.css"
import Timer from "./components/Timer"


function App() {

  return (
    <BrowserRouter>
      <CursorEffect />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/tasks" element={<Tasks />} />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
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
        <Route
          path="/timer"
          element={
            <ProtectedRoute>
              <Timer />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App