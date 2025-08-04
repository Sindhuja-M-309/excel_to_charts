import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Bell, Home, Settings, User, BarChart3, Search, Moon, Sun } from 'lucide-react';
import { useTheme } from '../App';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
  // Mock data for dashboard
  const userStats = [
    { title: 'Total Users', value: '2,345', change: '+12%', trend: 'up' },
    { title: 'Active Today', value: '843', change: '+5%', trend: 'up' },
    { title: 'Revenue', value: '$9,271', change: '+18%', trend: 'up' },
    { title: 'Conversions', value: '12.5%', change: '-2%', trend: 'down' },
  ];

  const recentActivities = [
    { id: 1, user: 'Alex Johnson', action: 'created a new post', time: '2 minutes ago' },
    { id: 2, user: 'Emma Wilson', action: 'updated her profile', time: '1 hour ago' },
    { id: 3, user: 'Michael Brown', action: 'completed a task', time: '3 hours ago' },
    { id: 4, user: 'Sarah Davis', action: 'joined the platform', time: '1 day ago' },
  ];

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">MyWebApp</h1>
        </div>
        <nav className="px-4 py-2">
          <ul className="space-y-2">
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Users
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input 
                type="search" 
                placeholder="Search..." 
                className="w-[300px] pl-8"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                AJ
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Welcome back to your dashboard</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {userStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                      <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                    </div>
                    <Badge variant={stat.trend === 'up' ? "success" : "destructive"} className="text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                  </TabsList>
                  <Button size="sm" variant="outline">Export</Button>
                </div>

                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Overview</CardTitle>
                      <CardDescription>Your app performance over the last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                        <p className="text-gray-500">Chart visualization would go here</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analytics">
                  <Card>
                    <CardHeader>
                      <CardTitle>Detailed Analytics</CardTitle>
                      <CardDescription>In-depth analysis of your application usage</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                        <p className="text-gray-500">Analytics data would go here</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reports">
                  <Card>
                    <CardHeader>
                      <CardTitle>Generated Reports</CardTitle>
                      <CardDescription>Monthly and weekly performance reports</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                        <p className="text-gray-500">Reports would go here</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions from users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b last:border-0 border-gray-100 dark:border-gray-800">
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                          {activity.user.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            <span className="font-semibold">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">View All Activity</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}