import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import "./App.css";

export default function App() {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-[#f6f9f8]">
      <Sidebar active={active} onNavigate={setActive} />
      <main className="flex-1 overflow-y-auto">
        {active === "dashboard" ? (
          <Dashboard />
        ) : (
          <div className="flex h-screen items-center justify-center text-slate-400">
            "{active}" page — coming soon
          </div>
        )}
      </main>
    </div>
  );
}
