import { useState } from "react";
import { HeartPulse, Mail, Lock, Loader2 } from "lucide-react";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const { error } = mode === "login" ? await signIn(email, password) : await signUp(email, password);

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    if (mode === "signup") {
      setMessage("Account created! Check your email to confirm, then log in.");
      setMode("login");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f9f8] p-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-white">
            <HeartPulse size={22} />
          </span>
          <h1 className="mt-3 text-lg font-bold text-slate-900">HealthMate</h1>
          <p className="text-sm text-slate-500">{mode === "login" ? "Log in to your account" : "Create your account"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            />
          </div>
          <div className="relative">
            <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="password"
              required
              minLength={6}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            />
          </div>

          {error && <p className="text-xs text-rose-500">{error}</p>}
          {message && <p className="text-xs text-teal-600">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-2.5 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
          >
            {loading && <Loader2 size={15} className="animate-spin" />}
            {mode === "login" ? "Log in" : "Sign up"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-500">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError("");
              setMessage("");
            }}
            className="font-semibold text-teal-600 hover:underline"
          >
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}
