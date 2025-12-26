import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { RootState, AppDispatch } from '../../store'
import { fetchBookingById, cancelBooking } from '../../store/slices/bookingSlice'
import { 
  Calendar, 
  User, 
  Store, 
  Scissors, 
  ArrowLeft,
  XCircle
} from 'lucide-react'
import Button from '../../components/common/Button'
import Badge from '../../components/common/Badge'
import Modal from '../../components/common/Modal'
import { formatDateTime, formatCurrency } from '../../utils/formatters'

const BookingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { currentBooking, loading } = useSelector((state: RootState) => state.booking)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [cancelReason, setCancelReason] = useState('')
  const [canceling, setCanceling] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(fetchBookingById(id))
    }
  }, [dispatch, id])

  const handleCancel = async () => {
    if (!currentBooking) return
    
    try {
      setCanceling(true)
      await dispatch(cancelBooking({ bookingId: currentBooking.id, reason: cancelReason })).unwrap()
      toast.success('Booking cancelled successfully')
      setShowCancelModal(false)
      navigate('/bookings')
    } catch (error) {
      toast.error(error as string)
    } finally {
      setCanceling(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!currentBooking) {
    return (
      <div className="text-center py-12">
        <Calendar className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Booking not found</h3>
        <Button variant="outline" onClick={() => navigate('/bookings')} className="mt-4">
          Back to Bookings
        </Button>
      </div>
    )
  }

  const canCancel = currentBooking.status === 'PENDING' || currentBooking.status === 'CONFIRMED'

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/bookings')}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Bookings
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Booking Details</h1>
            <p className="mt-1 text-sm text-gray-500">
              Booking ID: {currentBooking.id}
            </p>
          </div>
          
          <Badge variant={getStatusVariant(currentBooking.status)} size="lg">
            {currentBooking.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Appointment Information */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Appointment Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Date & Time</p>
                  <p className="text-sm text-gray-900">{formatDateTime(currentBooking.appointmentDateTime)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Store className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Shop</p>
                  <p className="text-sm text-gray-900">Shop #{currentBooking.shopId.slice(-8)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Staff Member</p>
                  <p className="text-sm text-gray-900">Staff #{currentBooking.staffId.slice(-8)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Scissors className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Service</p>
                  <p className="text-sm text-gray-900">Service #{currentBooking.serviceId.slice(-8)}</p>
                </div>
              </div>

              {currentBooking.notes && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-500 mb-1">Notes</p>
                  <p className="text-sm text-gray-700">{currentBooking.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Cancellation Info */}
          {currentBooking.status === 'CANCELLED' && currentBooking.cancellationReason && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-900">Cancellation Reason</p>
                  <p className="text-sm text-red-700 mt-1">{currentBooking.cancellationReason}</p>
                  {currentBooking.cancelledAt && (
                    <p className="text-xs text-red-600 mt-1">
                      Cancelled on {formatDateTime(currentBooking.cancelledAt)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment Information */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Amount</span>
                <span className="text-lg font-semibold text-gray-900">
                  {formatCurrency(currentBooking.totalAmount || 0)}
                </span>
              </div>
              
              {currentBooking.advanceAmount && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Advance Paid</span>
                  <span className="text-sm font-medium text-green-600">
                    {formatCurrency(currentBooking.advanceAmount)}
                  </span>
                </div>
              )}
              
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Payment Status</span>
                  <Badge variant={currentBooking.paymentStatus === 'COMPLETED' ? 'success' : 'warning'}>
                    {currentBooking.paymentStatus}
                  </Badge>
                </div>
              </div>
              
              {currentBooking.paymentId && (
                <div className="text-xs text-gray-500">
                  Payment ID: {currentBooking.paymentId}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          {canCancel && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Actions</h2>
              
              <div className="space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => {/* Reschedule logic */}}
                >
                  Reschedule
                </Button>
                
                <Button
                  variant="danger"
                  fullWidth
                  icon={<XCircle className="h-4 w-4" />}
                  onClick={() => setShowCancelModal(true)}
                >
                  Cancel Booking
                </Button>
              </div>
              
              <p className="mt-4 text-xs text-gray-500">
                Cancellation policy: Full refund if cancelled 24+ hours before appointment
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Modal */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Cancel Booking"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to cancel this booking? This action cannot be undone.
          </p>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for cancellation (optional)
            </label>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Let us know why you're cancelling..."
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              fullWidth
              onClick={() => setShowCancelModal(false)}
            >
              Keep Booking
            </Button>
            <Button
              variant="danger"
              fullWidth
              loading={canceling}
              onClick={handleCancel}
            >
              {canceling ? 'Cancelling...' : 'Confirm Cancellation'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

// Helper function to get status variant
function getStatusVariant(status: string): 'success' | 'warning' | 'danger' | 'info' | 'default' {
  switch (status) {
    case 'CONFIRMED':
      return 'success'
    case 'PENDING':
      return 'warning'
    case 'COMPLETED':
      return 'info'
    case 'CANCELLED':
    case 'NO_SHOW':
      return 'danger'
    default:
      return 'default'
  }
}

export default BookingDetailsPage

