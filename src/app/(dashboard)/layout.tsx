// app/(dashboard)/layout.tsx
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard,
  Stethoscope,
  ClipboardList,
  Settings,
  Users,
  AlertCircle,
  ChevronLeft,
  Menu
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigationItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/overview' },
  { icon: Stethoscope, label: 'Equipment', href: '/equipment' },
  { icon: ClipboardList, label: 'Maintenance', href: '/maintenance' },
  { icon: AlertCircle, label: 'Alerts', href: '/alerts' },
  { icon: Users, label: 'Staff', href: '/staff' },
  { icon: Settings, label: 'Settings', href: '/settings' }
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={cn(
          'bg-white shadow-lg transition-all duration-300',
          sidebarCollapsed ? 'w-16' : 'w-64'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {!sidebarCollapsed && (
            <span className="text-xl font-semibold">Sidekick Dashboard</span>
          )}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {sidebarCollapsed ? (
              <Menu className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>
        <nav className="p-4">
          {navigationItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                'flex items-center p-3 mb-2 rounded-lg cursor-pointer',
                sidebarCollapsed ? 'justify-center' : 'justify-start',
                pathname === item.href 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'hover:bg-gray-50'
              )}
            >
              <item.icon 
                className={cn(
                  'h-5 w-5',
                  sidebarCollapsed ? 'mx-auto' : 'mr-3'
                )} 
              />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        {children}
      </div>
    </div>
  )
}