import Image from "next/image";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  summary: string;
  image?: string;
};

export function PageHero({ eyebrow, title, summary, image }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-surface-muted">
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/56 to-slate-950/20" />
        </>
      ) : null}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold uppercase text-white backdrop-blur-md">
            {eyebrow}
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/88 md:text-xl md:leading-9">
            {summary}
          </p>
        </div>
      </div>
    </section>
  );
}
