import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { StickyMobileCta } from "@/components/site/StickyMobileCta";
import { Toaster } from "sonner";

function NotFoundComponent() {
  return (
    <section className="bg-charcoal text-sand -mt-16 pt-16 min-h-[calc(100vh-4rem)] flex items-center">
      <div className="max-w-[1200px] mx-auto px-6 py-24 text-center">
        <p className="eyebrow mb-6 text-clay">Lost in the House</p>
        <h1 className="font-display font-bold text-[96px] md:text-[160px] leading-none text-sand">
          404
        </h1>
        <h2 className="mt-4 font-display font-medium text-[28px] md:text-[36px] leading-[1.2] text-sand">
          This room doesn&apos;t exist.
        </h2>
        <p className="mt-4 font-body text-[17px] leading-[1.6] text-sand/70 max-w-md mx-auto">
          The page you&apos;re looking for has moved, or was never on the floor plan. Let&apos;s get
          you back somewhere beautiful.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex bg-sand text-charcoal px-7 py-4 rounded-sm font-body text-[15px] font-semibold tracking-[0.02em] hover:bg-clay hover:text-sand transition-colors duration-150"
          >
            Back home
          </Link>
          <Link
            to="/properties"
            className="inline-flex border border-sand text-sand px-7 py-4 rounded-sm font-body text-[15px] font-semibold tracking-[0.02em] hover:bg-sand hover:text-charcoal transition-colors duration-150"
          >
            Browse our properties
          </Link>
        </div>
        <p className="mt-8 font-mono uppercase tracking-[0.16em] text-[11px] text-sand/50">
          Need a hand?{" "}
          <a
            href="mailto:info@crownmgmt.biz"
            className="underline underline-offset-4 hover:text-clay"
          >
            info@crownmgmt.biz
          </a>
        </p>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Crown PropertyManagement — Stays & Custom Art in DC" },
      {
        name: "description",
        content:
          "Curated short-term residences and original art & furniture from DC and Maryland. Book direct with Crown Property Management.",
      },
      { name: "author", content: "Crown Management" },
      { property: "og:title", content: "Crown PropertyManagement — Stays & Custom Art in DC" },
      {
        property: "og:description",
        content:
          "Curated short-term residences and original art & furniture from DC and Maryland. Book direct with Crown Property Management.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Crown PropertyManagement — Stays & Custom Art in DC" },
      {
        name: "twitter:description",
        content:
          "Curated short-term residences and original art & furniture from DC and Maryland. Book direct with Crown Property Management.",
      },
      {
        property: "og:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/oJ2pS5F28CQHoYB3wVWjijPiFAH2/social-images/social-1782502102897-cm-monogram-clay.webp",
      },
      {
        name: "twitter:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/oJ2pS5F28CQHoYB3wVWjijPiFAH2/social-images/social-1782502102897-cm-monogram-clay.webp",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,700;1,6..96,400&family=Libre+Franklin:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-sand text-charcoal">
        <SiteHeader />
        <main className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <SiteFooter />
        {/* Keeps the sticky mobile CTA from covering the footer's last rows. */}
        <div className="h-20 md:hidden" aria-hidden="true" />
      </div>
      <StickyMobileCta />
      <Toaster position="bottom-right" />
    </QueryClientProvider>
  );
}
