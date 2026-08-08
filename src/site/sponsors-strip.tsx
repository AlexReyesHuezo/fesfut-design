/** Forma mínima de un patrocinador (desacoplada del esquema de DB de cada app). */
export interface SponsorItem {
  id: string | number;
  name: string;
  logoUrl: string;
  websiteUrl?: string | null;
}

/** Franja de logos de patrocinadores (escala de grises, color al pasar). */
export function SponsorsStrip({
  sponsors,
  title,
}: {
  sponsors: SponsorItem[];
  title?: string;
}) {
  if (sponsors.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      {title ? <p className="eyebrow mb-7 text-center">{title}</p> : null}
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
        {sponsors.map((s) => {
          const logo = (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={s.logoUrl}
              alt={s.name}
              className="h-10 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-12"
            />
          );
          return s.websiteUrl ? (
            <a
              key={s.id}
              href={s.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={s.name}
            >
              {logo}
            </a>
          ) : (
            <span key={s.id} title={s.name}>
              {logo}
            </span>
          );
        })}
      </div>
    </section>
  );
}
