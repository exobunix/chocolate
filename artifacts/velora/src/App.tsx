import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import CartDrawer from '@/components/CartDrawer';
import AuthModal from '@/components/AuthModal';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Products from '@/components/Products';
import Process from '@/components/Process';
import Gifts from '@/components/Gifts';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

import ShopPage from '@/pages/Shop';
import CollectionsPage from '@/pages/Collections';
import StoryPage from '@/pages/Story';
import GiftsPage from '@/pages/GiftsPage';
import ContactPage from '@/pages/Contact';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-screen w-full bg-background overflow-hidden selection:bg-primary/30 text-foreground">
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

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/collections" component={CollectionsPage} />
        <Route path="/story" component={StoryPage} />
        <Route path="/gifts" component={GiftsPage} />
        <Route path="/contact" component={ContactPage} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <AuthProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
              <AppRoutes />
              <CartDrawer />
              <AuthModal />
            </WouterRouter>
            <Toaster />
          </AuthProvider>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
