export default function HeroMasthead() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-paper px-6 py-24 md:px-8 lg:px-12">
      <h1 className="relative z-10 font-display font-black uppercase leading-[0.8] tracking-tight text-ink">
        <span className="block w-max whitespace-nowrap text-[clamp(5rem,30vw,26rem)]">JNTHN</span>
        <span className="absolute left-1/2 top-full mt-6 w-max max-w-[90vw] -translate-x-1/2 text-center font-mono text-[0.7rem] font-bold uppercase leading-relaxed tracking-[0.2em] text-rust md:text-xs">
          <span className="block">JNTHN is the folio of Jonathan [ Jojo ] Sugondo</span>
          <span className="block text-rust/70">Developer, Analyst &amp; Car Enthusiast</span>
        </span>
      </h1>
    </section>
  );
}
