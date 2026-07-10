import { createContext, useContext, useEffect, useState } from "react";
import type { DailySchedule, AppSettings, Activity } from "~/types";
import { storage } from "~/lib/storage";
import { getCurrentTimeString } from "~/lib/time";

interface AppContextType {
  schedules: DailySchedule[];
  settings: AppSettings;
  currentTime: string;
  updateSchedule: (schedule: DailySchedule) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  addActivity: (dayOfWeek: number, activity: Activity) => void;
  updateActivity: (dayOfWeek: number, activityId: string, activity: Activity) => void;
  deleteActivity: (dayOfWeek: number, activityId: string) => void;
  reorderActivities: (dayOfWeek: number, activities: Activity[]) => void;
  copyDaySchedule: (fromDay: number, toDay: number) => void;
  applyTemplate: (dayOfWeek: number, templateActivities: Activity[]) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [schedules, setSchedules] = useState<DailySchedule[]>(() =>
    storage.getSchedules(),
  );
  const [settings, setSettings] = useState<AppSettings>(() =>
    storage.getSettings(),
  );
  const [currentTime, setCurrentTime] = useState(getCurrentTimeString);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTimeString());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    storage.saveSchedules(schedules);
  }, [schedules]);

  useEffect(() => {
    storage.saveSettings(settings);
  }, [settings]);

  const updateSchedule = (schedule: DailySchedule) => {
    setSchedules((prev) =>
      prev.map((s) => (s.dayOfWeek === schedule.dayOfWeek ? schedule : s)),
    );
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const addActivity = (dayOfWeek: number, activity: Activity) => {
    setSchedules((prev) =>
      prev.map((s) => {
        if (s.dayOfWeek !== dayOfWeek) return s;
        const activities = [...s.activities, activity].sort(
          (a, b) => a.startTime.localeCompare(b.startTime),
        );
        return { ...s, activities, updatedAt: new Date().toISOString() };
      }),
    );
  };

  const updateActivity = (
    dayOfWeek: number,
    activityId: string,
    activity: Activity,
  ) => {
    setSchedules((prev) =>
      prev.map((s) => {
        if (s.dayOfWeek !== dayOfWeek) return s;
        const activities = s.activities
          .map((a) => (a.id === activityId ? activity : a))
          .sort((a, b) => a.startTime.localeCompare(b.startTime));
        return { ...s, activities, updatedAt: new Date().toISOString() };
      }),
    );
  };

  const deleteActivity = (dayOfWeek: number, activityId: string) => {
    setSchedules((prev) =>
      prev.map((s) => {
        if (s.dayOfWeek !== dayOfWeek) return s;
        const activities = s.activities.filter((a) => a.id !== activityId);
        return { ...s, activities, updatedAt: new Date().toISOString() };
      }),
    );
  };

  const reorderActivities = (dayOfWeek: number, activities: Activity[]) => {
    setSchedules((prev) =>
      prev.map((s) => {
        if (s.dayOfWeek !== dayOfWeek) return s;
        return {
          ...s,
          activities: activities.sort((a, b) =>
            a.startTime.localeCompare(b.startTime),
          ),
          updatedAt: new Date().toISOString(),
        };
      }),
    );
  };

  const copyDaySchedule = (fromDay: number, toDay: number) => {
    const source = schedules.find((s) => s.dayOfWeek === fromDay);
    if (!source) return;
    setSchedules((prev) =>
      prev.map((s) => {
        if (s.dayOfWeek !== toDay) return s;
        return {
          ...s,
          activities: source.activities.map((a) => ({
            ...a,
            id: `${a.id}-copy-${Date.now()}`,
          })),
          updatedAt: new Date().toISOString(),
        };
      }),
    );
  };

  const applyTemplate = (dayOfWeek: number, templateActivities: Activity[]) => {
    setSchedules((prev) =>
      prev.map((s) => {
        if (s.dayOfWeek !== dayOfWeek) return s;
        return {
          ...s,
          activities: templateActivities.map((a) => ({
            ...a,
            id: `${a.id}-${Date.now()}`,
          })),
          updatedAt: new Date().toISOString(),
        };
      }),
    );
  };

  return (
    <AppContext.Provider
      value={{
        schedules,
        settings,
        currentTime,
        updateSchedule,
        updateSettings,
        addActivity,
        updateActivity,
        deleteActivity,
        reorderActivities,
        copyDaySchedule,
        applyTemplate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
