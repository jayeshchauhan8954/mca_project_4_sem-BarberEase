import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { 
  LayoutDashboard, 
  Store, 
  Users, 
  Calendar, 
  User,
  Scissors
} from 'lucide-react'

const Sidebar: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Shops', href: '/shops', icon: Store },
    { name: 'Staff', href: '/staff', icon: Users },
    { name: 'Bookings', href: '/bookings', icon: Calendar },
    { name: 'Profile', href: '/profile', icon: User },
  ]

  // Filter navigation based on user role
  const filteredNavigation = navigation.filter(item => {
    if (user?.role === 'CUSTOMER') {
      return ['Dashboard', 'Bookings', 'Profile'].includes(item.name)
    }
    if (user?.role === 'STAFF') {
      return ['Dashboard', 'Bookings', 'Profile'].includes(item.name)
    }
    return true
  })

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto border-r border-gray-200">
        <div className="flex items-center flex-shrink-0 px-4">
          <Scissors className="h-8 w-8 text-primary-600" />
        </div>
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {filteredNavigation.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary-100 text-primary-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </NavLink>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

