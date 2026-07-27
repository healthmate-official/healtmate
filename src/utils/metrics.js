const GOALS = { steps: 10000, sleep_hours: 8, hydration_liters: 2.5, activity_minutes: 60, breathing_sessions: 5 };

export function buildMetricsGrid(row) {
  const pct = (value, goal) => (value ? Math.min(100, Math.round((value / goal) * 100)) : 0);
  const note = (value, unit) => (value ? `Logged today` : "Not logged yet");
  const noteType = (value) => (value ? "up" : "neutral");

  return [
    { key: "steps", label: "Steps", value: row?.steps ? row.steps.toLocaleString() : "—", goal: `/ ${GOALS.steps.toLocaleString()}`, pct: pct(row?.steps, GOALS.steps), note: note(row?.steps), noteType: noteType(row?.steps), icon: "footprints" },
    { key: "sleep", label: "Sleep", value: row?.sleep_hours ? `${row.sleep_hours}h` : "—", goal: `/ ${GOALS.sleep_hours}h goal`, pct: pct(row?.sleep_hours, GOALS.sleep_hours), note: note(row?.sleep_hours), noteType: noteType(row?.sleep_hours), icon: "moon" },
    { key: "heart_rate", label: "Heart Rate", value: row?.heart_rate ?? "—", goal: "bpm avg", pct: row?.heart_rate ? 70 : 0, note: note(row?.heart_rate), noteType: "neutral", icon: "heart" },
    { key: "hydration", label: "Hydration", value: row?.hydration_liters ? `${row.hydration_liters} L` : "—", goal: `/ ${GOALS.hydration_liters} L`, pct: pct(row?.hydration_liters, GOALS.hydration_liters), note: note(row?.hydration_liters), noteType: noteType(row?.hydration_liters), icon: "droplet" },
    { key: "activity", label: "Activity", value: row?.activity_minutes ? `${row.activity_minutes} min` : "—", goal: `/ ${GOALS.activity_minutes} min`, pct: pct(row?.activity_minutes, GOALS.activity_minutes), note: note(row?.activity_minutes), noteType: noteType(row?.activity_minutes), icon: "activity" },
    { key: "breathing", label: "Breathing", value: row?.breathing_sessions != null ? `${row.breathing_sessions} / ${GOALS.breathing_sessions}` : "—", goal: "sessions done", pct: pct(row?.breathing_sessions, GOALS.breathing_sessions), note: note(row?.breathing_sessions), noteType: noteType(row?.breathing_sessions), icon: "wind" },
  ];
}

// A simple 0-100 "day score" — average of how close each logged metric
// got to its goal. Days with nothing logged score 0 (honest, not faked).
export function computeDayScore(row) {
  if (!row) return 0;
  const parts = [
    row.steps ? Math.min(1, row.steps / GOALS.steps) : 0,
    row.sleep_hours ? Math.min(1, row.sleep_hours / GOALS.sleep_hours) : 0,
    row.hydration_liters ? Math.min(1, row.hydration_liters / GOALS.hydration_liters) : 0,
    row.activity_minutes ? Math.min(1, row.activity_minutes / GOALS.activity_minutes) : 0,
    row.breathing_sessions != null ? Math.min(1, row.breathing_sessions / GOALS.breathing_sessions) : 0,
  ];
  const loggedCount = [row.steps, row.sleep_hours, row.hydration_liters, row.activity_minutes, row.breathing_sessions].filter(
    (v) => v != null
  ).length;
  if (loggedCount === 0) return 0;
  return Math.round((parts.reduce((a, b) => a + b, 0) / loggedCount) * 100);
}

function last7Dates() {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d);
  }
  return dates;
}

export function buildWeeklyProgressData(weekRows) {
  const dates = last7Dates();
  const days = dates.map((d) => {
    const dateStr = d.toISOString().slice(0, 10);
    const row = weekRows.find((r) => r.recorded_date === dateStr);
    return { label: d.toLocaleDateString(undefined, { weekday: "short" }), score: computeDayScore(row) };
  });
  const current = days[days.length - 1]?.score ?? 0;
  return { current, days };
}

// Streak = consecutive days (ending today) where the user actually logged
// something. This measures real logging consistency, not a fake counter.
export function buildStreakData(weekRows) {
  const dates = last7Dates();
  const week = dates.map((d) => {
    const dateStr = d.toISOString().slice(0, 10);
    const logged = weekRows.some((r) => r.recorded_date === dateStr);
    return { label: d.toLocaleDateString(undefined, { weekday: "narrow" }), done: logged };
  });

  let days = 0;
  for (let i = week.length - 1; i >= 0; i--) {
    if (week[i].done) days++;
    else break;
  }

  return { days, week };
}
