import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SiteConfigProvider } from '@/context/SiteConfigContext';
import AdminPanel from '@/pages/admin/AdminPanel';
import { Toaster } from '@/components/ui/toaster';
import '@/index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SiteConfigProvider>
        <AdminPanel />
        <Toaster />
      </SiteConfigProvider>
    </TooltipProvider>
  </QueryClientProvider>
);
