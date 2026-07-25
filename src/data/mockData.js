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

// weekly routine schedule (routines table, grouped by day) — used on the My Routine page
export const weeklyRoutine = {
  Mon: [
    { id: "w1-1", time: "6:00 AM", title: "Morning Water", detail: "500 ml warm water with lemon", status: "done" },
    { id: "w1-2", time: "6:30 AM", title: "Breathing Exercise", detail: "5-min box breathing (4-4-4-4)", status: "done" },
    { id: "w1-3", time: "8:00 AM", title: "Breakfast", detail: "Oats, banana, green tea", status: "done" },
    { id: "w1-4", time: "10:00 AM", title: "Morning Walk", detail: "30-min brisk walk outdoors", status: "done" },
    { id: "w1-5", time: "1:00 PM", title: "Lunch", detail: "Dal, brown rice, cucumber salad", status: "done" },
    { id: "w1-6", time: "4:00 PM", title: "Exercise Session", detail: "Yoga and core strength training", status: "done" },
    { id: "w1-7", time: "8:00 PM", title: "Dinner", detail: "Light meal, finish before 8:30 PM", status: "done" },
    { id: "w1-8", time: "10:00 PM", title: "Sleep Preparation", detail: "Screen off, wind-down routine", status: "done" },
  ],
  Tue: [
    { id: "w2-1", time: "6:00 AM", title: "Morning Water", detail: "500 ml warm water with lemon", status: "done" },
    { id: "w2-2", time: "6:30 AM", title: "Breathing Exercise", detail: "5-min box breathing (4-4-4-4)", status: "done" },
    { id: "w2-3", time: "8:00 AM", title: "Breakfast", detail: "Poha and green tea", status: "done" },
    { id: "w2-4", time: "10:00 AM", title: "Morning Walk", detail: "30-min brisk walk outdoors", status: "done" },
    { id: "w2-5", time: "1:00 PM", title: "Lunch", detail: "Rajma, rice, salad", status: "done" },
    { id: "w2-6", time: "4:00 PM", title: "Exercise Session", detail: "Strength training", status: "done" },
    { id: "w2-7", time: "8:00 PM", title: "Dinner", detail: "Light meal, finish before 8:30 PM", status: "done" },
    { id: "w2-8", time: "10:00 PM", title: "Sleep Preparation", detail: "Screen off, wind-down routine", status: "done" },
  ],
  Wed: [
    { id: "w3-1", time: "6:00 AM", title: "Morning Water", detail: "500 ml warm water with lemon", status: "done" },
    { id: "w3-2", time: "6:30 AM", title: "Breathing Exercise", detail: "5-min box breathing (4-4-4-4)", status: "done" },
    { id: "w3-3", time: "8:00 AM", title: "Breakfast", detail: "Idli and sambhar", status: "done" },
    { id: "w3-4", time: "10:00 AM", title: "Morning Walk", detail: "30-min brisk walk outdoors", status: "missed" },
    { id: "w3-5", time: "1:00 PM", title: "Lunch", detail: "Dal, brown rice, cucumber salad", status: "done" },
    { id: "w3-6", time: "4:00 PM", title: "Exercise Session", detail: "Yoga and core strength training", status: "done" },
    { id: "w3-7", time: "8:00 PM", title: "Dinner", detail: "Light meal, finish before 8:30 PM", status: "done" },
    { id: "w3-8", time: "10:00 PM", title: "Sleep Preparation", detail: "Screen off, wind-down routine", status: "missed" },
  ],
  Thu: [
    { id: "w4-1", time: "6:00 AM", title: "Morning Water", detail: "500 ml warm water with lemon", status: "done" },
    { id: "w4-2", time: "6:30 AM", title: "Breathing Exercise", detail: "5-min box breathing (4-4-4-4)", status: "done" },
    { id: "w4-3", time: "8:00 AM", title: "Breakfast", detail: "Oats, banana, green tea", status: "done" },
    { id: "w4-4", time: "10:00 AM", title: "Morning Walk", detail: "30-min brisk walk outdoors", status: "done" },
    { id: "w4-5", time: "1:00 PM", title: "Lunch", detail: "Chole, rice, salad", status: "done" },
    { id: "w4-6", time: "4:00 PM", title: "Exercise Session", detail: "Cardio session", status: "done" },
    { id: "w4-7", time: "8:00 PM", title: "Dinner", detail: "Light meal, finish before 8:30 PM", status: "done" },
    { id: "w4-8", time: "10:00 PM", title: "Sleep Preparation", detail: "Screen off, wind-down routine", status: "done" },
  ],
  Fri: [
    { id: "w5-1", time: "6:00 AM", title: "Morning Water", detail: "500 ml warm water with lemon", status: "done" },
    { id: "w5-2", time: "6:30 AM", title: "Breathing Exercise", detail: "5-min box breathing (4-4-4-4)", status: "done" },
    { id: "w5-3", time: "8:00 AM", title: "Breakfast", detail: "Paratha and curd", status: "done" },
    { id: "w5-4", time: "10:00 AM", title: "Morning Walk", detail: "30-min brisk walk outdoors", status: "done" },
    { id: "w5-5", time: "1:00 PM", title: "Lunch", detail: "Dal, brown rice, cucumber salad", status: "done" },
    { id: "w5-6", time: "4:00 PM", title: "Exercise Session", detail: "Yoga and core strength training", status: "missed" },
    { id: "w5-7", time: "8:00 PM", title: "Dinner", detail: "Light meal, finish before 8:30 PM", status: "done" },
    { id: "w5-8", time: "10:00 PM", title: "Sleep Preparation", detail: "Screen off, wind-down routine", status: "done" },
  ],
  Sat: [
    { id: "w6-1", time: "6:30 AM", title: "Morning Water", detail: "500 ml warm water with lemon", status: "done" },
    { id: "w6-2", time: "7:00 AM", title: "Breathing Exercise", detail: "5-min box breathing (4-4-4-4)", status: "done" },
    { id: "w6-3", time: "9:00 AM", title: "Breakfast", detail: "Stuffed paratha", status: "done" },
    { id: "w6-4", time: "10:30 AM", title: "Morning Walk", detail: "45-min walk, longer weekend route", status: "done" },
    { id: "w6-5", time: "1:30 PM", title: "Lunch", detail: "Dal, brown rice, cucumber salad", status: "done" },
    { id: "w6-6", time: "5:00 PM", title: "Exercise Session", detail: "Yoga and core strength training", status: "done" },
    { id: "w6-7", time: "8:30 PM", title: "Dinner", detail: "Light meal, finish before 9:00 PM", status: "done" },
    { id: "w6-8", time: "10:30 PM", title: "Sleep Preparation", detail: "Screen off, wind-down routine", status: "done" },
  ],
  Sun: [
    { id: "w7-1", time: "7:00 AM", title: "Morning Water", detail: "500 ml warm water with lemon", status: "now" },
    { id: "w7-2", time: "7:30 AM", title: "Breathing Exercise", detail: "5-min box breathing (4-4-4-4)", status: "upcoming" },
    { id: "w7-3", time: "9:00 AM", title: "Breakfast", detail: "Oats, banana, green tea", status: "upcoming" },
    { id: "w7-4", time: "10:30 AM", title: "Rest Day", detail: "Light stretching only", status: "upcoming" },
    { id: "w7-5", time: "1:30 PM", title: "Lunch", detail: "Dal, brown rice, cucumber salad", status: "upcoming" },
    { id: "w7-6", time: "8:30 PM", title: "Dinner", detail: "Light meal, finish before 9:00 PM", status: "upcoming" },
    { id: "w7-7", time: "10:30 PM", title: "Sleep Preparation", detail: "Screen off, wind-down routine", status: "upcoming" },
  ],
};

