import type { Route } from "./+types/admin";
import { AdminWeeklyView } from "~/components/admin/AdminWeeklyView";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin - Weekly Schedule" },
    { name: "description", content: "Manage weekly schedule" },
  ];
}

export default function Admin() {
  return <AdminWeeklyView />;
}
