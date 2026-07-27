import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";

const todayStr = () => new Date().toISOString().slice(0, 10);

function last7Dates() {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

export default function useHealthMetrics(user) {
  const [today, setToday] = useState(null);
  const [weekRows, setWeekRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setToday(null);
      setWeekRows([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const dates = last7Dates();

    const { data } = await supabase
      .from("health_device_data")
      .select("*")
      .eq("user_id", user.id)
      .gte("recorded_date", dates[0])
      .lte("recorded_date", dates[6])
      .order("recorded_date", { ascending: true });

    const rows = data ?? [];
    setWeekRows(rows);
    setToday(rows.find((r) => r.recorded_date === todayStr()) ?? null);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const logToday = async (fields) => {
    if (!user) return { error: "Not logged in" };
    const { data, error } = await supabase
      .from("health_device_data")
      .upsert(
        { ...fields, user_id: user.id, recorded_date: todayStr() },
        { onConflict: "user_id,recorded_date" }
      )
      .select()
      .single();
    if (!error) await refresh();
    return { data, error };
  };

  return { today, weekRows, loading, logToday, refresh };
}
