import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store'
import { fetchBookings } from '../store/slices/bookingSlice'
import { fetchShops } from '../store/slices/shopSlice'
import { 
  Calendar, 
  Store, 
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react'

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const { bookings } = useSelector((state: RootState) => state.booking)
  const { shops } = useSelector((state: RootState) => state.shop)

  useEffect(() => {
    dispatch(fetchBookings())
    if (user?.role === 'SHOP_OWNER' || user?.role === 'ADMIN') {
      dispatch(fetchShops())
    }
  }, [dispatch, user])

  // Calculate dashboard stats
  const totalBookings = bookings.length
  const confirmedBookings = bookings.filter(b => b.status === 'CONFIRMED').length
  const pendingBookings = bookings.filter(b => b.status === 'PENDING').length
  const completedBookings = bookings.filter(b => b.status === 'COMPLETED').length

  const stats = [
    {
      name: 'Total Bookings',
      value: totalBookings,
      icon: Calendar,
      color: 'bg-blue-500',
    },
    {
      name: 'Confirmed',
      value: confirmedBookings,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      name: 'Pending',
      value: pendingBookings,
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      name: 'Completed',
      value: completedBookings,
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ]

  const shopStats = [
    {
      name: 'Total Shops',
      value: shops.length,
      icon: Store,
      color: 'bg-indigo-500',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="mt-2 text-gray-600">
          Here's what's happening with your barber shop business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${stat.color} p-3 rounded-md`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Shop Owner Stats */}
      {(user?.role === 'SHOP_OWNER' || user?.role === 'ADMIN') && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {shopStats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className={`${stat.color} p-3 rounded-md`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {stat.name}
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {stat.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Recent Bookings */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Recent Bookings
          </h3>
          {bookings.length > 0 ? (
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.slice(0, 5).map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Service #{booking.serviceId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(booking.appointmentDateTime).toLocaleDateString()} at{' '}
                        {new Date(booking.appointmentDateTime).toLocaleTimeString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          booking.status === 'CONFIRMED' 
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : booking.status === 'COMPLETED'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{booking.totalAmount || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-6">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating your first booking.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage

