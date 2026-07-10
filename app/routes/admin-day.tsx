import type { Route } from "./+types/admin-day";
import { DayEditor } from "~/components/admin/DayEditor";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin - Edit Day" },
    { name: "description", content: "Edit daily activities" },
  ];
}

export default function AdminDay() {
  return <DayEditor />;
}
