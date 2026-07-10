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

export const storage = {
  getSchedules(): DailySchedule[] {
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
    localStorage.setItem(STORAGE_KEYS.schedules, JSON.stringify(schedules));
  },

  getSettings(): AppSettings {
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
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
  },

  reset() {
    localStorage.removeItem(STORAGE_KEYS.schedules);
    localStorage.removeItem(STORAGE_KEYS.settings);
  },
};
