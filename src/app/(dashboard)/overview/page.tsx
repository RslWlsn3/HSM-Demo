'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeDelta, AreaChart, DonutChart, BarChart, Legend } from "@tremor/react";
import { BellRing, Calendar, Cpu, Shield, Wrench } from 'lucide-react';

export default function OverviewPage() {
  const maintenanceData = [
    { date: "Jan 23", "Completed": 12, "Scheduled": 18, "Overdue": 5 },
    { date: "Feb 23", "Completed": 15, "Scheduled": 20, "Overdue": 4 },
    { date: "Mar 23", "Completed": 18, "Scheduled": 22, "Overdue": 3 },
    { date: "Apr 23", "Completed": 16, "Scheduled": 19, "Overdue": 6 },
    { date: "May 23", "Completed": 21, "Scheduled": 24, "Overdue": 2 },
    { date: "Jun 23", "Completed": 19, "Scheduled": 21, "Overdue": 4 }
  ];

  const equipmentStatus = [
    { name: "Operational", value: 165 },
    { name: "Under Maintenance", value: 45 },
    { name: "Critical", value: 13 },
    { name: "End of Life", value: 27 }
  ];

  const departmentUsage = [
    { department: "Radiology", devices: 45 },
    { department: "ICU", devices: 38 },
    { department: "Surgery", devices: 32 },
    { department: "Emergency", devices: 28 },
    { department: "Cardiology", devices: 25 }
  ];

  return (
    <div className="p-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Assets", value: 250, icon: Cpu, delta: "+12% from last month", deltaType: "increase" },
          { title: "Pending Maintenance", value: 45, icon: Wrench, delta: "-3% from last week", deltaType: "moderateDecrease" },
          { title: "Critical Alerts", value: 13, icon: BellRing, delta: "+2 new alerts", deltaType: "increase" },
          { title: "Compliance Rate", value: "94.2%", icon: Shield, delta: "+1.2% this quarter", deltaType: "moderateIncrease" },
        ].map((item, index) => (
          <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{item.title}</CardTitle>
              <item.icon className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{item.value}</div>
              <BadgeDelta deltaType={item.deltaType} className="mt-2">
                {item.delta}
              </BadgeDelta>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Maintenance Overview</CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <Legend
              categories={["Completed", "Scheduled", "Overdue"]}
              colors={["emerald", "blue", "rose"]}
              className="mb-6"
            />
            <AreaChart
              className="h-72 mt-4"
              data={maintenanceData}
              index="date"
              categories={["Completed", "Scheduled", "Overdue"]}
              colors={["emerald", "blue", "rose"]}
              valueFormatter={(number) => number.toString()}
              showLegend={false}
            />
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Equipment Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <Legend
              categories={["Operational", "Under Maintenance", "Critical", "End of Life"]}
              colors={["emerald", "amber", "rose", "slate"]}
              className="mb-6"
            />
            <DonutChart
              className="h-72 mt-4"
              data={equipmentStatus}
              category="value"
              index="name"
              colors={["emerald", "amber", "rose", "slate"]}
              valueFormatter={(number) => number.toString()}
              showLabel={true}
              showAnimation={true}
              variant="donut"
            />
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Department Equipment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              className="h-72 mt-4"
              data={departmentUsage}
              index="department"
              categories={["devices"]}
              colors={["sky"]}
              valueFormatter={(number) => `${number} devices`}
              showAnimation={true}
              yAxisWidth={48}
            />
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Upcoming Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-4">
              {[
                { device: "MRI Scanner #2", date: "Tomorrow, 10:00 AM", dept: "Radiology" },
                { device: "Ventilator ICU-05", date: "Dec 24, 2:00 PM", dept: "ICU" },
                { device: "X-Ray Machine #3", date: "Dec 26, 9:00 AM", dept: "Emergency" },
                { device: "Patient Monitor #12", date: "Dec 27, 11:00 AM", dept: "Surgery" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <div className="font-medium">{item.device}</div>
                    <div className="text-sm text-gray-500">{item.dept}</div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    {item.date}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}