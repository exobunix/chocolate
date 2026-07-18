import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Products from '@/components/Products';
import Process from '@/components/Process';
import Gifts from '@/components/Gifts';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-screen w-full bg-background overflow-hidden selection:bg-primary/30 text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Products />
        <Process />
        <Gifts />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={Home} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
