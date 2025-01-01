"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  AlertTriangle,
  AlertCircle,
  Info,
  Bell,
  CheckCircle,
  Clock,
  Building2
} from 'lucide-react';

const AlertsPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Sample active alerts data
  const activeAlerts = [
    {
      id: "A001",
      severity: "critical",
      title: "MRI Scanner Temperature Critical",
      message: "Temperature exceeds normal operating range (>30°C). Immediate inspection required.",
      equipment: "Siemens Magnetom Vida",
      location: "Imaging Room 2",
      department: "Radiology",
      timestamp: "2 minutes ago",
      actions: ["Inspect", "Shutdown", "Notify Technician"]
    },
    {
      id: "A002",
      severity: "warning",
      title: "Ventilator Battery Warning",
      message: "Battery level at 18%. Connect to power source within 30 minutes.",
      equipment: "Philips Respironics V60",
      location: "ICU Bay 4",
      department: "ICU",
      timestamp: "15 minutes ago",
      actions: ["Check Power", "Replace Battery"]
    },
    {
      id: "A003",
      severity: "info",
      title: "X-Ray Calibration Due",
      message: "Scheduled calibration required within 5 days.",
      equipment: "GE Healthcare Discovery",
      location: "Emergency Room 1",
      department: "Emergency",
      timestamp: "1 hour ago",
      actions: ["Schedule", "Postpone"]
    }
  ];

  // Recent notifications (less urgent)
  const recentNotifications = [
    {
      id: "N001",
      type: "maintenance",
      message: "Preventive maintenance completed on Patient Monitor #12",
      timestamp: "2 hours ago"
    },
    {
      id: "N002",
      type: "system",
      message: "Software update available for Radiology equipment",
      timestamp: "3 hours ago"
    },
    {
      id: "N003",
      type: "status",
      message: "CT Scanner back online after maintenance",
      timestamp: "5 hours ago"
    }
  ];

  const getSeverityIcon = (severity) => {
    const icons = {
      critical: <AlertTriangle className="h-5 w-5 text-red-600" />,
      warning: <AlertCircle className="h-5 w-5 text-yellow-600" />,
      info: <Info className="h-5 w-5 text-blue-600" />
    };
    return icons[severity];
  };

  const getSeverityStyle = (severity) => {
    const styles = {
      critical: 'bg-red-50 border-red-200 hover:bg-red-100',
      warning: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
      info: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    };
    return styles[severity];
  };

  return (
    <div className="p-8">
      {/* Header with Department Filter */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Active Alerts</h1>
            <p className="text-gray-500 mt-1">Real-time equipment alerts and notifications</p>
          </div>
          <div className="flex items-center gap-2 ml-8">
            <Building2 className="h-4 w-4 text-gray-500" />
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="radiology">Radiology</SelectItem>
                <SelectItem value="icu">ICU</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Last updated: Just now</span>
          <Button variant="outline" size="sm" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="bg-red-100 text-red-800 rounded-full px-2 py-0.5 text-xs font-medium">
              3
            </span>
          </Button>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Active Alerts
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Recent Notifications
          </TabsTrigger>
        </TabsList>

        {/* Active Alerts Tab */}
        <TabsContent value="active" className="space-y-4">
          {activeAlerts.map((alert) => (
            <Card 
              key={alert.id}
              className={`border transition-colors ${getSeverityStyle(alert.severity)}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    {getSeverityIcon(alert.severity)}
                    <div>
                      <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                      <p className="text-gray-600 mt-1">{alert.message}</p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <span>{alert.equipment}</span>
                        <span>•</span>
                        <span>{alert.location}</span>
                        <span>•</span>
                        <span>{alert.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {alert.actions.map((action, index) => (
                      <Button
                        key={index}
                        variant={index === 0 ? "default" : "outline"}
                        size="sm"
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardContent className="p-6 space-y-4">
              {recentNotifications.map((notification) => (
                <div 
                  key={notification.id}
                  className="flex items-center gap-4 py-3 border-b last:border-0"
                >
                  {notification.type === 'maintenance' ? (
                    <Clock className="h-4 w-4 text-blue-500" />
                  ) : notification.type === 'system' ? (
                    <Info className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  <div className="flex-1">
                    <p className="text-gray-600">{notification.message}</p>
                    <span className="text-sm text-gray-400">{notification.timestamp}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlertsPage;