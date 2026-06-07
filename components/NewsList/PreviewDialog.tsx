"use client";

import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { useTranslations } from "next-intl";
import { ArticleModel } from "@/lib/api/contract";

interface PreviewDialogProps {
  article: ArticleModel;
}

export default function PreviewDialog({ article }: PreviewDialogProps) {
  const t = useTranslations("preview_dialog");

  return (
    <Dialog.Root>
      <Dialog.Trigger
        className="bg-foreground text-background min-h-12 rounded-full border-0 px-4 font-bold"
        type="button"
      >
        {t("preview")}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/40" />
        <Dialog.Popup className="fixed inset-0 m-auto flex max-h-[90vh] max-w-3xl items-center justify-center p-4">
          <div className="w-full overflow-y-auto rounded-[1.5rem] bg-white p-6 shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <Dialog.Title className="text-muted-foreground text-[0.8rem] tracking-[0.22em] uppercase">
                  {article.source.name}
                </Dialog.Title>
                <h2 className="font-display mt-2 text-[clamp(2rem,3vw,2.75rem)] leading-[1.05]">
                  {article.title}
                </h2>
              </div>
              <Dialog.Close className="text-foreground hover:border-accent bg-card/90 hover:bg-card inline-flex h-10 items-center justify-center rounded-full border px-4 text-sm font-semibold transition">
                {t("close")}
              </Dialog.Close>
            </div>
            {article.urlToImage ? (
              <div className="mb-5 overflow-hidden rounded-[1.25rem]">
                <Image
                  src={article.urlToImage}
                  alt={article.title}
                  width={1080}
                  height={608}
                  className="h-80 w-full object-cover"
                  unoptimized
                />
              </div>
            ) : null}
            <Dialog.Description className="text-muted-foreground mb-4">
              {article.description}
            </Dialog.Description>
            {article.content ? (
              <p className="text-muted-foreground mb-4 whitespace-pre-line">
                {article.content}
              </p>
            ) : null}
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="border-b-accent hover:border-b-accent inline-flex rounded-full border px-4 py-2 font-bold transition"
            >
              {t("read_full")}
            </a>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
