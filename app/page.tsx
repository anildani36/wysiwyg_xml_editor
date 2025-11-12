import Link from "next/link";
import { ArrowRight, FileCode, Zap, Shield } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="px-4 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            WYSIWYG XML Editor
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A modern, accessible XML editor with real-time preview and powerful features.
            Built with Next.js, Slate, and TypeScript.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/editor"
              className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary inline-flex items-center"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold leading-6 text-foreground hover:text-primary"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Features
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to edit XML documents efficiently
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="flex flex-col items-center rounded-lg border bg-card hover:shadow-lg transition-shadow p-6 text-center shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <FileCode className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                WYSIWYG Editing
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Edit XML content with a rich text editor powered by Slate.
                Insert images, videos, tables, and links with ease.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center rounded-lg border bg-card hover:shadow-lg transition-shadow p-6 text-center shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                Real-time Preview
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                See your XML content rendered in real-time. Switch between
                WYSIWYG and raw XML view instantly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center rounded-lg border bg-card hover:shadow-lg transition-shadow p-6 text-center shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                Validation & Security
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Built-in XML validation and sanitization. Keyboard shortcuts
                and full accessibility support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Ready to start editing?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Try the editor now and experience the power of WYSIWYG XML editing.
          </p>
          <div className="mt-10">
            <Link
              href="/editor"
              className="rounded-md bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary inline-flex items-center"
            >
              Open Editor
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
