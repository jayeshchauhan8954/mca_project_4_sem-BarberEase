import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { AppDispatch } from '../../store'
import { createShop } from '../../store/slices/shopSlice'
import { Shop } from '../../types'
import { Store, ArrowLeft } from 'lucide-react'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

const ShopCreatePage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = React.useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<Shop>>()

  const onSubmit = async (data: Partial<Shop>) => {
    try {
      setLoading(true)
      await dispatch(createShop(data)).unwrap()
      toast.success('Shop created successfully!')
      navigate('/shops')
    } catch (error) {
      toast.error(error as string)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/shops')}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Shops
        </button>
        
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
            <Store className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Shop</h1>
            <p className="mt-1 text-gray-600">
              Add a new barbershop to your business
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Input
                label="Shop Name"
                {...register('name', { 
                  required: 'Shop name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' }
                })}
                placeholder="e.g., Premium Cuts Barbershop"
                error={errors.name?.message}
                fullWidth
              />
            </div>

            <div className="sm:col-span-2">
              <Input
                label="Address"
                {...register('address', { required: 'Address is required' })}
                placeholder="Complete address with pincode"
                error={errors.address?.message}
                fullWidth
              />
            </div>

            <div>
              <Input
                label="Phone Number"
                {...register('phone', { 
                  required: 'Phone is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Phone must be 10 digits'
                  }
                })}
                placeholder="9876543210"
                error={errors.phone?.message}
                fullWidth
              />
            </div>

            <div>
              <Input
                label="Email (Optional)"
                type="email"
                {...register('email', {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                placeholder="shop@example.com"
                error={errors.email?.message}
                fullWidth
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                {...register('description')}
                rows={3}
                className="input"
                placeholder="Tell customers about your shop..."
              />
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Business Hours</h2>
          
          <div className="space-y-4">
            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
              <div key={day} className="grid grid-cols-3 gap-4 items-center">
                <div className="capitalize font-medium text-gray-700">{day}</div>
                <Input
                  type="time"
                  {...register(`businessHours.${day}` as any)}
                  placeholder="09:00"
                  fullWidth
                />
                <Input
                  type="time"
                  {...register(`businessHours.${day}` as any)}
                  placeholder="18:00"
                  fullWidth
                />
              </div>
            ))}
          </div>
        </div>

        {/* Shop Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Shop Settings</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Advance Payment (%)
              </label>
              <input
                type="number"
                {...register('settings.advancePaymentPercentage')}
                defaultValue={20}
                min={10}
                max={50}
                className="input"
              />
              <p className="mt-1 text-xs text-gray-500">
                Percentage of total amount to be paid in advance (10-50%)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slot Duration (minutes)
              </label>
              <select
                {...register('settings.slotDurationMinutes')}
                className="input"
                defaultValue={30}
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>60 minutes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buffer Time (minutes)
              </label>
              <input
                type="number"
                {...register('settings.bufferTimeMinutes')}
                defaultValue={5}
                min={0}
                max={30}
                className="input"
              />
              <p className="mt-1 text-xs text-gray-500">
                Time gap between appointments for cleanup
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Advance Booking (days)
              </label>
              <input
                type="number"
                {...register('settings.maxAdvanceBookingDays')}
                defaultValue={30}
                min={1}
                max={90}
                className="input"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('settings.allowOnlineBooking')}
                  defaultChecked
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Allow online booking
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/shops')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
          >
            {loading ? 'Creating...' : 'Create Shop'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ShopCreatePage

