import { useState, useCallback } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const ToastElement = toast ? (
    <div className="fixed bottom-5 left-1/2 z-[70] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2">
      <div
        className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg ${
          toast.type === "error" ? "bg-rose-500" : "bg-teal-600"
        }`}
      >
        {toast.type === "error" ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
        {toast.message}
      </div>
    </div>
  ) : null;

  return { showToast, ToastElement };
}
