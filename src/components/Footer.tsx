import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-navy-line/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-cream-mute sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>
          Next.js · TypeScript · Tailwind · React Three Fiber —{" "}
          {/* recrutador técnico gosta de ver o código do próprio portfólio */}
          <a href={profile.links.source} className="underline-offset-4 hover:text-cream hover:underline">código-fonte</a>
          {" · "}<a href="/llms.txt" className="underline-offset-4 hover:text-cream hover:underline">llms.txt</a>
        </p>
      </div>
    </footer>
  );
}
