import socialLinks from "@/config/social.json";
import siteConfig from "@/config/site.json";

export default function Footer() {
  return (
    <footer className="border-t border-ink/15 bg-paper px-6 py-10 md:px-8 lg:px-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <ul className="flex flex-wrap gap-6">
          {socialLinks.map((socialLink) => (
            <li key={socialLink.platform}>
              <a href={socialLink.url} target="_blank" rel="noopener noreferrer" className="footer-link font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:text-rust">
                {socialLink.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="font-mono text-xs tracking-widest text-ink/60">
          {siteConfig.copyright}
        </p>
      </div>
    </footer>
  );
}