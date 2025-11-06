import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../store'
import { fetchServicesByShop } from '../../store/slices/shopSlice'
import { Scissors, Plus, Edit, Trash2, DollarSign, Clock } from 'lucide-react'
import Button from '../../components/common/Button'
import Badge from '../../components/common/Badge'
import { formatCurrency, formatDuration } from '../../utils/formatters'
import { SERVICE_CATEGORY_LABELS } from '../../utils/constants'

const ServicesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { services, loading } = useSelector((state: RootState) => state.shop)
  const { user } = useSelector((state: RootState) => state.auth)
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')

  useEffect(() => {
    if (user?.shopId) {
      dispatch(fetchServicesByShop(user.shopId))
    }
  }, [dispatch, user])

  const filteredServices = selectedCategory === 'ALL' 
    ? services 
    : services.filter(s => s.category === selectedCategory)

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
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="mt-2 text-gray-600">
            Manage your barbershop services and pricing
          </p>
        </div>
        {(user?.role === 'SHOP_OWNER' || user?.role === 'ADMIN') && (
          <Button icon={<Plus className="h-5 w-5" />}>
            Add Service
          </Button>
        )}
      </div>

      {/* Category Filter */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedCategory === 'ALL'
                ? 'bg-primary-100 text-primary-900'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Services
          </button>
          {Object.entries(SERVICE_CATEGORY_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === key
                  ? 'bg-primary-100 text-primary-900'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Scissors className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {service.name}
                      </h3>
                      <Badge variant="info" size="sm">
                        {SERVICE_CATEGORY_LABELS[service.category]}
                      </Badge>
                    </div>
                  </div>
                </div>

                {service.description && (
                  <p className="mt-4 text-sm text-gray-600">
                    {service.description}
                  </p>
                )}

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>Price</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(service.price)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Duration</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {formatDuration(service.durationMinutes)}
                    </span>
                  </div>

                  {service.bufferTimeMinutes > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Buffer</span>
                      </div>
                      <span className="text-gray-900">
                        {formatDuration(service.bufferTimeMinutes)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Badge variant={service.active ? 'success' : 'default'}>
                    {service.active ? 'Active' : 'Inactive'}
                  </Badge>
                  
                  {(user?.role === 'SHOP_OWNER' || user?.role === 'ADMIN') && (
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white shadow rounded-lg">
          <Scissors className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No services found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {selectedCategory === 'ALL' 
              ? 'Get started by creating your first service.'
              : 'No services in this category. Try a different category.'}
          </p>
          {(user?.role === 'SHOP_OWNER' || user?.role === 'ADMIN') && selectedCategory === 'ALL' && (
            <div className="mt-6">
              <Button icon={<Plus className="h-5 w-5" />}>
                Add Service
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ServicesPage

