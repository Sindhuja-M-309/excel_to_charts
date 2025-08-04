import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Files from './pages/Files';
import Charts from './pages/Charts';
import Analyze from './pages/Analyze';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Create ThemeProvider context
type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
};

const ThemeProvider = ({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      
      root.classList.add(systemTheme);
      return;
    }
    
    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: string) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create a context for theme
import { createContext, useContext } from "react";

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Hook for using theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/files" element={<Files />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/analyze/:fileName" element={<Analyze />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/legacy" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
