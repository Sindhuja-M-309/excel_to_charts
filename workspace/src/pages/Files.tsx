import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, Home, Settings, User, BarChart3, Upload, FileSpreadsheet, 
  Search, Moon, Sun, Download, Trash2, MoreVertical, Calendar, Filter
} from 'lucide-react';
import { useTheme } from '../App';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function FilesPage() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('dateDesc');
  
  // Mock files data
  const files = [
    { 
      id: 1, 
      name: 'Sales_Q2_2025.xlsx', 
      size: '2.3MB', 
      date: '2025-07-23T14:30:00', 
      chartCount: 5,
      type: 'Excel',
      lastOpened: '2 hours ago',
    },
    { 
      id: 2, 
      name: 'Marketing_Survey.xlsx', 
      size: '4.7MB', 
      date: '2025-07-21T09:15:00', 
      chartCount: 3,
      type: 'Excel',
      lastOpened: '1 day ago',
    },
    { 
      id: 3, 
      name: 'Product_Metrics.xlsx', 
      size: '1.2MB', 
      date: '2025-07-19T16:45:00', 
      chartCount: 7,
      type: 'Excel',
      lastOpened: '3 days ago',
    },
    { 
      id: 4, 
      name: 'Customer_Feedback_2025.xlsx', 
      size: '8.1MB', 
      date: '2025-07-12T11:20:00', 
      chartCount: 4,
      type: 'Excel',
      lastOpened: '1 week ago',
    },
    { 
      id: 5, 
      name: 'Inventory_Status.xlsx', 
      size: '3.5MB', 
      date: '2025-07-10T15:10:00', 
      chartCount: 2,
      type: 'Excel',
      lastOpened: '2 weeks ago',
    },
    { 
      id: 6, 
      name: 'Financial_Report_June.xlsx', 
      size: '5.8MB', 
      date: '2025-06-30T13:25:00', 
      chartCount: 9,
      type: 'Excel',
      lastOpened: '3 weeks ago',
    },
    { 
      id: 7, 
      name: 'Employee_Survey_Results.xlsx', 
      size: '4.2MB', 
      date: '2025-06-25T10:05:00', 
      chartCount: 6,
      type: 'Excel',
      lastOpened: '1 month ago',
    },
  ];
  
  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  // Filter and sort files
  const filteredAndSortedFiles = () => {
    let result = [...files];
    
    // Filter based on search query
    if (searchQuery) {
      result = result.filter(file => 
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort based on selected option
    switch (sortBy) {
      case 'nameAsc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'dateAsc':
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'dateDesc':
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'sizeAsc':
        result.sort((a, b) => parseFloat(a.size) - parseFloat(b.size));
        break;
      case 'sizeDesc':
        result.sort((a, b) => parseFloat(b.size) - parseFloat(a.size));
        break;
      default:
        break;
    }
    
    return result;
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
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
              <Button variant="ghost" className="w-full justify-start bg-gray-100 dark:bg-gray-700" onClick={() => navigate('/files')}>
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
                placeholder="Search files..." 
                className="w-[300px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
              <h1 className="text-2xl font-bold">My Files</h1>
              <p className="text-gray-500 dark:text-gray-400">Manage and analyze your uploaded Excel files</p>
            </div>
            <Button onClick={() => navigate('/upload')} className="bg-blue-600 hover:bg-blue-700">
              <Upload className="mr-2 h-4 w-4" />
              Upload New File
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>All Files</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">Sort by:</span>
                  </div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px] h-8 text-sm">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dateDesc">Newest First</SelectItem>
                      <SelectItem value="dateAsc">Oldest First</SelectItem>
                      <SelectItem value="nameAsc">Name (A-Z)</SelectItem>
                      <SelectItem value="nameDesc">Name (Z-A)</SelectItem>
                      <SelectItem value="sizeDesc">Size (Largest)</SelectItem>
                      <SelectItem value="sizeAsc">Size (Smallest)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <CardDescription>
                {filteredAndSortedFiles().length} Excel files • {
                  files.reduce((acc, file) => acc + parseFloat(file.size), 0).toFixed(1)
                }MB total
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left font-medium p-3">Name</th>
                      <th className="text-left font-medium p-3">Type</th>
                      <th className="text-left font-medium p-3">Size</th>
                      <th className="text-left font-medium p-3">Upload Date</th>
                      <th className="text-left font-medium p-3">Last Opened</th>
                      <th className="text-left font-medium p-3">Charts</th>
                      <th className="text-right font-medium p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedFiles().length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-gray-500">
                          No files found. Upload an Excel file to get started.
                        </td>
                      </tr>
                    ) : (
                      filteredAndSortedFiles().map((file) => (
                        <tr 
                          key={file.id} 
                          className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/70 cursor-pointer"
                          onClick={() => navigate(`/analyze/${encodeURIComponent(file.name)}`)}
                        >
                          <td className="p-3 flex items-center space-x-2">
                            <div className="h-8 w-8 rounded bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                              <FileSpreadsheet className="h-4 w-4" />
                            </div>
                            <span className="font-medium">{file.name}</span>
                          </td>
                          <td className="p-3">{file.type}</td>
                          <td className="p-3">{file.size}</td>
                          <td className="p-3">{formatDate(file.date)}</td>
                          <td className="p-3">{file.lastOpened}</td>
                          <td className="p-3">
                            <Badge variant="outline">{file.chartCount} charts</Badge>
                          </td>
                          <td className="p-3 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/analyze/${encodeURIComponent(file.name)}`);
                                }}>
                                  <BarChart3 className="mr-2 h-4 w-4" />
                                  Analyze
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-red-600 dark:text-red-400 focus:text-red-600 focus:dark:text-red-400"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between py-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Files are saved in your account. <span className="text-blue-600 hover:underline cursor-pointer">Learn more</span>
              </p>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}