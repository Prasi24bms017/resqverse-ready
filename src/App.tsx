import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Intro from "./pages/Intro";
import RoleSelection from "./pages/RoleSelection";
import Home from "./pages/Home";
import SOSPage from "./pages/SOSPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherLogin from "./pages/teacher/TeacherLogin";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import StudentReports from "./pages/teacher/StudentReports";
import SchoolRankings from "./pages/teacher/SchoolRankings";
import InterschoolDrills from "./pages/teacher/InterschoolDrills";
import EmergencyPortal from "./pages/teacher/EmergencyPortal";
import TeacherDonor from "./pages/teacher/TeacherDonor";
import KidsOnboarding from "./pages/kids/KidsOnboarding";
import KidsHome from "./pages/kids/KidsHome";
import KidsRhymes from "./pages/kids/KidsRhymes";
import KidsMatching from "./pages/kids/KidsMatching";
import KidsDrills from "./pages/kids/KidsDrills";
import ParentTeenLogin from "./pages/parent/ParentTeenLogin";
import ParentTeenHome from "./pages/parent/ParentTeenHome";
import LearningScreen from "./pages/parent/LearningScreen";
import AwarenessMap from "./pages/parent/AwarenessMap";
import DonorCommunity from "./pages/parent/DonorCommunity";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* New Flow */}
          <Route path="/" element={<Intro />} />
          <Route path="/role" element={<RoleSelection />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sos" element={<SOSPage />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Teacher */}
          <Route path="/teacher/login" element={<TeacherLogin />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/reports" element={<StudentReports />} />
          <Route path="/teacher/rankings" element={<SchoolRankings />} />
          <Route path="/teacher/drills" element={<InterschoolDrills />} />
          <Route path="/teacher/emergency" element={<EmergencyPortal />} />
          <Route path="/teacher/donor" element={<TeacherDonor />} />

          {/* Kids */}
          <Route path="/kids/onboarding" element={<KidsOnboarding />} />
          <Route path="/kids/home" element={<KidsHome />} />
          <Route path="/kids/rhymes" element={<KidsRhymes />} />
          <Route path="/kids/matching" element={<KidsMatching />} />
          <Route path="/kids/drills" element={<KidsDrills />} />

          {/* Parent/Teen */}
          <Route path="/parent/login" element={<ParentTeenLogin />} />
          <Route path="/parent/home" element={<ParentTeenHome />} />
          <Route path="/parent/learn" element={<LearningScreen />} />
          <Route path="/parent/map" element={<AwarenessMap />} />
          <Route path="/parent/sos" element={<SOSPage />} />
          <Route path="/parent/community" element={<DonorCommunity />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;