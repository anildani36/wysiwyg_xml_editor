import { Info, Layers, Star, Shield } from "lucide-react";

export default function AboutPage() {
  const techStack = [
    {
      name: "Next.js",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      description: "React framework with App Router",
    },
    {
      name: "TypeScript",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      description: "Type-safe development",
    },
    {
      name: "React",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      description: "UI library",
    },
    {
      name: "Tailwind CSS",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      description: "Utility-first CSS framework",
    },
    {
      name: "Slate",
      url: "https://img.icons8.com/fluency/96/000000/text.png",
      description: "Rich text editor framework",
    },
    {
      name: "Zod",
      url: "https://zod.dev/_next/image?url=%2Flogo%2Flogo-glow.png&w=640&q=100",
      description: "Schema validation",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-24">
      <div className="flex items-center gap-3 mb-4">
        <Info className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          About This Project
        </h1>
      </div>

      <div className="mt-8 space-y-8 text-muted-foreground">
        <p className="text-lg">
          This WYSIWYG XML Editor is a modern web application that combines the power
          of rich text editing with XML document structure.
        </p>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <Layers className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Technology Stack</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow"
              >
                <div className="h-20 w-20 mb-4 flex items-center justify-center">
                  <img
                    src={tech.url}
                    alt={tech.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {tech.name}
                </h3>
                <p className="text-sm text-center text-muted-foreground">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <Star className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Features</h2>
          </div>
          <ul className="list-disc space-y-2 pl-6">
            <li>WYSIWYG editing with Slate editor</li>
            <li>Support for images, videos, tables, and links</li>
            <li>Raw XML view with editing and validation</li>
            <li>Round-trip XML serialization</li>
            <li>Keyboard shortcuts for common actions</li>
            <li>Dark/light theme with system preference detection</li>
            <li>Responsive design for mobile and desktop</li>
            <li>Full accessibility support (ARIA labels, keyboard navigation)</li>
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Security & Accessibility</h2>
          </div>
          <div className="space-y-4">
            <p>
              <strong className="text-foreground">Accessibility:</strong> This editor is built with accessibility in mind, featuring keyboard navigation,
              ARIA labels, and screen reader support. All dialogs and interactive elements
              are fully accessible.
            </p>
            <p>
              <strong className="text-foreground">Security:</strong> All user input is validated and sanitized. URL inputs are validated using Zod
              schemas, and XML content is sanitized to prevent XSS attacks. Iframe embeds
              are restricted to known providers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
