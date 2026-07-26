import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";

// Maps the database row (snake_case columns) to the shape the UI
// components already expect (camelCase), so Sidebar/Topbar/Profile
// don't need to change how they read profile fields.
function rowToProfile(row, email) {
  const fullName = row?.full_name || "";
  return {
    fullName,
    age: row?.age ?? "",
    gender: row?.gender || "",
    phone: row?.phone || "",
    email: email || "",
    allergies: row?.allergies || "",
    existingConditions: row?.existing_conditions || "",
    plan: row?.plan || "Free plan",
    name: fullName.split(" ")[0] || "there",
  };
}

export default function useProfile(user) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }
    setLoading(true);

    const { data } = await supabase
      .from("health_profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!data) {
      // First time this user has logged in — create their profile row.
      const { data: created } = await supabase
        .from("health_profiles")
        .insert({ user_id: user.id, full_name: user.email.split("@")[0], plan: "Free plan" })
        .select()
        .single();
      setProfile(rowToProfile(created, user.email));
    } else {
      setProfile(rowToProfile(data, user.email));
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const updateProfile = async (draft) => {
    if (!user) return;
    const { data, error } = await supabase
      .from("health_profiles")
      .update({
        full_name: draft.fullName,
        age: draft.age === "" || draft.age == null ? null : Number(draft.age),
        gender: draft.gender,
        phone: draft.phone,
        allergies: draft.allergies,
        existing_conditions: draft.existingConditions,
      })
      .eq("user_id", user.id)
      .select()
      .single();

    if (!error) setProfile(rowToProfile(data, user.email));
    return { error };
  };

  return { profile, updateProfile, loading };
}
