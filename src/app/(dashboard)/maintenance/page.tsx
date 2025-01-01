'use client'

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
import { BarChart } from "@tremor/react";
import { 
  CalendarDays,
  Clock,
  Wrench,
  ClipboardCheck,
  AlertCircle,
  ChevronRight,
  Plus,
  User2,
  Users,
  BarChart3
} from 'lucide-react';

const MaintenancePage = () => {
  const [selectedView, setSelectedView] = useState('upcoming');
  const [selectedTechnician, setSelectedTechnician] = useState('all');

  // Sample upcoming maintenance tasks
  const upcomingTasks = [
    {
      id: "M001",
      type: "Preventive",
      title: "Quarterly MRI Maintenance",
      equipment: "Siemens Magnetom Vida",
      location: "Imaging Room 2",
      scheduledFor: "Tomorrow, 9:00 AM",
      duration: "4 hours",
      assignedTo: "John Smith",
      status: "scheduled",
      priority: "normal",
      checklist: [
        "Check helium levels",
        "Inspect cooling system",
        "Calibrate gradient system",
        "Test emergency shutdown"
      ]
    },
    {
      id: "M002",
      type: "Corrective",
      title: "Ventilator Repair",
      equipment: "Philips Respironics V60",
      location: "ICU Bay 4",
      scheduledFor: "Today, 2:00 PM",
      duration: "2 hours",
      assignedTo: "Sarah Johnson",
      status: "in-progress",
      priority: "high",
      checklist: [
        "Diagnose alarm system",
        "Test battery backup",
        "Verify pressure settings",
        "Performance validation"
      ]
    },
    {
      id: "M003",
      type: "Calibration",
      title: "X-Ray Calibration",
      equipment: "GE Healthcare Discovery",
      location: "Emergency Room 1",
      scheduledFor: "Jan 3, 11:00 AM",
      duration: "3 hours",
      assignedTo: "Mike Wilson",
      status: "scheduled",
      priority: "normal",
      checklist: [
        "Radiation output test",
        "Image quality check",
        "Safety control verification",
        "Documentation update"
      ]
    }
  ];

  // Sample technician workload data
  const technicianWorkload = [
    { name: "John Smith", assigned: 5, completed: 3, specialty: "Imaging" },
    { name: "Sarah Johnson", assigned: 4, completed: 2, specialty: "Critical Care" },
    { name: "Mike Wilson", assigned: 3, completed: 1, specialty: "General" },
    { name: "Emily Brown", assigned: 6, completed: 4, specialty: "Laboratory" }
  ];

  const getStatusStyle = (status) => {
    const styles = {
      'scheduled': 'bg-blue-50 border-blue-200',
      'in-progress': 'bg-yellow-50 border-yellow-200',
      'completed': 'bg-green-50 border-green-200',
      'overdue': 'bg-red-50 border-red-200'
    };
    return styles[status] || 'bg-gray-50 border-gray-200';
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      'high': 'bg-red-100 text-red-800',
      'normal': 'bg-blue-100 text-blue-800',
      'low': 'bg-gray-100 text-gray-800'
    };
    return `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[priority]}`;
  };

  return (
    <div className="p-8">
      {/* Header with Quick Actions */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maintenance</h1>
          <p className="text-gray-500 mt-1">Schedule and track maintenance tasks</p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedTechnician} onValueChange={setSelectedTechnician}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Technicians" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Technicians</SelectItem>
              {technicianWorkload.map(tech => (
                <SelectItem key={tech.name} value={tech.name}>{tech.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Maintenance
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Calendar and Schedule Column */}
        <div className="col-span-2 space-y-6">
          {/* Schedule Overview Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Schedule Overview</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 border border-gray-200 rounded-lg overflow-hidden">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-3 border-b border-gray-200">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 2; // Adjust starting day
                  const hasTask = [2, 5, 8, 15, 22].includes(day);
                  const isToday = day === 1;
                  return (
                    <div
                      key={i}
                      className={`
                        min-h-[80px] p-2 border-b border-r border-gray-200 relative
                        ${day < 1 ? 'bg-gray-50 text-gray-400' : 'hover:bg-gray-50 cursor-pointer'}
                        ${isToday ? 'bg-blue-50' : ''}
                        ${i % 7 === 6 ? 'border-r-0' : ''}
                        ${i >= 28 ? 'border-b-0' : ''}
                      `}
                    >
                      <span className={`text-sm ${isToday ? 'font-medium' : ''}`}>
                        {day > 0 ? day : ''}
                      </span>
                      {hasTask && (
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingTasks.map((task) => (
                <div 
                  key={task.id}
                  className={`p-4 rounded-lg border ${getStatusStyle(task.status)}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                        <span className={getPriorityBadge(task.priority)}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{task.equipment}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      {task.scheduledFor} ({task.duration})
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <User2 className="h-4 w-4" />
                      {task.assignedTo}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Wrench className="h-4 w-4" />
                      {task.type}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <ClipboardCheck className="h-4 w-4" />
                      {task.checklist.length} checklist items
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Technician Workload */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Technician Workload</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {technicianWorkload.map((tech, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-medium">{tech.name}</div>
                        <div className="text-sm text-gray-500">{tech.specialty}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{tech.assigned} Tasks</div>
                        <div className="text-sm text-gray-500">{tech.completed} Completed</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(tech.completed / tech.assigned) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-blue-600" />
                    <span>Scheduled</span>
                  </div>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span>In Progress</span>
                  </div>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span>Overdue</span>
                  </div>
                  <span className="font-medium">2</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;