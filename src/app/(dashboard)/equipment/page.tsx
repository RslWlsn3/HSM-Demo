'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BadgeDelta } from "@tremor/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Plus, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Calendar,
  Box,
  CheckCircle2,
  Wrench,
  AlertTriangle
} from 'lucide-react';

const EquipmentPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample equipment data
  const equipment = [
    {
      id: "EQ001",
      name: "MRI Scanner",
      model: "Siemens Magnetom Vida",
      department: "Radiology",
      status: "Operational",
      lastMaintenance: "2023-12-15",
      nextMaintenance: "2024-01-15",
      condition: "Good",
    },
    {
      id: "EQ002",
      name: "Ventilator",
      model: "Philips Respironics V60",
      department: "ICU",
      status: "Under Maintenance",
      lastMaintenance: "2023-12-10",
      nextMaintenance: "2023-12-31",
      condition: "Fair",
    },
    {
      id: "EQ003",
      name: "X-Ray Machine",
      model: "GE Healthcare Discovery XR656",
      department: "Emergency",
      status: "Critical",
      lastMaintenance: "2023-12-01",
      nextMaintenance: "2023-12-25",
      condition: "Poor",
    },
    {
      id: "EQ004",
      name: "Patient Monitor",
      model: "Philips IntelliVue MX450",
      department: "Surgery",
      status: "Operational",
      lastMaintenance: "2023-12-05",
      nextMaintenance: "2024-01-05",
      condition: "Good",
    },
    {
      id: "EQ005",
      name: "Defibrillator",
      model: "Zoll R Series",
      department: "Cardiology",
      status: "Operational",
      lastMaintenance: "2023-12-08",
      nextMaintenance: "2024-01-08",
      condition: "Good",
    },
  ];

  // Stats data with icons and delta types
  const statsData = [
    { 
      title: "Total Equipment", 
      value: "250", 
      delta: "+12 this month", 
      deltaType: "increase",
      icon: Box
    },
    { 
      title: "Operational", 
      value: "165", 
      delta: "86% of total", 
      deltaType: "moderateIncrease",
      icon: CheckCircle2
    },
    { 
      title: "Under Maintenance", 
      value: "45", 
      delta: "8 scheduled today", 
      deltaType: "moderateDecrease",
      icon: Wrench
    },
    { 
      title: "Critical Issues", 
      value: "13", 
      delta: "Requires attention", 
      deltaType: "decrease",
      icon: AlertTriangle
    },
  ];

  // Function to get status badge color
  const getStatusBadge = (status: string) => {
    const statusColors = {
      'Operational': 'bg-green-100 text-green-800',
      'Under Maintenance': 'bg-yellow-100 text-yellow-800',
      'Critical': 'bg-red-100 text-red-800',
      'End of Life': 'bg-gray-100 text-gray-800'
    } as const;
    return `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}`;
  };

  // Function to get condition indicator color
  const getConditionColor = (condition: string) => {
    const conditionColors = {
      'Good': 'bg-green-500',
      'Fair': 'bg-yellow-500',
      'Poor': 'bg-red-500'
    } as const;
    return `h-2.5 w-2.5 rounded-full ${conditionColors[condition as keyof typeof conditionColors] || 'bg-gray-500'}`;
  };

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Equipment</h1>
          <p className="text-gray-500 mt-1">Manage and monitor medical equipment</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Equipment
        </Button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            className="pl-10"
            placeholder="Search equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="secondary" className="flex items-center">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statsData.map((stat, index) => (
          <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <BadgeDelta deltaType={stat.deltaType} className="mt-2">
                {stat.delta}
              </BadgeDelta>
            </CardContent>
          </Card>
        ))}
      </div>

{/* Equipment Table */}
<Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
  <CardHeader>
    <CardTitle className="text-xl font-semibold">Equipment List</CardTitle>
  </CardHeader>
  <CardContent className="p-0">
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[100px] py-4">ID</TableHead>
            <TableHead className="py-4">Equipment</TableHead>
            <TableHead className="py-4">Department</TableHead>
            <TableHead className="py-4">Status</TableHead>
            <TableHead className="py-4">Condition</TableHead>
            <TableHead className="py-4">Last Maintenance</TableHead>
            <TableHead className="py-4">Next Due</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipment.map((item) => (
            <TableRow 
              key={item.id} 
              className="cursor-pointer transition-colors hover:bg-gray-50 group"
            >
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.model}</div>
                </div>
              </TableCell>
              <TableCell className="font-medium text-gray-900">{item.department}</TableCell>
              <TableCell>
                <div className={getStatusBadge(item.status)}>
                  {item.status}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className={getConditionColor(item.condition)} />
                  <span className="font-medium text-gray-900">{item.condition}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center text-gray-500 group-hover:text-gray-900 transition-colors">
                  <Calendar className="mr-2 h-4 w-4" />
                  {item.lastMaintenance}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center text-gray-500 group-hover:text-gray-900 transition-colors">
                  <Calendar className="mr-2 h-4 w-4" />
                  {item.nextMaintenance}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </CardContent>
</Card>
    </div>
  );
};

export default EquipmentPage;