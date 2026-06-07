"use client";

import { useTranslations } from "next-intl";
import Emoji from "../Emoji";

function PageFooter() {
  const t = useTranslations("footer");
  return (
    <footer className="mx-auto mt-auto flex w-[min(1180px,calc(100%-2rem))] flex-wrap justify-between gap-4 border-t py-6 max-[720px]:w-[min(100%-1rem,1180px)]">
      <div>
        <p className="text-muted-foreground mb-1 text-[0.72rem] tracking-[0.28em] uppercase">
          {t("independent_reader")}
        </p>
        <p className="text-muted-foreground m-0">
          {t.rich("made_with", {
            emoji: () => <Emoji id="heart" />,
            author: () => (
              <a
                href="https://github.com/davbrito"
                className="border-b-accent/35 hover:border-b-accent/80 border-b-2 font-bold no-underline transition"
              >
                davbrito
              </a>
            ),
          })}
        </p>
      </div>
      <p className="text-muted-foreground m-0">
        {t.rich("read_the_code", {
          github: (chunks) => (
            <a
              href="https://github.com/davbrito/nius"
              className="border-b-accent/35 hover:border-b-accent/80 border-b-2 font-bold no-underline transition"
            >
              {chunks}
            </a>
          ),
        })}
      </p>
    </footer>
  );
}

export default PageFooter;
