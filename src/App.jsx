import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import MyRoutine from "./components/pages/MyRoutine";
import Medicines from "./components/pages/Medicines";
import AICompanion from "./components/pages/AICompanion";
import HealthOverview from "./components/pages/HealthOverview";
import MedicalReports from "./components/pages/MedicalReports";
import FindDoctor from "./components/pages/FindDoctor";
import Wellness from "./components/pages/Wellness";
import Family from "./components/pages/Family";
import Payments from "./components/pages/Payments";
import Settings from "./components/pages/Settings";
import Profile from "./components/pages/Profile";
import Login from "./components/Login";
import useAuth from "./hooks/useAuth";
import useProfile from "./hooks/useProfile";
import "./App.css";

export default function App() {
  const { session, user, loading, signOut } = useAuth();
  const { profile, updateProfile, loading: profileLoading } = useProfile(user);
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openMenu = () => setSidebarOpen(true);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f9f8] text-sm text-slate-400">
        Loading...
      </div>
    );
  }

  if (!session) {
    return <Login />;
  }

  if (profileLoading || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f9f8] text-sm text-slate-400">
        Loading your profile...
      </div>
    );
  }

  const renderPage = () => {
    const props = { onOpenMenu: openMenu, onNavigate: setActive, profile, onUpdateProfile: updateProfile, user, signOut };
    switch (active) {
      case "dashboard":
        return <Dashboard {...props} />;
      case "my-routine":
        return <MyRoutine {...props} />;
      case "medicines":
        return <Medicines {...props} />;
      case "ai-companion":
        return <AICompanion {...props} />;
      case "health-overview":
        return <HealthOverview {...props} />;
      case "medical-reports":
        return <MedicalReports {...props} />;
      case "find-doctor":
        return <FindDoctor {...props} />;
      case "wellness":
        return <Wellness {...props} />;
      case "family":
        return <Family {...props} />;
      case "payments":
        return <Payments {...props} />;
      case "settings":
        return <Settings {...props} />;
      case "profile":
        return <Profile {...props} />;
      default:
        return (
          <div className="flex h-screen items-center justify-center px-4 text-center text-slate-400">
            "{active}" page — coming soon
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f6f9f8]">
      <Sidebar
        active={active}
        onNavigate={setActive}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        profile={profile}
      />
      <main className="flex-1 overflow-y-auto">{renderPage()}</main>
    </div>
  );
}
