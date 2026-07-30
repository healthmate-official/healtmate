import { useState, useRef, useEffect } from "react";
import { Menu, Send, Bot, User, ArrowLeft } from "lucide-react";
import useLocalStorage from "../../hooks/useLocalStorage";
import useSupabaseTable from "../../hooks/useSupabaseTable";
import useHealthMetrics from "../../hooks/useHealthMetrics";

const INITIAL_MESSAGES = [
  {
    id: "m0",
    from: "ai",
    text: "Hi! I'm your HealthMate AI companion. Ask me about your routine, medicines, or how you're doing today.",
  },
];

const SUGGESTIONS = ["How's my hydration today?", "Did I take all my medicines today?", "What's left on my routine today?"];

const TODAY_NAME = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date().getDay()];

// Rule-based responder — still not a real AI model (that step is paused
// until there's budget for an API key), but every fact it states below
// now comes from the person's real Supabase data instead of being
// hardcoded, so at least what it says is true.
function getReply(message, { medicines, todaysRoutine, todayMetrics }) {
  const m = message.toLowerCase();

  if (m.includes("sleep")) {
    if (todayMetrics?.sleep_hours) {
      return `You logged ${todayMetrics.sleep_hours}h of sleep today. Your goal is 8h — ${
        todayMetrics.sleep_hours >= 8 ? "nice, you hit it!" : "try shifting your wind-down routine a bit earlier."
      }`;
    }
    return "You haven't logged your sleep today yet — head to Health Overview and click \"Log today\" to track it.";
  }

  if (m.includes("medicine") || m.includes("medication")) {
    if (medicines.length === 0) return "You don't have any medicines added yet — you can add some on the Medicines page.";
    const taken = medicines.filter((med) => med.status === "taken").length;
    const missed = medicines.filter((med) => med.status === "missed");
    let reply = `You've taken ${taken} of ${medicines.length} medicines today.`;
    if (missed.length > 0) reply += ` You missed: ${missed.map((med) => med.name).join(", ")}.`;
    return reply;
  }

  if (m.includes("hydration") || m.includes("water")) {
    if (todayMetrics?.hydration_liters) {
      return `You're at ${todayMetrics.hydration_liters}L of your 2.5L goal today. ${
        todayMetrics.hydration_liters >= 2.5 ? "Goal reached!" : "Keep sipping — try keeping a bottle at your desk."
      }`;
    }
    return "You haven't logged hydration today yet — log it on the Health Overview page and I can track it for you.";
  }

  if (m.includes("routine") || m.includes("task")) {
    if (todaysRoutine.length === 0) return `You don't have any routine tasks set for ${TODAY_NAME} yet — add some on the My Routine page.`;
    const done = todaysRoutine.filter((r) => r.status === "done").length;
    const remaining = todaysRoutine.filter((r) => r.status !== "done");
    let reply = `Today's routine is ${done} of ${todaysRoutine.length} tasks complete.`;
    if (remaining.length > 0) reply += ` Still left: ${remaining.map((r) => r.title).join(", ")}.`;
    return reply;
  }

  if (m.includes("steps")) {
    if (todayMetrics?.steps) return `You've logged ${todayMetrics.steps.toLocaleString()} steps today, out of your 10,000 goal.`;
    return "No steps logged today yet — log them on the Health Overview page.";
  }

  return "I can answer questions about your medicines, today's routine, sleep, hydration, and steps — try asking about one of those, based on what you've actually logged.";
}

export default function AICompanion({ onOpenMenu, onNavigate, user }) {
  const [messages, setMessages] = useLocalStorage("healthmate_ai_chat", INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  const { rows: medicines } = useSupabaseTable("medicines", user);
  const { rows: allRoutines } = useSupabaseTable("routines", user);
  const { today: todayMetrics } = useHealthMetrics(user);
  const todaysRoutine = allRoutines.filter((r) => r.day_of_week === TODAY_NAME);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg = { id: `u-${Date.now()}`, from: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const aiMsg = { id: `ai-${Date.now()}`, from: "ai", text: getReply(trimmed, { medicines, todaysRoutine, todayMetrics }) };
      setMessages((prev) => [...prev, aiMsg]);
      setTyping(false);
    }, 600);
  };

  return (
    <div className="flex h-screen flex-col bg-[#f6f9f8]">
      <div className="flex items-center gap-3 border-b border-slate-100 bg-white p-4 sm:p-5">
        <button
          type="button"
          onClick={() => onNavigate?.("dashboard")}
          aria-label="Back to dashboard"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open menu"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 lg:hidden"
        >
          <Menu size={18} />
        </button>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white">
          <Bot size={18} />
        </span>
        <div>
          <h1 className="text-base font-bold text-slate-900">AI Companion</h1>
          <p className="text-xs text-slate-500">Ask about your health, routine, or medicines.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-2.5 ${msg.from === "user" ? "flex-row-reverse" : ""}`}>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  msg.from === "ai" ? "bg-teal-600 text-white" : "bg-slate-200 text-slate-600"
                }`}
              >
                {msg.from === "ai" ? <Bot size={15} /> : <User size={15} />}
              </span>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.from === "ai"
                    ? "rounded-tl-sm bg-white text-slate-700 shadow-sm"
                    : "rounded-tr-sm bg-teal-600 text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white">
                <Bot size={15} />
              </span>
              <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {messages.length <= 1 && (
        <div className="mx-auto flex w-full max-w-2xl flex-wrap gap-2 px-4 pb-2 sm:px-6">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => sendMessage(s)}
              className="rounded-full border border-teal-200 bg-white px-3.5 py-1.5 text-xs font-medium text-teal-700 hover:bg-teal-50"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="border-t border-slate-100 bg-white p-4 sm:p-5"
      >
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your AI companion..."
            className="flex-1 rounded-full border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white hover:bg-teal-700"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
