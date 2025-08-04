import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, Home, Settings, User, BarChart3, LineChart, PieChart, Upload, FileSpreadsheet, 
  Search, Moon, Sun, Download, Share2, Trash2, MoreVertical, Filter
} from 'lucide-react';
import { useTheme } from '../App';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ChartsPage() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('dateDesc');
  const [activeTab, setActiveTab] = useState('all');
  
  // Mock charts data
  const charts = [
    { 
      id: 1, 
      title: 'Sales Performance Q2 2025',
      type: 'line',
      createdAt: '2025-07-23T14:30:00',
      sourcefile: 'Sales_Q2_2025.xlsx',
      lastViewed: '2 hours ago'
    },
    { 
      id: 2, 
      title: 'Customer Satisfaction Ratings',
      type: 'bar',
      createdAt: '2025-07-21T09:15:00',
      sourcefile: 'Marketing_Survey.xlsx',
      lastViewed: '1 day ago'
    },
    { 
      id: 3, 
      title: 'Product Category Distribution',
      type: 'pie',
      createdAt: '2025-07-19T16:45:00',
      sourcefile: 'Product_Metrics.xlsx',
      lastViewed: '3 days ago'
    },
    { 
      id: 4, 
      title: 'Revenue vs Expenses Trend',
      type: 'line',
      createdAt: '2025-07-17T11:20:00',
      sourcefile: 'Financial_Report_June.xlsx',
      lastViewed: '5 days ago'
    },
    { 
      id: 5, 
      title: 'Monthly User Growth',
      type: 'bar',
      createdAt: '2025-07-12T15:10:00',
      sourcefile: 'Customer_Feedback_2025.xlsx',
      lastViewed: '1 week ago'
    },
    { 
      id: 6, 
      title: 'Market Share by Region',
      type: 'pie',
      createdAt: '2025-07-08T13:25:00',
      sourcefile: 'Sales_Q2_2025.xlsx',
      lastViewed: '2 weeks ago'
    },
    { 
      id: 7, 
      title: 'Employee Satisfaction Scores',
      type: 'bar',
      createdAt: '2025-07-02T10:05:00',
      sourcefile: 'Employee_Survey_Results.xlsx',
      lastViewed: '3 weeks ago'
    },
    { 
      id: 8, 
      title: 'Quarterly Profit Analysis',
      type: 'line',
      createdAt: '2025-06-28T16:20:00',
      sourcefile: 'Financial_Report_June.xlsx',
      lastViewed: '4 weeks ago'
    },
  ];
  
  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  // Filter and sort charts
  const filteredAndSortedCharts = () => {
    let result = [...charts];
    
    // Filter based on search query
    if (searchQuery) {
      result = result.filter(chart => 
        chart.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chart.sourcefile.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter based on tab
    if (activeTab !== 'all') {
      result = result.filter(chart => chart.type === activeTab);
    }
    
    // Sort based on selected option
    switch (sortBy) {
      case 'titleAsc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'titleDesc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'dateAsc':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'dateDesc':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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
  
  // Get chart icon based on type
  const getChartIcon = (type: string) => {
    switch (type) {
      case 'bar':
        return <BarChart3 className="h-full w-full" />;
      case 'line':
        return <LineChart className="h-full w-full" />;
      case 'pie':
        return <PieChart className="h-full w-full" />;
      default:
        return <BarChart3 className="h-full w-full" />;
    }
  };
  
  // Get color based on chart type
  const getChartColor = (type: string) => {
    switch (type) {
      case 'bar':
        return 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400';
      case 'line':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400';
      case 'pie':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
    }
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
              <Button variant="ghost" className="w-full justify-start bg-gray-100 dark:bg-gray-700" onClick={() => navigate('/charts')}>
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
                placeholder="Search charts..." 
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
              <h1 className="text-2xl font-bold">My Charts</h1>
              <p className="text-gray-500 dark:text-gray-400">View and manage your visualizations</p>
            </div>
            <Button onClick={() => navigate('/upload')} className="bg-blue-600 hover:bg-blue-700">
              <Upload className="mr-2 h-4 w-4" />
              Upload New Data
            </Button>
          </div>

          <div className="mb-6">
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="all">All Charts</TabsTrigger>
                  <TabsTrigger value="bar">Bar Charts</TabsTrigger>
                  <TabsTrigger value="line">Line Charts</TabsTrigger>
                  <TabsTrigger value="pie">Pie Charts</TabsTrigger>
                </TabsList>
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
                      <SelectItem value="titleAsc">Title (A-Z)</SelectItem>
                      <SelectItem value="titleDesc">Title (Z-A)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <TabsContent value="all" className="mt-0">
                {renderCharts()}
              </TabsContent>
              
              <TabsContent value="bar" className="mt-0">
                {renderCharts()}
              </TabsContent>
              
              <TabsContent value="line" className="mt-0">
                {renderCharts()}
              </TabsContent>
              
              <TabsContent value="pie" className="mt-0">
                {renderCharts()}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
  
  function renderCharts() {
    const filtered = filteredAndSortedCharts();
    
    if (filtered.length === 0) {
      return (
        <Card>
          <CardContent className="p-8 flex flex-col items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500">
              <BarChart3 className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No charts found</h3>
            <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
              {searchQuery
                ? "No charts match your search criteria"
                : "Upload an Excel file and create charts to see them here"}
            </p>
            <Button 
              className="mt-4"
              onClick={() => navigate('/upload')}
            >
              Upload File
            </Button>
          </CardContent>
        </Card>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((chart) => (
          <Card key={chart.id} className="overflow-hidden">
            <div className="h-48 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4">
              <div className={`h-24 w-24 ${getChartColor(chart.type)}`}>
                {getChartIcon(chart.type)}
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{chart.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={() => navigate(`/analyze/${encodeURIComponent(chart.sourcefile)}`)}>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Edit Chart
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600 dark:text-red-400 focus:text-red-600 focus:dark:text-red-400"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="flex items-center space-x-1">
                <FileSpreadsheet className="h-3.5 w-3.5" />
                <span>{chart.sourcefile}</span>
              </CardDescription>
            </CardHeader>
            <CardFooter className="pt-0 text-xs text-gray-500 flex justify-between">
              <div>Created: {formatDate(chart.createdAt)}</div>
              <div>Last viewed: {chart.lastViewed}</div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
}