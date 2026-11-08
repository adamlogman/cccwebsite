import { createFileRoute } from "@tanstack/react-router";
import { AuthCard } from "@/components/site/AuthCard";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Account — Kivora" },
      { name: "description", content: "Register for a Kivora account for faster checkout and exclusive deals." },
      { property: "og:title", content: "Create Account — Kivora" },
      { property: "og:description", content: "Register for a Kivora account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <AuthCard mode="register" />,
});
