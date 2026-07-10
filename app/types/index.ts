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

export interface ActivityPreset {
  name: string;
  icon: string;
  color: string;
  duration: number;
}

export const COMMON_ACTIVITIES: ActivityPreset[] = [
  { name: "Clean your room", icon: "🧹", color: "#f97316", duration: 30 },
  { name: "Empty dishwasher", icon: "🍽️", color: "#0ea5e9", duration: 15 },
  { name: "Watch TV", icon: "📺", color: "#8b5cf6", duration: 30 },
  { name: "Play", icon: "🎮", color: "#22c55e", duration: 60 },
  { name: "Go outside", icon: "🌳", color: "#06b6d4", duration: 60 },
  { name: "Brush teeth", icon: "🪥", color: "#ec4899", duration: 5 },
  { name: "Eat breakfast", icon: "🥞", color: "#eab308", duration: 30 },
  { name: "Eat lunch", icon: "🍎", color: "#eab308", duration: 30 },
  { name: "Eat dinner", icon: "🍽️", color: "#f97316", duration: 45 },
  { name: "Read a book", icon: "📖", color: "#8b5cf6", duration: 30 },
  { name: "Do homework", icon: "📚", color: "#0ea5e9", duration: 45 },
  { name: "Take a bath", icon: "🛁", color: "#06b6d4", duration: 20 },
  { name: "Get dressed", icon: "👕", color: "#ec4899", duration: 15 },
  { name: "Nap time", icon: "😴", color: "#8b5cf6", duration: 90 },
  { name: "School", icon: "🎒", color: "#0ea5e9", duration: 240 },
  { name: "Bedtime", icon: "🌙", color: "#8b5cf6", duration: 30 },
  { name: "Wake up", icon: "🌅", color: "#eab308", duration: 15 },
  { name: "Drawing", icon: "🎨", color: "#ec4899", duration: 30 },
  { name: "Music", icon: "🎵", color: "#f43f5e", duration: 30 },
  { name: "Sports", icon: "⚽", color: "#22c55e", duration: 60 },
];
