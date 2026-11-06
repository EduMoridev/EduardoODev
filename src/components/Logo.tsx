/** Renderiza um SVG de /public tingido com a cor do texto (mask), sem duplicar o path no JS. */
export function Logo({ src, label, className = "size-6" }: { src: string; label: string; className?: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{ maskImage: `url(${src})`, WebkitMaskImage: `url(${src})`, maskSize: "contain", WebkitMaskSize: "contain", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskPosition: "center" }}
    />
  );
}
