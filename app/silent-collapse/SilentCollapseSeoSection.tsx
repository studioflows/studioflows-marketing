import {
  buildSilentCollapseDefinition,
  buildSilentCollapseFaqItems,
  buildSilentCollapseJsonLd,
} from "@/lib/llms-corpus";

export default function SilentCollapseSeoSection() {
  const definition = buildSilentCollapseDefinition();
  const faqItems = buildSilentCollapseFaqItems();
  const jsonLd = buildSilentCollapseJsonLd();

  return (
    <section id="silent-collapse-faq" className="mx-auto max-w-6xl px-6 pb-16 pt-8">
      <h2 className="text-2xl font-semibold text-white">What is silent operational collapse?</h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-300">{definition}</p>

      <h2 className="mt-10 text-2xl font-semibold text-white">Silent Collapse FAQ</h2>
      <dl className="mt-6 space-y-6">
        {faqItems.map((item) => (
          <div key={item.question}>
            <dt className="text-lg font-medium text-zinc-100">{item.question}</dt>
            <dd className="mt-2 text-base leading-7 text-zinc-400">{item.answer}</dd>
          </div>
        ))}
      </dl>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
