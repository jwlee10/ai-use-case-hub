import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppStateProvider>
          <SidebarProvider defaultOpen={false}>
            <div className="min-h-screen flex w-full">
              <AppSidebar />
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
          </SidebarProvider>
        </AppStateProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
