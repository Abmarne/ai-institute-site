"use client";

import Link from "next/link";

export default function PublicationDetailClient({ publication }) {
  if (!publication) return <div className="p-6">Publication not found.</div>;

  const {
    title,
    year,
    kind,
    domain,
    description,
    authors = [],
    projects = [],
    themes = [],
    datasets = [],
    docUrl,
    externalUrl,
    slug,
  } = publication;

  const hasLinks = !!(docUrl || externalUrl);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-950 dark:to-slate-950">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-6">
          <Link
            href="/research/publications"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to publications
          </Link>
        </div>

        <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/80 shadow-xl p-8 md:p-10">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide font-semibold text-gray-500 dark:text-gray-400">
            {year ? <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">{year}</span> : null}
            {kind ? <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">{kind}</span> : null}
            {domain ? <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">{domain}</span> : null}
            {slug ? <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">/{slug}</span> : null}
          </div>

          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
            {title}
          </h1>

          {description ? (
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
          ) : null}

          {hasLinks ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {docUrl ? (
                <a
                  href={docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                  View document
                </a>
              ) : null}
              {externalUrl ? (
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                  External link
                </a>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="grid gap-6 mt-8 lg:grid-cols-3">
          <section className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Authors</h2>
              {authors.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {authors.map((author, idx) => {
                    const label = author?.name || author?.slug || "Author";
                    return author?.slug ? (
                      <Link
                        key={`${author.slug}-${idx}`}
                        href={`/people/staff/${encodeURIComponent(author.slug)}`}
                        className="px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 text-sm hover:underline"
                      >
                        {label}
                      </Link>
                    ) : (
                      <span
                        key={`${label}-${idx}`}
                        className="px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 text-sm"
                      >
                        {label}
                      </span>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-3 text-sm text-gray-500">No authors listed.</p>
              )}
            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Related projects</h2>
              {projects.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {projects.map((project, idx) => {
                    const label = project?.title || project?.slug || "Project";
                    return project?.slug ? (
                      <Link
                        key={`${project.slug}-${idx}`}
                        href={`/research/projects/${encodeURIComponent(project.slug)}`}
                        className="px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 text-sm hover:underline"
                      >
                        {label}
                      </Link>
                    ) : (
                      <span
                        key={`${label}-${idx}`}
                        className="px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 text-sm"
                      >
                        {label}
                      </span>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-3 text-sm text-gray-500">No projects linked.</p>
              )}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Themes</h3>
              {themes.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {themes.map((theme, idx) => (
                    <span
                      key={`${theme.slug || theme.name}-${idx}`}
                      className="px-2.5 py-1 rounded-md bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 text-xs font-semibold"
                    >
                      {theme.name || theme.slug}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-gray-500">No themes linked.</p>
              )}
            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Datasets</h3>
              {datasets.length ? (
                <div className="mt-3 space-y-3">
                  {datasets.map((ds, idx) => (
                    <div key={`${ds.slug || ds.title}-${idx}`} className="rounded-lg border border-gray-200 dark:border-gray-800 p-3">
                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                        {ds.title || "Dataset"}
                      </div>
                      {ds.platform ? (
                        <div className="text-xs text-gray-500 mt-1">{ds.platform}</div>
                      ) : null}
                      {ds.url ? (
                        <a
                          href={ds.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex text-xs text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          View dataset
                        </a>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-gray-500">No datasets linked.</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
