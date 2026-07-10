import type { Activity, ActivityStatus, ActivityWithStatus } from "~/types";

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function getCurrentTimeString(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

export function getActivityStatus(
  activity: Activity,
  currentTime: string,
): ActivityStatus {
  const current = timeToMinutes(currentTime);
  const start = timeToMinutes(activity.startTime);
  const end = timeToMinutes(activity.endTime);

  if (end <= current) return "past";
  if (start <= current && end > current) return "current";
  return "future";
}

export function getActivityProgress(
  activity: Activity,
  currentTime: string,
): number {
  const current = timeToMinutes(currentTime);
  const start = timeToMinutes(activity.startTime);
  const end = timeToMinutes(activity.endTime);

  if (current <= start) return 0;
  if (current >= end) return 100;

  return Math.round(((current - start) / (end - start)) * 100);
}

export function getCurrentActivity(
  activities: Activity[],
  currentTime: string,
): Activity | null {
  return (
    activities.find((act) => {
      const status = getActivityStatus(act, currentTime);
      return status === "current";
    }) || null
  );
}

export function enrichActivitiesWithStatus(
  activities: Activity[],
  currentTime: string,
): ActivityWithStatus[] {
  return activities.map((activity) => ({
    ...activity,
    status: getActivityStatus(activity, currentTime),
    progress: getActivityProgress(activity, currentTime),
  }));
}

export function sortActivitiesByTime(activities: Activity[]): Activity[] {
  return [...activities].sort(
    (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime),
  );
}

export function formatTime(time: string, format: "12h" | "24h" = "24h"): string {
  if (format === "24h") return time;

  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const h = hours % 12 || 12;
  return `${h}:${String(minutes).padStart(2, "0")} ${period}`;
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h}h ${m}min`;
  if (h > 0) return `${h}h`;
  return `${m}min`;
}

export function getActivityDuration(activity: Activity): number {
  return timeToMinutes(activity.endTime) - timeToMinutes(activity.startTime);
}
