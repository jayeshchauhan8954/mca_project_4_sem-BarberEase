import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../store'
import { fetchShopById, fetchStaffByShop, fetchServicesByShop } from '../../store/slices/shopSlice'
import { Store, MapPin, Phone, Mail, Clock, Users, Scissors } from 'lucide-react'

const ShopDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const { currentShop, staff, services, loading } = useSelector((state: RootState) => state.shop)

  useEffect(() => {
    if (id) {
      dispatch(fetchShopById(id))
      dispatch(fetchStaffByShop(id))
      dispatch(fetchServicesByShop(id))
    }
  }, [dispatch, id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!currentShop) {
    return (
      <div className="text-center py-12">
        <Store className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Shop not found</h3>
        <p className="mt-1 text-sm text-gray-500">
          The shop you're looking for doesn't exist.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{currentShop.name}</h1>
        <p className="mt-2 text-gray-600">Shop details and management</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Shop Information */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Shop Information</h3>
            </div>
            <div className="card-content">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-sm text-gray-900">{currentShop.address}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-sm text-gray-900">{currentShop.phone}</p>
                  </div>
                </div>

                {currentShop.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-sm text-gray-900">{currentShop.email}</p>
                    </div>
                  </div>
                )}

                {currentShop.description && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Description</p>
                    <p className="text-sm text-gray-900">{currentShop.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Shop Stats */}
        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Shop Stats</h3>
            </div>
            <div className="card-content">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-500">Staff Members</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{staff.length}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Scissors className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-500">Services</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{services.length}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-500">Status</span>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    currentShop.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {currentShop.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Staff List */}
      {staff.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Staff Members</h3>
          </div>
          <div className="card-content">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {staff.map((member) => (
                <div key={member.id} className="border rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{member.name}</h4>
                      <p className="text-xs text-gray-500">{member.specialization || 'Staff Member'}</p>
                    </div>
                  </div>
                  {member.rating > 0 && (
                    <div className="mt-2">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500">Rating: </span>
                        <span className="text-sm font-medium text-gray-900 ml-1">
                          {member.rating.toFixed(1)} ({member.totalReviews} reviews)
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Services List */}
      {services.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Available Services</h3>
          </div>
          <div className="card-content">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div key={service.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{service.name}</h4>
                      <p className="text-xs text-gray-500">{service.durationMinutes} minutes</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">₹{service.price}</p>
                    </div>
                  </div>
                  {service.description && (
                    <p className="mt-2 text-xs text-gray-600">{service.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShopDetailsPage

