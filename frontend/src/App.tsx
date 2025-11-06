import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from './store'
import { getCurrentUser } from './store/slices/authSlice'

// Components
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import LoadingSpinner from './components/common/LoadingSpinner'

// Pages
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ShopsPage from './pages/shop/ShopsPage'
import ShopDetailsPage from './pages/shop/ShopDetailsPage'
import ShopCreatePage from './pages/shop/ShopCreatePage'
import StaffPage from './pages/staff/StaffPage'
import BookingsPage from './pages/booking/BookingsPage'
import BookingCreatePage from './pages/booking/BookingCreatePage'
import BookingDetailsPage from './pages/booking/BookingDetailsPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { isAuthenticated, loading, user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getCurrentUser())
    }
  }, [dispatch])

  if (loading) {
    return <LoadingSpinner />
  }

  // Public routes
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  // Protected routes
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            
            {/* Shop Management Routes */}
            <Route path="/shops" element={<ShopsPage />} />
            <Route path="/shops/create" element={<ShopCreatePage />} />
            <Route path="/shops/:id" element={<ShopDetailsPage />} />
            
            {/* Staff Management Routes */}
            <Route path="/staff" element={<StaffPage />} />
            
            {/* Booking Routes */}
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/bookings/create" element={<BookingCreatePage />} />
            <Route path="/bookings/:id" element={<BookingDetailsPage />} />
            
            {/* Profile */}
            <Route path="/profile" element={<ProfilePage />} />
            
            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App

