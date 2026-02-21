import React from "react";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export const LegalLayout = ({
  title,
  lastUpdated,
  children,
}: LegalLayoutProps) => {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <header className="mb-16 border-b border-zinc-900 pb-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            {title}
          </h1>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
            Last Updated: {lastUpdated}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <main className="lg:col-span-8 prose prose-invert prose-zinc max-w-none">
            {children}
          </main>

          {/* Quick Links / Sidebar */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-32 p-6 rounded-3xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">
                Legal Resources
              </h4>
              <nav className="flex flex-col gap-3">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                  (item) => (
                    <a
                      key={item}
                      href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                      className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
                    >
                      {item}
                    </a>
                  ),
                )}
                <hr className="border-zinc-800 my-2" />
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Questions? Contact us at <br />
                  <span className="text-zinc-300">
                    contact@thissidemayur.me
                  </span>
                </p>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