// doctors (find_a_doctor page)
export const doctorsList = [
  { id: "d1", name: "Dr. Priya Sharma", specialization: "Cardiologist", clinic: "AIIMS Delhi", experience: 14, fee: 800, rating: 4.9, reviews: 248 },
  { id: "d2", name: "Dr. Arjun Mehta", specialization: "General Physician", clinic: "Apollo Clinic", experience: 9, fee: 500, rating: 4.7, reviews: 132 },
  { id: "d3", name: "Dr. Sana Khan", specialization: "Dietitian", clinic: "Max Healthcare", experience: 6, fee: 400, rating: 4.8, reviews: 96 },
  { id: "d4", name: "Dr. Rohit Verma", specialization: "Orthopedic", clinic: "Fortis Hospital", experience: 11, fee: 700, rating: 4.6, reviews: 174 },
  { id: "d5", name: "Dr. Neha Kapoor", specialization: "Psychiatrist", clinic: "Manasa Clinic", experience: 8, fee: 600, rating: 4.9, reviews: 88 },
];

// medical_reports
export const medicalReportsList = [
  { id: "rep1", name: "Blood Test - Full Panel", type: "Lab Report", date: "2026-07-10" },
  { id: "rep2", name: "ECG Report", type: "Cardiology", date: "2026-06-28" },
  { id: "rep3", name: "Annual Health Checkup", type: "General", date: "2026-05-15" },
];

// family_members
export const familyMembersList = [
  { id: "fam1", name: "Rajesh Kumar", relation: "Spouse", age: 55 },
  { id: "fam2", name: "Ananya Kumar", relation: "Daughter", age: 24 },
];

// payments
export const paymentsList = [
  { id: "pay1", type: "Consultation - Dr. Priya Sharma", amount: 800, status: "Paid", date: "2026-07-20" },
  { id: "pay2", type: "Premium Plan - Monthly", amount: 299, status: "Paid", date: "2026-07-01" },
  { id: "pay3", type: "Consultation - Dr. Sana Khan", amount: 400, status: "Pending", date: "2026-07-24" },
];

// wellness activities
export const wellnessActivities = [
  { id: "well1", title: "Box Breathing", duration: "5 min", description: "4-4-4-4 breathing pattern to calm the nervous system" },
  { id: "well2", title: "Guided Meditation", duration: "10 min", description: "Body scan meditation for stress relief" },
  { id: "well3", title: "Evening Stretch", duration: "8 min", description: "Gentle stretches to wind down before sleep" },
  { id: "well4", title: "Gratitude Journal", duration: "5 min", description: "Write down 3 things you're grateful for today" },
];

// user profile + settings defaults
export const userProfile = {
  name: "Mom",
  fullName: "Sunita Kumar",
  age: 52,
  gender: "Female",
  phone: "+91 98765 43210",
  email: "sunita.kumar@example.com",
  allergies: "None reported",
  existingConditions: "Type 2 Diabetes, Hypertension",
  plan: "Premium Plan +",
};

export const defaultSettings = {
  notifications: true,
  medicineReminders: true,
  weeklyReport: true,
  darkMode: false,
  units: "Metric",
};
