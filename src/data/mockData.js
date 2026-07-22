// Mock data shaped to match the ER diagram tables.
// Swap these for real API/Supabase/Firebase calls later —
// component props are already shaped to match these fields.

export const currentUser = {
  id: "u1",
  name: "Mom",
  age: 52,
  gender: "female",
};

// health_device_data (today's snapshot, aggregated for the metrics grid)
export const todayMetrics = [
  { key: "steps", label: "Steps", value: "8,234", goal: "/ 10,000", pct: 82, note: "+12%", noteType: "up", icon: "footprints" },
  { key: "sleep", label: "Sleep", value: "7h 20m", goal: "/ 8h goal", pct: 91, note: "Good quality", noteType: "up", icon: "moon" },
  { key: "heart_rate", label: "Heart Rate", value: "72", goal: "bpm avg", pct: 70, note: "Normal range", noteType: "neutral", icon: "heart" },
  { key: "hydration", label: "Hydration", value: "1.8 L", goal: "/ 2.5 L", pct: 72, note: "+0.3L today", noteType: "up", icon: "droplet" },
  { key: "activity", label: "Activity", value: "42 min", goal: "/ 60 min", pct: 70, note: "Active", noteType: "up", icon: "activity" },
  { key: "breathing", label: "Breathing", value: "3 / 5", goal: "sessions done", pct: 60, note: "On track", noteType: "neutral", icon: "wind" },
];

// routines (today's routine, ordered by time)
export const todaysRoutine = [
  { id: "r1", time: "6:00 AM", title: "Morning Water", detail: "500 ml warm water with lemon", status: "done" },
  { id: "r2", time: "6:30 AM", title: "Breathing Exercise", detail: "5-min box breathing (4-4-4-4)", status: "done" },
  { id: "r3", time: "8:00 AM", title: "Breakfast", detail: "Oats, banana, green tea", status: "done" },
  { id: "r4", time: "10:00 AM", title: "Morning Walk", detail: "30-min brisk walk outdoors", status: "done" },
  { id: "r5", time: "1:00 PM", title: "Lunch", detail: "Dal, brown rice, cucumber salad", status: "now" },
  { id: "r6", time: "4:00 PM", title: "Exercise Session", detail: "Yoga and core strength training", status: "upcoming" },
  { id: "r7", time: "8:00 PM", title: "Dinner", detail: "Light meal, finish before 8:30 PM", status: "upcoming" },
  { id: "r8", time: "10:00 PM", title: "Sleep Preparation", detail: "Screen off, wind-down routine", status: "upcoming" },
];

// medicines
export const medicineReminders = [
  { id: "m1", name: "Metformin", dosage: "500 mg", frequency: "8:00 AM", status: "taken" },
  { id: "m2", name: "Vitamin D3", dosage: "2000 IU", frequency: "9:00 AM", status: "taken" },
  { id: "m3", name: "Lisinopril", dosage: "10 mg", frequency: "2:00 PM", status: "upcoming" },
  { id: "m4", name: "Omega-3", dosage: "1000 mg", frequency: "2:00 PM", status: "missed" },
];

// consultations + doctors (joined for display)
export const upcomingConsultation = {
  id: "c1",
  doctor: { name: "Dr. Priya Sharma", specialization: "Cardiologist", clinic: "AIIMS Delhi", rating: 4.9, reviews: 248 },
  scheduledTime: "Today, 4:00 PM",
  countdown: "in 2h 45m",
  type: "Video consultation",
  duration: "30 min",
};

// weekly health score history, derived from health_device_data over 7 days
export const weeklyProgress = {
  current: 82,
  days: [
    { label: "Mon", score: 74 },
    { label: "Tue", score: 78 },
    { label: "Wed", score: 71 },
    { label: "Thu", score: 87 },
    { label: "Fri", score: 79 },
    { label: "Sat", score: 90 },
    { label: "Sun", score: 82 },
  ],
};

// wellness streak, derived from routines completion per day
export const wellnessStreak = {
  days: 7,
  week: [
    { label: "M", done: true },
    { label: "T", done: true },
    { label: "W", done: true },
    { label: "T", done: true },
    { label: "F", done: true },
    { label: "S", done: true },
    { label: "S", done: true },
  ],
};

export const aiInsight = {
  title: "Your heart rate variability improved 12% this week.",
  body: "Keep up your morning walks and sleep schedule — you're on track for a personal best!",
};

export const aiHealthInsight = {
  body: "Based on your sleep and activity patterns, your body recovers best with 7-8 hours of sleep. Try sleeping by 10:30 PM tonight for optimal recovery.",
  actions: ["Sleep tips", "View analysis", "Remind me"],
};

export const dailyCompletion = { done: 5, total: 8, pct: 68 };
