import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings,
  Bell,
  Lock,
  Users,
  Calendar,
  Link,
  FileText,
  Database,
  Mail,
  Shield,
  Clock,
  Laptop
} from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your system preferences and configurations</p>
      </div>

      {/* Settings Content */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-white border">
          <TabsTrigger value="general" className="gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Lock className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="integrations" className="gap-2">
            <Link className="h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="gap-2">
            <Calendar className="h-4 w-4" />
            Maintenance
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">System Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Organization Name</Label>
                    <Input placeholder="Enter organization name" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Time Zone</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="et">Eastern Time</SelectItem>
                        <SelectItem value="ct">Central Time</SelectItem>
                        <SelectItem value="mt">Mountain Time</SelectItem>
                        <SelectItem value="pt">Pacific Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Dark Mode</Label>
                      <div className="text-sm text-gray-500">Enable dark mode theme</div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Email Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>System Email</Label>
                    <Input type="email" placeholder="system@example.com" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <div className="text-sm text-gray-500">Receive system notifications via email</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { title: 'Maintenance Due', desc: 'Notify when equipment maintenance is due', icon: Clock },
                { title: 'Critical Alerts', desc: 'Receive alerts for critical equipment issues', icon: Bell },
                { title: 'System Updates', desc: 'Get notified about system updates', icon: Laptop },
                { title: 'Staff Updates', desc: 'Notifications about staff assignments', icon: Users }
              ].map((item, index) => (
                <div key={index} className="flex items-start justify-between py-4 border-b last:border-0">
                  <div className="flex gap-3">
                    <item.icon className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <Label>{item.title}</Label>
                      <div className="text-sm text-gray-500">{item.desc}</div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All notifications</SelectItem>
                        <SelectItem value="important">Important only</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                    <Switch defaultChecked />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-4">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <div className="text-sm text-gray-500">Add an extra layer of security</div>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between py-4 border-t">
                    <div className="space-y-0.5">
                      <Label>Session Timeout</Label>
                      <div className="text-sm text-gray-500">Automatically log out after inactivity</div>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between py-4 border-t">
                    <div className="space-y-0.5">
                      <Label>Password Requirements</Label>
                      <div className="text-sm text-gray-500">Set minimum password requirements</div>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Access Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">View Access Logs</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Integrations Settings */}
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">System Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { 
                  title: 'EHR System',
                  desc: 'Connect with Electronic Health Records',
                  status: 'Connected',
                  icon: Database
                },
                { 
                  title: 'CMMS',
                  desc: 'Computerized Maintenance Management System',
                  status: 'Not Connected',
                  icon: Settings
                },
                { 
                  title: 'Asset Management',
                  desc: 'Equipment and asset tracking system',
                  status: 'Connected',
                  icon: FileText
                },
                { 
                  title: 'Email Service',
                  desc: 'Email notification system',
                  status: 'Connected',
                  icon: Mail
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start justify-between py-4 border-b last:border-0">
                  <div className="flex gap-3">
                    <item.icon className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <Label>{item.title}</Label>
                      <div className="text-sm text-gray-500">{item.desc}</div>
                    </div>
                  </div>
                  <div>
                    <Button 
                      variant={item.status === 'Connected' ? "outline" : "default"}
                      className="min-w-[120px]"
                    >
                      {item.status}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Maintenance Settings */}
        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Maintenance Scheduling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Automatic Scheduling</Label>
                    <div className="text-sm text-gray-500">Enable automatic maintenance scheduling</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <div className="space-y-0.5">
                    <Label>Default Maintenance Window</Label>
                    <div className="text-sm text-gray-500">Set preferred maintenance time slots</div>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <div className="space-y-0.5">
                    <Label>Maintenance Intervals</Label>
                    <div className="text-sm text-gray-500">Set default maintenance frequencies</div>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <div className="space-y-0.5">
                    <Label>PM Schedule Templates</Label>
                    <div className="text-sm text-gray-500">Manage preventive maintenance templates</div>
                  </div>
                  <Button variant="outline">Edit Templates</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;