type Props = {
  title: string;
  description?: string;
  height?: string;
  instructions?: string;
};

// Branded but obviously-a-placeholder slot for RealScout widgets.
// Sergio/Joey replaces these with the actual <realscout-*> custom elements.
export default function WidgetPlaceholder({
  title,
  description,
  height = "auto",
  instructions,
}: Props) {
  return (
    <div
      className="relative border border-dashed border-gold/60 bg-gold/[0.06] rounded-sm px-6 md:px-10 py-12 md:py-16 text-center"
      style={{ minHeight: height }}
    >
      <span className="absolute top-3 left-4 eyebrow text-gold/80 text-[0.62rem]">
        Widget Placeholder
      </span>
      <p className="display-serif text-2xl md:text-[1.85rem] text-navy">{title}</p>
      {description && (
        <p className="mt-3 text-stone-600 text-[0.95rem] max-w-xl mx-auto">
          {description}
        </p>
      )}
      {instructions && (
        <p className="mt-6 text-xs leading-relaxed text-stone-500 max-w-2xl mx-auto font-mono">
          {instructions}
        </p>
      )}
    </div>
  );
}
