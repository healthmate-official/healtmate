import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";

// Generic CRUD hook for any table scoped to the logged-in user
// (i.e. it has a user_id column). Handles fetch on load, insert,
// update, and delete — all pages that need "real data" use this
// instead of duplicating the same Supabase calls everywhere.
export default function useSupabaseTable(table, user, { orderBy = "created_at", ascending = true } = {}) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    if (!user) {
      setRows([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("user_id", user.id)
      .order(orderBy, { ascending });

    if (error) setError(error);
    else setRows(data ?? []);
    setLoading(false);
  }, [table, user, orderBy, ascending]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const insertRow = async (fields) => {
    if (!user) return { error: "Not logged in" };
    const { data, error } = await supabase
      .from(table)
      .insert({ ...fields, user_id: user.id })
      .select()
      .single();
    if (!error) setRows((prev) => [...prev, data]);
    return { data, error };
  };

  const updateRow = async (id, fields) => {
    const { data, error } = await supabase
      .from(table)
      .update(fields)
      .eq("id", id)
      .select()
      .single();
    if (!error) setRows((prev) => prev.map((r) => (r.id === id ? data : r)));
    return { data, error };
  };

  const deleteRow = async (id) => {
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (!error) setRows((prev) => prev.filter((r) => r.id !== id));
    return { error };
  };

  return { rows, loading, error, insertRow, updateRow, deleteRow, refresh };
}
