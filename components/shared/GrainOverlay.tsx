export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 bg-[url('/grain.gif')] bg-repeat opacity-[0.45] mix-blend-overlay"
    />
  );
}
