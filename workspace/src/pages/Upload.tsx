import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bell, Home, Settings, User, BarChart3, Upload, FileSpreadsheet, 
  Search, Moon, Sun, AlertCircle, CheckCircle2, X
} from 'lucide-react';
import { useTheme } from '../App';

export default function UploadPage() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  // Handle file upload
  const handleFileUpload = (file: File) => {
    // Check if file is Excel format
    const validExcelTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!validExcelTypes.includes(file.type) && !['xls', 'xlsx'].includes(fileExtension || '')) {
      setUploadStatus('error');
      setUploadError('Only Excel files (.xls or .xlsx) are allowed');
      setUploadedFile(null);
      return;
    }
    
    // File size validation (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      setUploadStatus('error');
      setUploadError('File size exceeds 20MB limit');
      setUploadedFile(null);
      return;
    }
    
    setUploadedFile(file);
    setUploadStatus('uploading');
    
    // Simulate upload process
    setTimeout(() => {
      setUploadStatus('success');
      setUploadError(null);
    }, 1500);
  };
  
  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };
  
  // Handle drag events
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  // Handle drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };
  
  // Trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  // Handle file removal
  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadStatus('idle');
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Handle analyze button click
  const handleAnalyzeClick = () => {
    // In a real app, you'd process the file here
    navigate(`/analyze/${encodeURIComponent(uploadedFile?.name || '')}`);
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
              <Button variant="ghost" className="w-full justify-start bg-gray-100 dark:bg-gray-700" onClick={() => navigate('/upload')}>
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
            <h1 className="text-2xl font-bold">Upload Excel File</h1>
            <p className="text-gray-500 dark:text-gray-400">Upload your Excel file for analysis and visualization</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>File Upload</CardTitle>
              <CardDescription>
                Upload an Excel file (.xls or .xlsx) to analyze and create charts from your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              {uploadStatus === 'error' && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{uploadError}</AlertDescription>
                </Alert>
              )}
              
              {uploadStatus === 'success' ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-md p-4 flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-green-900 dark:text-green-400">File uploaded successfully</p>
                    <p className="text-sm text-green-700 dark:text-green-500 mt-1">Your file is ready for analysis</p>
                  </div>
                </div>
              ) : (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' 
                      : 'border-gray-300 dark:border-gray-700'
                  } transition-all`}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={handleButtonClick}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    onChange={handleFileInputChange}
                  />
                  
                  <FileSpreadsheet className={`h-12 w-12 mb-4 ${
                    dragActive ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'
                  }`} />
                  
                  <p className="text-lg font-medium mb-1">
                    {uploadStatus === 'uploading' ? 'Uploading...' : 'Drag & drop your Excel file here'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
                    or click to browse your files
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Supports .xls and .xlsx files up to 20MB
                  </p>
                </div>
              )}
              
              {uploadedFile && uploadStatus !== 'error' && (
                <div className="mt-6 p-3 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-9 w-9 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <FileSpreadsheet className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{uploadedFile.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleRemoveFile}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
            {uploadedFile && uploadStatus === 'success' && (
              <CardFooter className="flex justify-end">
                <Button onClick={handleAnalyzeClick}>
                  Analyze & Create Charts
                </Button>
              </CardFooter>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
}