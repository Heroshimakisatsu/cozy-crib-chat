import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Home, Mail, MapPin, Phone, User, Lock, Eye, EyeOff, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nestly — Sign in or create your house-hunt account" },
      {
        name: "description",
        content:
          "Create a Nestly account or sign in to start an AI-guided house hunt: set your contact details, preferred location and password in one step.",
      },
      { property: "og:title", content: "Nestly — Find your next home" },
      {
        property: "og:description",
        content: "AI-guided house hunting with verified landlords. Register in one step.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"register" | "signin">("register");
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="phone-shell flex flex-col px-6 pb-10 pt-14">
      <header className="flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-[var(--shadow-lift)]">
          <Home className="h-7 w-7 text-primary-foreground" strokeWidth={1.8} />
        </div>
        <h1 className="mt-5 text-3xl font-semibold">Nestly</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Warm, honest house hunting — guided by AI.
        </p>
      </header>

      <div className="mt-7 grid grid-cols-2 gap-1 rounded-full bg-secondary p-1">
        {(["register", "signin"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-full py-2.5 text-sm font-medium transition-colors ${
              mode === m
                ? "bg-card text-foreground shadow-[var(--shadow-soft)]"
                : "text-muted-foreground"
            }`}
          >
            {m === "register" ? "Create account" : "Sign in"}
          </button>
        ))}
      </div>

      <form
        className="mt-6 flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/discover" });
        }}
      >
        {mode === "register" && (
          <Field icon={<User className="h-4 w-4" />} label="Full name">
            <Input placeholder="Thandi Nkosi" className="h-12 rounded-xl bg-card pl-10" required />
          </Field>
        )}
        {mode === "register" && (
          <Field icon={<Phone className="h-4 w-4" />} label="Contact number">
            <Input
              type="tel"
              placeholder="+27 82 000 0000"
              className="h-12 rounded-xl bg-card pl-10"
              required
            />
          </Field>
        )}
        <Field icon={<Mail className="h-4 w-4" />} label="Email address">
          <Input
            type="email"
            placeholder="you@email.com"
            className="h-12 rounded-xl bg-card pl-10"
            required
          />
        </Field>
        {mode === "register" && (
          <Field icon={<MapPin className="h-4 w-4" />} label="Preferred location">
            <Input
              placeholder="Johannesburg, Gauteng"
              className="h-12 rounded-xl bg-card pl-10"
              required
            />
          </Field>
        )}
        <Field icon={<Lock className="h-4 w-4" />} label="Password">
          <Input
            type={showPass ? "text" : "password"}
            placeholder="At least 8 characters"
            className="h-12 rounded-xl bg-card pl-10 pr-11"
            required
          />
          <button
            type="button"
            onClick={() => setShowPass((s) => !s)}
            aria-label={showPass ? "Hide password" : "Show password"}
            className="absolute right-3 top-[38px] text-muted-foreground"
          >
            {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </Field>

        <div className="mt-1 flex items-start gap-2.5 rounded-xl bg-secondary/70 p-3">
          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] bg-forest">
            <Check className="h-3 w-3 text-forest-foreground" strokeWidth={3} />
          </span>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Verified landlords only. Your contact details are never shared until you start a chat.
          </p>
        </div>

        <Button type="submit" className="mt-2 h-13 rounded-xl py-4 text-base font-semibold">
          {mode === "register" ? "Create account" : "Sign in"}
        </Button>
      </form>

      <p className="mt-auto pt-8 text-center text-xs text-muted-foreground">
        By continuing you agree to our terms and privacy notice.
      </p>
    </div>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Label className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</Label>
      <span className="pointer-events-none absolute left-3.5 top-[38px] text-muted-foreground">
        {icon}
      </span>
      {children}
    </div>
  );
}
