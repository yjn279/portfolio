import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("projects", "routes/projects.tsx"),
  route("articles", "routes/articles.tsx"),
  route("profile", "routes/profile.tsx"),
] satisfies RouteConfig;
