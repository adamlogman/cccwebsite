import { createFileRoute } from "@tanstack/react-router";
import { AuthCard } from "@/components/site/AuthCard";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Kivora" },
      { name: "description", content: "Sign in to your Kivora account." },
      { property: "og:title", content: "Sign In — Kivora" },
      { property: "og:description", content: "Sign in to your Kivora account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <AuthCard mode="login" />,
});
