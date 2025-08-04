import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Bell, Home, Settings, User, BarChart3, Upload, FileSpreadsheet, Search, Moon, Sun, Download, LineChart, PieChart, RefreshCw, Save } from 'lucide-react';
import { useTheme } from '../App';

// Mock data structure to simulate Excel data
interface DataColumn {
  name: string;
  type: 'number' | 'string' | 'date';
}

interface DataRow {
  [key: string]: number | string | Date;
}

export default function AnalyzePage() {
  const { fileName } = useParams<{ fileName: string }>();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const decodedFileName = fileName ? decodeURIComponent(fileName) : '';

  const [activeTab, setActiveTab] = useState('data');
  const [chartType, setChartType] = useState('bar');
  const [xAxis, setXAxis] = useState<string>('');
  const [yAxis, setYAxis] = useState<string>('');
  const [chartTitle, setChartTitle] = useState('');
  
  // Mock data columns and rows
  const [columns, setColumns] = useState<DataColumn[]>([
    { name: 'Month', type: 'string' },
    { name: 'Revenue', type: 'number' },
    { name: 'Expenses', type: 'number' },
    { name: 'Profit', type: 'number' },
    { name: 'Users', type: 'number' },
    { name: 'Retention', type: 'number' },
  ]);
  
  const [rows, setRows] = useState<DataRow[]>([
    { Month: 'January', Revenue: 45000, Expenses: 32000, Profit: 13000, Users: 1200, Retention: 0.78 },
    { Month: 'February', Revenue: 52000, Expenses: 34000, Profit: 18000, Users: 1450, Retention: 0.82 },
    { Month: 'March', Revenue: 58000, Expenses: 36000, Profit: 22000, Users: 1700, Retention: 0.85 },
    { Month: 'April', Revenue: 61000, Expenses: 35000, Profit: 26000, Users: 1950, Retention: 0.86 },
    { Month: 'May', Revenue: 65000, Expenses: 37000, Profit: 28000, Users: 2100, Retention: 0.87 },
    { Month: 'June', Revenue: 68000, Expenses: 39000, Profit: 29000, Users: 2300, Retention: 0.84 },
  ]);
  
  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  // Auto-select axes on mount
  useEffect(() => {
    // Default to first string column for X-axis and first number column for Y-axis
    const stringColumn = columns.find(col => col.type === 'string')?.name;
    const numberColumn = columns.find(col => col.type === 'number')?.name;
    
    if (stringColumn) setXAxis(stringColumn);
    if (numberColumn) setYAxis(numberColumn);
    
    // Set default chart title
    if (stringColumn && numberColumn) {
      setChartTitle(`${numberColumn} by ${stringColumn}`);
    }
  }, [columns]);
  
  const generateChartPreview = () => {
    // In a real application, this would generate actual charts using libraries like Chart.js, D3.js, or Recharts
    return (
      <div className="flex flex-col items-center justify-center h-[300px] bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
        {chartType === 'bar' && (
          <div className="flex items-end justify-center space-x-4 h-[200px] w-full px-8">
            {rows.map((row, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className="bg-blue-500 dark:bg-blue-600 w-10 rounded-t-sm transition-all duration-500"
                  style={{
                    height: `${(Number(row[yAxis]) / 70000) * 180}px`,
                  }}
                ></div>
                <span className="text-xs mt-2">{String(row[xAxis]).substring(0, 3)}</span>
              </div>
            ))}
          </div>
        )}
        
        {chartType === 'line' && (
          <div className="flex flex-col items-center justify-center">
            <LineChart className="h-24 w-24 text-blue-500 mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Line Chart Preview</p>
          </div>
        )}
        
        {chartType === 'pie' && (
          <div className="flex flex-col items-center justify-center">
            <PieChart className="h-24 w-24 text-blue-500 mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Pie Chart Preview</p>
          </div>
        )}
        
        {chartType === '3d' && (
          <div className="flex flex-col items-center justify-center">
            <div className="h-24 w-24 mb-2 relative">
              <div className="absolute h-16 w-16 bg-blue-500 opacity-70 transform rotate-12 translate-x-2"></div>
              <div className="absolute h-16 w-16 bg-green-500 opacity-70 transform -rotate-12 -translate-x-2"></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">3D Chart Preview</p>
          </div>
        )}
      </div>
    );
  };
  
  const handleSaveChart = () => {
    // In a real app, this would save the chart to a database
    // For now, we'll just navigate back to the dashboard
    navigate('/');
  };
  
  const handleDownloadChart = () => {
    // In a real app, this would generate a downloadable image or PDF
    alert('Chart download functionality would be implemented here');
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
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold flex items-center">
                  <FileSpreadsheet className="mr-2 h-5 w-5" />
                  {decodedFileName}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">Analyze and create visualizations from your data</p>
              </div>
              <Button variant="outline" onClick={() => navigate('/')}>
                Back to Dashboard
              </Button>
            </div>
          </div>

          <Tabs defaultValue="data" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="data">Data View</TabsTrigger>
              <TabsTrigger value="visualize">Create Chart</TabsTrigger>
              <TabsTrigger value="ai">AI Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="data">
              <Card>
                <CardHeader>
                  <CardTitle>Excel Data</CardTitle>
                  <CardDescription>View and explore your uploaded data</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800 text-left">
                          {columns.map((col, i) => (
                            <th key={i} className="p-3 border-b border-r border-gray-200 dark:border-gray-700 text-sm font-medium">
                              {col.name}
                              <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">({col.type})</span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, rowIndex) => (
                          <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800/70">
                            {columns.map((col, colIndex) => (
                              <td key={colIndex} className="p-3 border-b border-r border-gray-200 dark:border-gray-700 text-sm">
                                {String(row[col.name])}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between py-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {rows.length} rows and {columns.length} columns
                  </p>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh Data
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="visualize">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Chart Configuration</CardTitle>
                      <CardDescription>Customize your visualization</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="chartTitle">Chart Title</Label>
                        <Input
                          id="chartTitle"
                          value={chartTitle}
                          onChange={(e) => setChartTitle(e.target.value)}
                          placeholder="Enter chart title"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="chartType">Chart Type</Label>
                        <Select value={chartType} onValueChange={setChartType}>
                          <SelectTrigger id="chartType">
                            <SelectValue placeholder="Select chart type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bar">Bar Chart</SelectItem>
                            <SelectItem value="line">Line Chart</SelectItem>
                            <SelectItem value="pie">Pie Chart</SelectItem>
                            <SelectItem value="3d">3D Chart</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="xAxis">X-Axis</Label>
                        <Select value={xAxis} onValueChange={setXAxis}>
                          <SelectTrigger id="xAxis">
                            <SelectValue placeholder="Select X-axis" />
                          </SelectTrigger>
                          <SelectContent>
                            {columns.map((col, i) => (
                              <SelectItem key={i} value={col.name}>
                                {col.name} ({col.type})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="yAxis">Y-Axis</Label>
                        <Select value={yAxis} onValueChange={setYAxis}>
                          <SelectTrigger id="yAxis">
                            <SelectValue placeholder="Select Y-axis" />
                          </SelectTrigger>
                          <SelectContent>
                            {columns
                              .filter(col => col.type === 'number')
                              .map((col, i) => (
                                <SelectItem key={i} value={col.name}>
                                  {col.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Chart Description (Optional)</Label>
                        <Textarea
                          id="description"
                          placeholder="Add a description for your chart"
                          className="h-20"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={handleDownloadChart}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button onClick={handleSaveChart}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Chart
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="lg:col-span-2">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>{chartTitle || 'Chart Preview'}</CardTitle>
                      <CardDescription>
                        {xAxis && yAxis ? `Showing ${yAxis} data by ${xAxis}` : 'Select axes to see preview'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4">
                      {generateChartPreview()}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="ai">
              <Card>
                <CardHeader>
                  <CardTitle>AI Data Insights</CardTitle>
                  <CardDescription>Get intelligent insights and analysis from your data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <h3 className="text-lg font-medium mb-2">Summary Analysis</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Based on the data analysis, we've detected consistent revenue growth from January to June 2025, with an average increase of 9.2% month-over-month. Expenses are also rising, but at a slower rate of 4.1%, resulting in improved profit margins.
                      </p>
                    </div>
                    
                    <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <h3 className="text-lg font-medium mb-2">Key Findings</h3>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li className="flex items-start">
                          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 p-1 rounded mr-2 text-xs">INSIGHT</span>
                          <span>Profit is growing at a faster rate than revenue, indicating improving operational efficiency.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 p-1 rounded mr-2 text-xs">TREND</span>
                          <span>User growth correlates strongly with revenue growth (correlation coefficient: 0.96).</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 p-1 rounded mr-2 text-xs">ALERT</span>
                          <span>Small dip in retention rate in June might require attention to prevent potential user churn.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <h3 className="text-lg font-medium mb-2">Recommended Charts</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <Button variant="outline" className="justify-start h-auto py-3">
                          <LineChart className="h-5 w-5 mr-2 text-blue-500" />
                          <div className="text-left">
                            <div className="font-medium">Revenue vs. Expenses</div>
                            <div className="text-xs text-gray-500">Line chart showing trends over time</div>
                          </div>
                        </Button>
                        <Button variant="outline" className="justify-start h-auto py-3">
                          <BarChart3 className="h-5 w-5 mr-2 text-green-500" />
                          <div className="text-left">
                            <div className="font-medium">Monthly Profit</div>
                            <div className="text-xs text-gray-500">Bar chart highlighting profit growth</div>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Generate Full AI Report
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}