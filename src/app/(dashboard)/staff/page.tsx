'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart } from "@tremor/react";
import {
  User2,
  Calendar,
  Award,
  BookOpen,
  Clock,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  Wrench,
  GraduationCap,
  UserPlus,
  Users
} from 'lucide-react';

const StaffPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedView, setSelectedView] = useState('active');

  // Sample staff data
  const staffMembers = [
    {
      id: 1,
      name: "John Smith",
      role: "Senior Biomedical Engineer",
      specialty: "Imaging Equipment",
      status: "available",
      department: "Radiology",
      certifications: ["CBET", "CRES"],
      upcomingCertifications: ["MRI Safety"],
      currentTasks: 3,
      completedTasks: 45,
      availability: "On Duty",
      expertise: [
        { area: "Imaging", level: "Expert", yearsExp: 8, certifications: ["CBET", "CRES"] },
        { area: "Mechanical", level: "Advanced", yearsExp: 6, certifications: ["CBET"] },
        { area: "Electronic", level: "Advanced", yearsExp: 5, certifications: ["CBET"] },
        { area: "Software", level: "Intermediate", yearsExp: 3, certifications: [] }
      ],
      specializations: ["MRI", "CT", "X-Ray"],
      certExpiring: "CBET - 3 months",
      performanceMetrics: {
        avgCompletionTime: "3.2 hours",
        successRate: "97%",
        satisfactionScore: 4.8
      }
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Biomedical Technician II",
      specialty: "Critical Care Equipment",
      status: "busy",
      department: "ICU",
      certifications: ["CBET"],
      upcomingCertifications: ["CRES"],
      currentTasks: 5,
      completedTasks: 38,
      availability: "On Task",
      expertise: [
        { area: "Ventilators", level: "Expert", yearsExp: 7, certifications: ["CBET"] },
        { area: "Monitors", level: "Advanced", yearsExp: 5, certifications: ["CBET"] },
        { area: "Pumps", level: "Advanced", yearsExp: 4, certifications: ["CBET"] },
        { area: "Diagnostic", level: "Intermediate", yearsExp: 2, certifications: [] }
      ],
      specializations: ["Ventilators", "Patient Monitors"],
      certExpiring: null,
      performanceMetrics: {
        avgCompletionTime: "2.8 hours",
        successRate: "95%",
        satisfactionScore: 4.6
      }
    },
    // Add more staff members as needed
  ];

  const getStatusColor = (status) => {
    return {
      available: 'bg-green-500',
      busy: 'bg-yellow-500',
      offline: 'bg-gray-500',
      training: 'bg-blue-500'
    }[status] || 'bg-gray-500';
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('');
  };

  // Training and certification data
  const upcomingTraining = [
    {
      title: "MRI Safety Certification",
      date: "Jan 15, 2024",
      participants: 3,
      type: "Certification",
      duration: "2 days"
    },
    {
      title: "New Ventilator Systems",
      date: "Jan 22, 2024",
      participants: 5,
      type: "Training",
      duration: "1 day"
    }
  ];

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Technical Staff</h1>
          <p className="text-gray-500 mt-1">Manage biomedical engineers and technicians</p>
        </div>
        <div className="flex gap-3">
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
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Staff
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Staff Cards Column */}
        <div className="col-span-2 space-y-6">
          {staffMembers.map((staff) => (
            <Card key={staff.id} className="hover:shadow-lg transition-shadow duration-200 overflow-hidden">
              {/* Top Banner with Status */}
              <div className={`h-1 w-full ${staff.status === 'available' ? 'bg-green-500' : 'bg-yellow-500'}`} />
              
              <CardContent className="p-0">
                {/* Header Section */}
                <div className="p-6 bg-gray-50 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 ring-2 ring-white">
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                          {getInitials(staff.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg text-gray-900">{staff.name}</h3>
                          <div className={`px-2 py-0.5 text-xs rounded-full ${
                            staff.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {staff.status === 'available' ? 'Available' : 'On Task'}
                          </div>
                        </div>
                        <p className="text-gray-600">{staff.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Calendar className="h-4 w-4" />
                        Schedule
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Wrench className="h-4 w-4" />
                        Assign Task
                      </Button>
                    </div>
                  </div>

                  {/* Metrics Bar */}
                  <div className="flex gap-6 mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-500">Current Tasks</div>
                        <div className="font-medium">{staff.currentTasks}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <div>
                        <div className="text-sm text-gray-500">Success Rate</div>
                        <div className="font-medium">{staff.performanceMetrics.successRate}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <div>
                        <div className="text-sm text-gray-500">Avg. Completion</div>
                        <div className="font-medium">{staff.performanceMetrics.avgCompletionTime}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 grid grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">Expertise & Certifications</h4>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary" className="bg-blue-50">{staff.specialty}</Badge>
                        {staff.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline">{cert}</Badge>
                        ))}
                      </div>
                      {staff.certExpiring && (
                        <div className="flex items-center gap-2 text-sm text-yellow-600 bg-yellow-50 px-3 py-2 rounded-md">
                          <AlertCircle className="h-4 w-4" />
                          Certification Expiring: {staff.certExpiring}
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Equipment Specializations</h4>
                      <div className="flex flex-wrap gap-2">
                        {staff.specializations.map((spec, index) => (
                          <Badge key={index} variant="secondary" className="bg-gray-100">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                                      <div>
                    <h4 className="font-medium mb-3">Expertise Areas</h4>
                    <div className="space-y-3">
                      {staff.expertise.map((exp) => (
                        <div key={exp.area} className="p-3 rounded-lg border bg-gray-50/50">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-medium text-gray-900">{exp.area}</span>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-sm px-2 py-0.5 rounded ${
                                  exp.level === 'Expert' ? 'bg-blue-100 text-blue-700' :
                                  exp.level === 'Advanced' ? 'bg-green-100 text-green-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {exp.level}
                                </span>
                                <span className="text-sm text-gray-500">{exp.yearsExp} years</span>
                              </div>
                            </div>
                            {exp.certifications.length > 0 && (
                              <div className="flex gap-1">
                                {exp.certifications.map((cert) => (
                                  <span key={cert} className="text-xs px-2 py-1 bg-white rounded border text-gray-600">
                                    {cert}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Training & Certification Card */}
          <Card className="shadow-md border-0 mb-6">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Training & Certification
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 divide-y">
              {upcomingTraining.map((training, index) => (
                <div key={index} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{training.title}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{training.date}</span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-600">{training.duration}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {training.participants} participants
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="shrink-0">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  View All Training
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Certification Status Card */}
          <Card className="shadow-md border-0 mb-6">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Award className="h-5 w-5" />
                Certification Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                  <div className="text-2xl font-bold text-emerald-600">12</div>
                  <div className="text-sm font-medium text-emerald-600">Active</div>
                </div>
                <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                  <div className="text-2xl font-bold text-amber-600">3</div>
                  <div className="text-sm font-medium text-amber-600">Expiring Soon</div>
                </div>
              </div>
              <Button className="w-full bg-purple-50 text-purple-600 hover:bg-purple-100">
                Manage Certifications
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="shadow-md border-0">
            <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <Button className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Training
              </Button>
              <Button className="w-full bg-purple-50 text-purple-600 hover:bg-purple-100 justify-start">
                <Award className="h-4 w-4 mr-2" />
                Add Certification
              </Button>
              <Button className="w-full bg-gray-50 text-gray-600 hover:bg-gray-100 justify-start">
                <User2 className="h-4 w-4 mr-2" />
                Update Staff Records
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StaffPage;