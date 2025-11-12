import * as React from "react";
import Link from "next/link";
import { Github, FileText, Shield } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About section */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              WYSIWYG XML Editor
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A modern, accessible XML editor built with Next.js, Slate, and TypeScript.
            </p>
          </div>

          {/* Links section */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  href="https://github.com/anildani36/wysiwyg_xml_editor"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Built with section */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Built With</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Next.js 15</li>
              <li>Slate Editor</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {currentYear} WYSIWYG XML Editor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
