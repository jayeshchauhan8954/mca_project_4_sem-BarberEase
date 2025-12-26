import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { RootState, AppDispatch } from '../../store'
import { createBooking, fetchAvailableSlots, clearAvailableSlots } from '../../store/slices/bookingSlice'
import { fetchShops } from '../../store/slices/shopSlice'
import { BookingRequest } from '../../types'

const BookingCreatePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { shops } = useSelector((state: RootState) => state.shop)
  const { availableSlots, loading } = useSelector((state: RootState) => state.booking)
  
  const [selectedShop, setSelectedShop] = useState<string>('')
  const [selectedStaff, setSelectedStaff] = useState<string>('')
  const [selectedService, setSelectedService] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  
  const { register, handleSubmit, formState: {}, setValue } = useForm<BookingRequest>()

  useEffect(() => {
    dispatch(fetchShops())
  }, [dispatch])

  useEffect(() => {
    if (selectedShop && selectedStaff && selectedService && selectedDate) {
      dispatch(fetchAvailableSlots({
        shopId: selectedShop,
        staffId: selectedStaff,
        serviceId: selectedService,
        date: selectedDate
      }))
    } else {
      dispatch(clearAvailableSlots())
    }
  }, [dispatch, selectedShop, selectedStaff, selectedService, selectedDate])

  const onSubmit = async (data: BookingRequest) => {
    try {
      await dispatch(createBooking(data)).unwrap()
      toast.success('Booking created successfully!')
      navigate('/bookings')
    } catch (error) {
      toast.error(error as string)
    }
  }

  const handleShopChange = (shopId: string) => {
    setSelectedShop(shopId)
    setSelectedStaff('')
    setSelectedService('')
    setSelectedDate('')
    dispatch(clearAvailableSlots())
  }

  const handleStaffChange = (staffId: string) => {
    setSelectedStaff(staffId)
    setSelectedService('')
    setSelectedDate('')
    dispatch(clearAvailableSlots())
  }

  const handleServiceChange = (serviceId: string) => {
    setSelectedService(serviceId)
    setSelectedDate('')
    dispatch(clearAvailableSlots())
  }

  const handleSlotSelect = (slot: string) => {
    setValue('appointmentDateTime', slot)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create New Booking</h1>
        <p className="mt-2 text-gray-600">
          Book an appointment with your preferred barber.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Booking Details</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Shop Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Shop
              </label>
              <select
                value={selectedShop}
                onChange={(e) => handleShopChange(e.target.value)}
                className="input"
                required
              >
                <option value="">Choose a shop</option>
                {shops.map((shop) => (
                  <option key={shop.id} value={shop.id}>
                    {shop.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Staff Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Staff
              </label>
              <select
                value={selectedStaff}
                onChange={(e) => handleStaffChange(e.target.value)}
                className="input"
                required
                disabled={!selectedShop}
              >
                <option value="">Choose a staff member</option>
                {selectedShop && shops.find(s => s.id === selectedShop)?.staffIds.map((staffId) => (
                  <option key={staffId} value={staffId}>
                    Staff #{staffId.slice(-8)}
                  </option>
                ))}
              </select>
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Service
              </label>
              <select
                value={selectedService}
                onChange={(e) => handleServiceChange(e.target.value)}
                className="input"
                required
                disabled={!selectedStaff}
              >
                <option value="">Choose a service</option>
                {/* Services would be fetched based on selected shop */}
              </select>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="input"
                required
                disabled={!selectedService}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Available Time Slots */}
          {availableSlots.length > 0 && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Time Slots
              </label>
              <div className="grid grid-cols-4 gap-2">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => handleSlotSelect(slot)}
                    className="btn btn-outline btn-sm"
                  >
                    {new Date(slot).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              {...register('notes')}
              rows={3}
              className="input"
              placeholder="Any special requests or notes..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/bookings')}
            className="btn btn-secondary btn-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !selectedShop || !selectedStaff || !selectedService || !selectedDate}
            className="btn btn-primary btn-md"
          >
            {loading ? 'Creating...' : 'Create Booking'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default BookingCreatePage

