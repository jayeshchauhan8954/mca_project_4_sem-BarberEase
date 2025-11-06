import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState, AppDispatch } from '../../store'
import { fetchBookings } from '../../store/slices/bookingSlice'
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Plus,
  User,
  Scissors
} from 'lucide-react'

const BookingsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { bookings, loading } = useSelector((state: RootState) => state.booking)
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(fetchBookings())
  }, [dispatch])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'PENDING':
        return <Clock className="h-5 w-5 text-yellow-500" />
      case 'COMPLETED':
        return <CheckCircle className="h-5 w-5 text-blue-500" />
      case 'CANCELLED':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
          <p className="mt-2 text-gray-600">
            Manage your appointments and bookings.
          </p>
        </div>
        <Link
          to="/bookings/create"
          className="btn btn-primary btn-md flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Booking
        </Link>
      </div>

      {/* Bookings List */}
      {bookings.length > 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <li key={booking.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {getStatusIcon(booking.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            Booking #{booking.id.slice(-8)}
                          </p>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(booking.appointmentDateTime).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {new Date(booking.appointmentDateTime).toLocaleTimeString()}
                          </div>
                          <div className="flex items-center">
                            <Scissors className="h-4 w-4 mr-1" />
                            Service #{booking.serviceId.slice(-8)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          ₹{booking.totalAmount || 0}
                        </p>
                        <p className="text-xs text-gray-500">
                          {booking.paymentStatus}
                        </p>
                      </div>
                      <Link
                        to={`/bookings/${booking.id}`}
                        className="btn btn-outline btn-sm"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating your first booking.
          </p>
          <div className="mt-6">
            <Link
              to="/bookings/create"
              className="btn btn-primary btn-md flex items-center mx-auto"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Booking
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingsPage

