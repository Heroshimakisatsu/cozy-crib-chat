import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUp, Home, Sparkles, Bell } from "lucide-react";
import { examplePrompts } from "@/lib/mock-listings";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Ask for your next home — Nestly" },
      {
        name: "description",
        content:
          "Describe the home you want in plain words and let Nestly's AI match you with verified landlord listings near you.",
      },
      { property: "og:title", content: "Ask for your next home — Nestly" },
      {
        property: "og:description",
        content: "Describe your ideal home in one sentence and get matched listings instantly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Discover,
});

function Discover() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const go = (prompt: string) => {
    if (!prompt.trim()) return;
    navigate({ to: "/results", search: { q: prompt.trim() } });
  };

  return (
    <div className="phone-shell flex flex-col px-6 pb-10 pt-12">
      <div className="flex flex-1 flex-col justify-center py-10">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <Home className="h-6 w-6 text-primary-foreground" strokeWidth={1.8} />
          </div>
          <h1 className="mt-4 text-[28px] leading-tight font-semibold">
            What kind of home
            <br />
            are you looking for?
          </h1>
          <p className="mx-auto mt-2 max-w-[19rem] text-sm text-muted-foreground">
            Describe it in your own words — budget, area, rooms, anything.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            go(value);
          }}
          className="card-soft mt-7 p-3"
        >
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={3}
            placeholder="A quiet 2-bedroom near Melville under R8 000 with a garden…"
            className="w-full resize-none bg-transparent px-2 py-1.5 text-sm leading-relaxed outline-none placeholder:text-muted-foreground"
          />
          <div className="mt-1 flex items-center justify-between">
            <span className="pl-2 text-[11px] text-muted-foreground">Mock results, no sign-up</span>
            <button
              type="submit"
              aria-label="Search homes"
              disabled={!value.trim()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
            >
              <ArrowUp className="h-5 w-5" strokeWidth={2.2} />
            </button>
          </div>
        </form>

        <p className="mt-7 text-xs font-medium text-muted-foreground">Try one of these</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {examplePrompts.map((p) => (
            <button
              key={p.title}
              onClick={() => go(p.prompt)}
              className="card-soft flex h-full flex-col gap-1.5 p-3.5 text-left transition-transform active:scale-[0.98]"
            >
              <span className="text-lg">{p.icon}</span>
              <span className="text-sm font-medium leading-snug">{p.title}</span>
              <span className="line-clamp-2 text-[11px] leading-snug text-muted-foreground">
                {p.prompt}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
