import { useState, useRef, useEffect } from "react";
import { Menu, Send, Bot, User, ArrowLeft } from "lucide-react";
import useLocalStorage from "../../hooks/useLocalStorage";

const INITIAL_MESSAGES = [
  {
    id: "m0",
    from: "ai",
    text: "Hi! I'm your HealthMate AI companion. Ask me about your routine, medicines, or how you're doing this week.",
  },
];

const SUGGESTIONS = ["How was my sleep this week?", "Did I take all my medicines today?", "Give me a tip for better hydration"];

// Placeholder rule-based responder — swap this for a real API call
// (OpenAI/Claude/your own backend) once one is connected. The chat UI,
// state, and persistence below don't need to change either way.
function getReply(message) {
  const m = message.toLowerCase();
  if (m.includes("sleep")) {
    return "You've averaged 7h 20m of sleep this week — that's close to your 8h goal. Try shifting your wind-down routine 15 minutes earlier for a boost.";
  }
  if (m.includes("medicine") || m.includes("medication")) {
    return "You've taken 2 of 4 medicines today. Lisinopril is upcoming at 2:00 PM, and Omega-3 was marked missed — want a reminder next time?";
  }
  if (m.includes("hydration") || m.includes("water")) {
    return "You're at 1.8L of your 2.5L goal today. Try keeping a bottle at your desk and sipping every hour instead of drinking a lot at once.";
  }
  if (m.includes("routine")) {
    return "Today's routine is 5 of 8 tasks complete. Lunch is marked 'now' — mark it done once you've eaten to keep your streak going.";
  }
  return "Got it — I'll keep that in mind. Once a real AI backend is connected here, I'll be able to give much more personalized answers based on your live health data.";
}

export default function AICompanion({ onOpenMenu, onNavigate }) {
  const [messages, setMessages] = useLocalStorage("healthmate_ai_chat", INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

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
      const aiMsg = { id: `ai-${Date.now()}`, from: "ai", text: getReply(trimmed) };
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
