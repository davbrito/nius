"use client";

import { ArticleModel } from "@/lib/api/contract";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import Article from "../Article";

interface HeroCarouselProps {
  articles: ArticleModel[];
}

export default function HeroCarousel({ articles }: HeroCarouselProps) {
  const t = useTranslations("headlines");
  const viewportRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const maxIndex = articles.length - 1;

  const scrollToIndex = (index: number) => {
    const container = viewportRef.current;
    const clamped = Math.max(0, Math.min(index, maxIndex));
    if (!container) return;

    const child = itemRefs.current[clamped];
    if (!child) return;

    setActiveIndex(clamped);
    container.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
  };

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="grid gap-1">
          <p className="text-accent-foreground m-0 text-[0.8rem] font-bold tracking-[0.26em] uppercase">
            {t("front_page_picks")}
          </p>
          <h2 className="font-display m-0 text-[clamp(2.6rem,5vw,4rem)] leading-[0.92]">
            {t("top_headlines")}
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="text-foreground hover:border-accent bg-card/85 hover:bg-card inline-flex h-10 min-w-12 items-center justify-center rounded-full border px-3 text-sm font-semibold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(Math.min(maxIndex, activeIndex + 1))}
            disabled={activeIndex === maxIndex}
            className="text-foreground hover:border-accent bg-card/85 hover:bg-card inline-flex h-10 min-w-[3rem] items-center justify-center rounded-full border px-3 text-sm font-semibold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="no-scrollbar flex touch-pan-x snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth pb-4"
      >
        {articles.map((article, index) => (
          <div
            key={article.url}
            data-index={index}
            ref={(element) => {
              itemRefs.current[index] = element;
            }}
            className="min-w-[min(80vw,28rem)] snap-start md:min-w-[28rem]"
          >
            <Article article={article} />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        {articles.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollToIndex(index)}
            aria-label={t("go_to_slide", { n: index + 1 })}
            aria-pressed={activeIndex === index}
            className={`inline-flex h-3.5 w-3.5 items-center justify-center rounded-full transition ${
              activeIndex === index
                ? "bg-accent"
                : "bg-foreground/16 hover:bg-foreground/24"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
