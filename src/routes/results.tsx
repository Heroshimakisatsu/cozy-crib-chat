import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Sparkles,
  Star,
  BadgeCheck,
  MapPin,
  Bed,
  Bath,
  Ruler,
  ChevronDown,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listings, aiSummary, type Listing } from "@/lib/mock-listings";

type Search = { q?: string };

export const Route = createFileRoute("/results")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Matched homes and landlords — Nestly" },
      {
        name: "description",
        content:
          "See your AI-matched homes: landlord cards with rent, condition notes, exact location and a direct chat button.",
      },
      { property: "og:title", content: "Matched homes and landlords — Nestly" },
      {
        property: "og:description",
        content: "AI-matched rentals with verified landlord contact details.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Results,
});

function Results() {
  const { q } = Route.useSearch();
  const prompt = q ?? "A comfortable home to rent";
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="phone-shell flex flex-col px-6 pb-14 pt-12">
      <header className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
        <Link
          to="/discover"
          aria-label="Back"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
        </Link>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Your search</p>
          <p className="truncate text-sm font-medium">{prompt}</p>
        </div>
      </header>

      <section className="card-soft mt-5 p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-forest" />
          <span className="text-xs font-semibold text-forest">Nestly AI</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">{aiSummary(prompt)}</p>
      </section>

      <div className="mt-6 flex items-baseline justify-between">
        <h2 className="text-lg font-semibold">{listings.length} landlords</h2>
        <span className="text-xs text-muted-foreground">Best match first</span>
      </div>

      <div className="mt-3 flex flex-col gap-3.5">
        {listings.map((l) => (
          <ListingCard
            key={l.id}
            listing={l}
            open={openId === l.id}
            onToggle={() => setOpenId(openId === l.id ? null : l.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ListingCard({
  listing,
  open,
  onToggle,
}: {
  listing: Listing;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <article className="card-soft overflow-hidden">
      <button onClick={onToggle} className="w-full p-4 text-left" aria-expanded={open}>
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sand text-sm font-semibold text-foreground/80">
            {listing.initials}
          </span>
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-1.5">
              <p className="truncate text-sm font-semibold">{listing.landlord}</p>
              {listing.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-forest" />}
            </div>
            <p className="truncate text-sm text-foreground/80">{listing.title}</p>
            <div className="mt-1 flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{listing.area}</span>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-sm font-semibold text-primary">{listing.price}</p>
            <span className="mt-1 inline-flex items-center gap-0.5 text-xs text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-clay text-clay" />
              {listing.rating}
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Bed className="h-3.5 w-3.5" />
              {listing.beds}
            </span>
            <span className="inline-flex items-center gap-1">
              <Bath className="h-3.5 w-3.5" />
              {listing.baths}
            </span>
            <span className="inline-flex items-center gap-1">
              <Ruler className="h-3.5 w-3.5" />
              {listing.size}
            </span>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {open && (
        <div className="animate-in fade-in slide-in-from-top-1 border-t border-border bg-secondary/40 p-4">
          <p className="text-xs font-semibold text-forest">{listing.available}</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/80">{listing.description}</p>

          <p className="mt-4 text-xs font-medium text-muted-foreground">House condition</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {listing.condition.map((c) => (
              <span
                key={c}
                className="rounded-full border border-border bg-card px-2.5 py-1 text-[11px]"
              >
                {c}
              </span>
            ))}
          </div>

          <p className="mt-4 text-xs font-medium text-muted-foreground">Exact location</p>
          <p className="mt-1 text-sm">{listing.address}</p>

          <div className="mt-4 grid gap-2.5">
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input readOnly value={listing.phone} className="h-11 rounded-xl bg-card pl-10" />
            </div>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input readOnly value={listing.email} className="h-11 rounded-xl bg-card pl-10" />
            </div>
          </div>

          <Button className="mt-3 h-12 w-full rounded-xl text-sm font-semibold">
            <MessageCircle className="mr-1.5 h-4 w-4" />
            Chat with {listing.landlord.split(" ")[0]}
          </Button>
        </div>
      )}
    </article>
  );
}
