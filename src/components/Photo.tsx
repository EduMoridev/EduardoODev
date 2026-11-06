import { profile } from "@/content/profile";

/**
 * Foto recortada (sem fundo) sobre um círculo cream — o terno preto sumiria
 * direto no fundo quase preto. A cabeça "sai" do círculo pelo topo.
 */
export function Photo() {
  return (
    <div className="relative mx-auto w-64 sm:w-80">
      <div className="absolute inset-x-0 bottom-0 aspect-square rounded-full bg-cream" />
      <div className="absolute inset-x-6 bottom-6 aspect-square rounded-full border border-navy/10" />
      <div className="relative overflow-hidden rounded-b-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={profile.photo} alt={`Foto de ${profile.name}`} width={581} height={900}
          className="relative mx-auto -mb-2 w-[82%]" loading="lazy" />
      </div>
    </div>
  );
}
