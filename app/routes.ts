import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("admin", "routes/admin.tsx"),
  route("admin/day/:dayOfWeek", "routes/admin-day.tsx"),
] satisfies RouteConfig;
