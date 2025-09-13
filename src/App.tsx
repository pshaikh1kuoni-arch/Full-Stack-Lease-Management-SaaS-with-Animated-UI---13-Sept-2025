import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Leases from './pages/Leases';
import AddLease from './pages/AddLease';
import EditLease from './pages/EditLease';
import Strategies from './pages/Strategies';
import AddStrategy from './pages/AddStrategy';
import EditStrategy from './pages/EditStrategy';
import Reminders from './pages/Reminders';
import Documents from './pages/Documents';
import NotFound from './pages/NotFound';
import AuthWrapper from './components/auth/AuthWrapper';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { AuthProvider } from './context/AuthContext';
export function App() {
  return <AuthProvider>
      <Router>
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<AuthWrapper />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="leases" element={<Leases />} />
              <Route path="leases/add" element={<AddLease />} />
              <Route path="leases/edit/:id" element={<EditLease />} />
              <Route path="strategies" element={<Strategies />} />
              <Route path="strategies/add" element={<AddStrategy />} />
              <Route path="strategies/edit/:id" element={<EditStrategy />} />
              <Route path="reminders" element={<Reminders />} />
              <Route path="documents" element={<Documents />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>;
}