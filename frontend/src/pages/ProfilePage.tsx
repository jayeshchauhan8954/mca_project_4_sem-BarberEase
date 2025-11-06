import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { RootState } from '../store'
import { User, Mail, Phone, MapPin, Calendar, Edit } from 'lucide-react'

const ProfilePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const [isEditing, setIsEditing] = useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    }
  })

  const onSubmit = async (data: any) => {
    try {
      // Update profile logic would go here
      toast.success('Profile updated successfully!')
      setIsEditing(false)
    } catch (error) {
      toast.error('Failed to update profile')
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="mt-2 text-gray-600">
            Manage your account information and preferences.
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn btn-outline btn-md flex items-center"
        >
          <Edit className="h-5 w-5 mr-2" />
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="card-content text-center">
              <div className="h-24 w-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{user?.name}</h3>
              <p className="text-sm text-gray-500 capitalize">{user?.role.toLowerCase()}</p>
              <div className="mt-4">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Personal Information</h3>
              <p className="card-description">
                Update your personal details and contact information.
              </p>
            </div>
            <div className="card-content">
              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        type="text"
                        className="input"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        type="email"
                        className="input"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        {...register('phone', { required: 'Phone is required' })}
                        type="tel"
                        className="input"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn btn-secondary btn-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary btn-md"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Full Name</p>
                        <p className="text-sm text-gray-900">{user?.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email Address</p>
                        <p className="text-sm text-gray-900">{user?.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Phone Number</p>
                        <p className="text-sm text-gray-900">{user?.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Member Since</p>
                        <p className="text-sm text-gray-900">
                          {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

