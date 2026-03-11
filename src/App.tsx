import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/AppLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Billing from "./pages/Billing";
import Network from "./pages/Network";
import OverstockAgent from "./pages/agents/OverstockAgent";
import MarketTrendAgent from "./pages/agents/MarketTrendAgent";
import DataAgent from "./pages/agents/DataAgent";
import DemandAgent from "./pages/agents/DemandAgent";
import ProfitAgent from "./pages/agents/ProfitAgent";
import BargainAgent from "./pages/agents/BargainAgent";
import ValidationAgent from "./pages/agents/ValidationAgent";
import NotificationAgent from "./pages/agents/NotificationAgent";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/network" element={<Network />} />
        <Route path="/agents/overstock" element={<OverstockAgent />} />
        <Route path="/agents/market-trend" element={<MarketTrendAgent />} />
        <Route path="/agents/data" element={<DataAgent />} />
        <Route path="/agents/demand" element={<DemandAgent />} />
        <Route path="/agents/profit" element={<ProfitAgent />} />
        <Route path="/agents/bargain" element={<BargainAgent />} />
        <Route path="/agents/validation" element={<ValidationAgent />} />
        <Route path="/agents/notifications" element={<NotificationAgent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/" replace /> : <Register />} />
      <Route path="/*" element={<ProtectedRoutes />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
