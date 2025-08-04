import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Bell, Home, Settings, User, BarChart3, Upload, FileSpreadsheet, Search, Moon, Sun, LineChart, PieChart } from 'lucide-react';
import { useTheme } from '../App';

export default function Dashboard() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
  // Mock data for dashboard
  const userStats = [
    { title: 'Files Analyzed', value: '28', change: '+5', trend: 'up' },
    { title: 'Charts Created', value: '143', change: '+12', trend: 'up' },
    { title: 'Data Points', value: '52,841', change: '+18%', trend: 'up' },
    { title: 'Storage Used', value: '64.2MB', change: '+2.1MB', trend: 'up' },
  ];

  const recentFiles = [
    { id: 1, name: 'Sales_Q2_2025.xlsx', size: '2.3MB', date: '2 hours ago', chartCount: 5 },
    { id: 2, name: 'Marketing_Survey.xlsx', size: '4.7MB', date: '1 day ago', chartCount: 3 },
    { id: 3, name: 'Product_Metrics.xlsx', size: '1.2MB', date: '3 days ago', chartCount: 7 },
    { id: 4, name: 'Customer_Feedback_2025.xlsx', size: '8.1MB', date: '1 week ago', chartCount: 4 },
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
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">ExcelViz</h1>
        </div>
        <nav className="px-4 py-2">
          <ul className="space-y-2">
            <li>
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/')}>
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/upload')}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Data
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/files')}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                My Files
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/charts')}>
                <BarChart3 className="mr-2 h-4 w-4" />
                My Charts
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
                placeholder="Search files and charts..." 
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
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-gray-500 dark:text-gray-400">Welcome to your Excel visualization platform</p>
            </div>
            <Button onClick={() => navigate('/upload')} className="bg-blue-600 hover:bg-blue-700">
              <Upload className="mr-2 h-4 w-4" />
              Upload New File
            </Button>
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
              <Card>
                <CardHeader>
                  <CardTitle>Recent Charts</CardTitle>
                  <CardDescription>Your recently generated charts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-[180px] bg-gray-100 dark:bg-gray-800 rounded-md flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700">
                      <LineChart className="h-8 w-8 text-blue-500 mb-2" />
                      <p className="text-sm font-medium">Sales Performance</p>
                      <p className="text-xs text-gray-500">Line Chart • 3 days ago</p>
                    </div>
                    
                    <div className="h-[180px] bg-gray-100 dark:bg-gray-800 rounded-md flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700">
                      <BarChart3 className="h-8 w-8 text-green-500 mb-2" />
                      <p className="text-sm font-medium">Product Comparison</p>
                      <p className="text-xs text-gray-500">Bar Chart • 1 week ago</p>
                    </div>
                    
                    <div className="h-[180px] bg-gray-100 dark:bg-gray-800 rounded-md flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700">
                      <PieChart className="h-8 w-8 text-purple-500 mb-2" />
                      <p className="text-sm font-medium">Market Segments</p>
                      <p className="text-xs text-gray-500">Pie Chart • 2 weeks ago</p>
                    </div>
                    
                    <div className="h-[180px] bg-gray-100 dark:bg-gray-800 rounded-md flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700">
                      <LineChart className="h-8 w-8 text-orange-500 mb-2" />
                      <p className="text-sm font-medium">Customer Trends</p>
                      <p className="text-xs text-gray-500">Area Chart • 3 weeks ago</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/charts')}>
                    View All Charts
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Files</CardTitle>
                  <CardDescription>Your recently uploaded Excel files</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentFiles.map((file) => (
                      <div key={file.id} className="flex items-start space-x-3 pb-3 border-b last:border-0 border-gray-100 dark:border-gray-800">
                        <div className="h-9 w-9 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <FileSpreadsheet className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium">{file.name}</p>
                            <Badge variant="outline" className="text-xs">{file.chartCount} charts</Badge>
                          </div>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>{file.size}</span>
                            <span className="mx-2">•</span>
                            <span>{file.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/files')}>
                    View All Files
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}