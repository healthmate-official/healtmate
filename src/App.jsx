import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import "./App.css";

export default function App() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f6f9f8]">
      <Sidebar
        active={active}
        onNavigate={setActive}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="flex-1 overflow-y-auto">
        {active === "dashboard" ? (
          <Dashboard onOpenMenu={() => setSidebarOpen(true)} />
        ) : (
          <div className="flex h-screen items-center justify-center px-4 text-center text-slate-400">
            "{active}" page — coming soon
          </div>
        )}
      </main>
    </div>
  );
}
