import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../store'
import { fetchStaffByShop } from '../../store/slices/shopSlice'
import { Users, Star, Phone, Mail } from 'lucide-react'

const StaffPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { staff, loading } = useSelector((state: RootState) => state.shop)
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (user?.shopId) {
      dispatch(fetchStaffByShop(user.shopId))
    }
  }, [dispatch, user])

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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Staff Members</h1>
        <p className="mt-2 text-gray-600">
          Manage your barber shop staff and their schedules.
        </p>
      </div>

      {/* Staff Grid */}
      {staff.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((member) => (
            <div key={member.id} className="card">
              <div className="card-content">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {member.specialization || 'Staff Member'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {member.phone}
                  </div>
                  {member.email && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      {member.email}
                    </div>
                  )}
                </div>

                {member.rating > 0 && (
                  <div className="mt-4 flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(member.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {member.rating.toFixed(1)} ({member.totalReviews} reviews)
                    </span>
                  </div>
                )}

                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {member.serviceIds.length} services
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    member.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {member.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No staff members</h3>
          <p className="mt-1 text-sm text-gray-500">
            Add staff members to your shop to get started.
          </p>
        </div>
      )}
    </div>
  )
}

export default StaffPage

