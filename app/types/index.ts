export interface Activity {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  color: string;
  icon: string;
  description?: string;
  playSound: boolean;
}

export interface DailySchedule {
  id: string;
  dayOfWeek: number;
  activities: Activity[];
  isTemplate: boolean;
  templateName?: string;
  updatedAt: string;
}

export interface AppSettings {
  currentView: "child" | "admin";
  defaultTemplateId?: string;
  notificationSound: boolean;
  timeFormat: "12h" | "24h";
  theme: "light" | "dark";
}

export type ActivityStatus = "past" | "current" | "future";

export interface ActivityWithStatus extends Activity {
  status: ActivityStatus;
  progress: number;
}

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const DAY_SHORT_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const DEFAULT_ACTIVITY_COLORS = [
  "#f97316",
  "#0ea5e9",
  "#22c55e",
  "#eab308",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
  "#f43f5e",
];

export const DEFAULT_ICONS = [
  "🌅",
  "🥞",
  "🪥",
  "🎒",
  "📚",
  "🍎",
  "🎨",
  "🧩",
  "🎵",
  "⚽",
  "🍽️",
  "🛁",
  "📖",
  "🌙",
  "😴",
];
