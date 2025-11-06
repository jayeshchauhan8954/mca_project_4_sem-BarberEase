import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState, AppDispatch } from '../../store'
import { fetchShops } from '../../store/slices/shopSlice'
import { Store, MapPin, Phone, Plus } from 'lucide-react'

const ShopsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { shops, loading } = useSelector((state: RootState) => state.shop)
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(fetchShops())
  }, [dispatch])

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
          <h1 className="text-3xl font-bold text-gray-900">Shops</h1>
          <p className="mt-2 text-gray-600">
            Manage your barber shops and their settings.
          </p>
        </div>
        {(user?.role === 'SHOP_OWNER' || user?.role === 'ADMIN') && (
          <Link
            to="/shops/create"
            className="btn btn-primary btn-md flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Shop
          </Link>
        )}
      </div>

      {/* Shops Grid */}
      {shops.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shops.map((shop) => (
            <div key={shop.id} className="card">
              <div className="card-content">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Store className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {shop.name}
                      </h3>
                      <p className="text-sm text-gray-500">Shop ID: {shop.id}</p>
                    </div>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    shop.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {shop.active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {shop.address}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {shop.phone}
                  </div>
                </div>

                {shop.description && (
                  <p className="mt-3 text-sm text-gray-700">{shop.description}</p>
                )}

                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {shop.staffIds.length} staff members
                  </div>
                  <Link
                    to={`/shops/${shop.id}`}
                    className="btn btn-outline btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Store className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No shops</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating your first shop.
          </p>
          {(user?.role === 'SHOP_OWNER' || user?.role === 'ADMIN') && (
            <div className="mt-6">
              <Link
                to="/shops/create"
                className="btn btn-primary btn-md flex items-center mx-auto"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Shop
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ShopsPage

