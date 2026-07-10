import type { DailySchedule, AppSettings } from "~/types";

const STORAGE_KEYS = {
  schedules: "app-children_schedules",
  settings: "app-children_settings",
};

const DEFAULT_SETTINGS: AppSettings = {
  currentView: "child",
  notificationSound: true,
  timeFormat: "24h",
  theme: "light",
};

const createDefaultSchedules = (): DailySchedule[] => {
  const days = Array.from({ length: 7 }, (_, i) => ({
    id: `day-${i}`,
    dayOfWeek: i,
    activities: [],
    isTemplate: false,
    updatedAt: new Date().toISOString(),
  }));
  return days;
};

const isBrowser = () => typeof window !== "undefined" && typeof localStorage !== "undefined";

export const storage = {
  getSchedules(): DailySchedule[] {
    if (!isBrowser()) return createDefaultSchedules();

    try {
      const data = localStorage.getItem(STORAGE_KEYS.schedules);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
    }
    const defaults = createDefaultSchedules();
    this.saveSchedules(defaults);
    return defaults;
  },

  saveSchedules(schedules: DailySchedule[]) {
    if (!isBrowser()) return;
    localStorage.setItem(STORAGE_KEYS.schedules, JSON.stringify(schedules));
  },

  getSettings(): AppSettings {
    if (!isBrowser()) return { ...DEFAULT_SETTINGS };

    try {
      const data = localStorage.getItem(STORAGE_KEYS.settings);
      if (data) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
      }
    } catch {
    }
    return { ...DEFAULT_SETTINGS };
  },

  saveSettings(settings: AppSettings) {
    if (!isBrowser()) return;
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
  },

  reset() {
    if (!isBrowser()) return;
    localStorage.removeItem(STORAGE_KEYS.schedules);
    localStorage.removeItem(STORAGE_KEYS.settings);
  },
};
