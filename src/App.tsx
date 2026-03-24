import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNav } from "@/components/TopNav";
import { AppStateProvider } from "@/context/AppStateContext";
import Index from "./pages/Index.tsx";
import AddUseCase from "./pages/AddUseCase.tsx";
import LikedUseCases from "./pages/LikedUseCases.tsx";
import MyUseCases from "./pages/MyUseCases.tsx";
import Leaderboard from "./pages/Leaderboard.tsx";
import OfficeHour from "./pages/OfficeHour.tsx";
import LearningLab from "./pages/LearningLab.tsx";
import EventCalendar from "./pages/EventCalendar.tsx";
import Newsletter from "./pages/Newsletter.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const useCaseLibraryPaths = ["/", "/add", "/liked", "/my-use-cases", "/leaderboard"];

function AppLayout() {
  const location = useLocation();
  const isUseCaseLibrary = useCaseLibraryPaths.includes(location.pathname);

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex flex-col w-full">
        <TopNav />
        <div className="flex flex-1">
          {isUseCaseLibrary && <AppSidebar />}
          <div className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/add" element={<AddUseCase />} />
              <Route path="/liked" element={<LikedUseCases />} />
              <Route path="/my-use-cases" element={<MyUseCases />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/office-hour" element={<OfficeHour />} />
              <Route path="/learning-lab" element={<LearningLab />} />
              <Route path="/event-calendar" element={<EventCalendar />} />
              <Route path="/newsletter" element={<Newsletter />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppStateProvider>
          <AppLayout />
        </AppStateProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
