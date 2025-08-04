import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bell, 
  Home, 
  Settings, 
  User, 
  ChevronLeft,
  Shield,
  Globe,
  Moon,
  Sun,
  Bell as BellIcon,
  Mail,
  Smartphone
} from 'lucide-react';
import { useTheme } from '../App';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const { theme, setTheme } = useTheme();
  const [darkMode, setDarkMode] = useState(theme === 'dark');
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Product designer and developer based in San Francisco. I enjoy creating user-friendly interfaces that solve real problems.',
  });

  // Mock notification settings
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    newsletter: true,
  });

  // Mock appearance settings
  const [appearance, setAppearance] = useState({
    darkMode: theme === 'dark',
    compactView: false,
    animations: true,
  });
  
  // Sync the darkMode state with the theme context
  useEffect(() => {
    setDarkMode(theme === 'dark');
    setAppearance(prev => ({ ...prev, darkMode: theme === 'dark' }));
  }, [theme]);

  // Handle input changes
  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  // Handle notification toggles
  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  // Handle appearance toggles
  const handleAppearanceChange = (key: string, value: boolean) => {
    if (key === 'darkMode') {
      setDarkMode(value);
      setTheme(value ? 'dark' : 'light');
    }
    setAppearance(prev => ({ ...prev, [key]: value }));
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
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/')}>
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
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="ml-4 text-xl font-semibold">Settings</h1>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <Tabs defaultValue="profile" className="w-full" onValueChange={setActiveTab}>
            <div className="mb-6">
              <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your account information and personal details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={userData.name} 
                      onChange={handleUserDataChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={userData.email} 
                      onChange={handleUserDataChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={userData.phone} 
                      onChange={handleUserDataChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      name="bio" 
                      rows={4} 
                      value={userData.bio} 
                      onChange={handleUserDataChange} 
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Control how you receive notifications and updates.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via email</p>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.email} 
                      onCheckedChange={(checked) => handleNotificationChange('email', checked)} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                        <BellIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive in-app notifications</p>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.push} 
                      onCheckedChange={(checked) => handleNotificationChange('push', checked)} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                        <Smartphone className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive text messages</p>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.sms} 
                      onCheckedChange={(checked) => handleNotificationChange('sms', checked)} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-full">
                        <Mail className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <p className="font-medium">Newsletter</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive weekly updates and tips</p>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.newsletter} 
                      onCheckedChange={(checked) => handleNotificationChange('newsletter', checked)} 
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto">Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>Customize how the application looks and behaves.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                        {darkMode ? (
                          <Moon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        ) : (
                          <Sun className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">Dark Mode</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Toggle between light and dark theme</p>
                      </div>
                    </div>
                    <Switch 
                      checked={appearance.darkMode} 
                      onCheckedChange={(checked) => handleAppearanceChange('darkMode', checked)} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-rose-100 dark:bg-rose-900 rounded-full">
                        <Shield className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                      </div>
                      <div>
                        <p className="font-medium">Compact View</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Use a more compact UI layout</p>
                      </div>
                    </div>
                    <Switch 
                      checked={appearance.compactView} 
                      onCheckedChange={(checked) => handleAppearanceChange('compactView', checked)} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-teal-100 dark:bg-teal-900 rounded-full">
                        <Globe className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <p className="font-medium">Animations</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Enable UI animations and transitions</p>
                      </div>
                    </div>
                    <Switch 
                      checked={appearance.animations} 
                      onCheckedChange={(checked) => handleAppearanceChange('animations', checked)} 
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto">Apply Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}