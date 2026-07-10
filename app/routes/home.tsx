import type { Route } from "./+types/home";
import { ScheduleView } from "~/components/schedule/ScheduleView";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kids App - Daily Schedule" },
    { name: "description", content: "See what is happening today!" },
  ];
}

export default function Home() {
  return <ScheduleView />;
}
