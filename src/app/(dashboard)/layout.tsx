'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard,
  Stethoscope,
  ClipboardList,
  Settings,
  Users,
  AlertCircle,
  ChevronLeft,
  Menu
} from 'lucide-react';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: Stethoscope, label: 'Equipment', href: '/equipment' },
    { icon: ClipboardList, label: 'Maintenance', href: '/maintenance' },
    { icon: AlertCircle, label: 'Alerts', href: '/alerts' },
    { icon: Users, label: 'Staff', href: '/staff' },
    { icon: Settings, label: 'Settings', href: '/settings' }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          {!sidebarCollapsed && (
            <span className="text-xl font-semibold">Sidekick</span>
          )}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {sidebarCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        <nav className="p-4">
          {navigationItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-start'} 
                p-3 mb-2 rounded-lg cursor-pointer
                ${pathname === item.href ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
            >
              <item.icon size={20} className={sidebarCollapsed ? 'mx-auto' : 'mr-3'} />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;