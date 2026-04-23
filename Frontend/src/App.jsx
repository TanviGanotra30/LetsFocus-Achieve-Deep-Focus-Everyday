import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import FocusSession from "./pages/FocusSession"
import Analytics from "./pages/Analytics"
import Landing from "./pages/Landing"
import Settings from "./pages/Settings"
import ProtectedRoute from "./utils/ProtectedRoute"
import CursorEffect from "./components/CursorEffect"
import Tasks from "./pages/Tasks"
import "./index.css"


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

        <Route
          path="/focus"
          element={
            <ProtectedRoute>
              <FocusSession />
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
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App