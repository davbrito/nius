"use client";

import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { ArticleModel } from "@/lib/api/contract";

interface PreviewDialogProps {
  article: ArticleModel;
}

export default function PreviewDialog({ article }: PreviewDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className="bg-ink min-h-12 rounded-full border-0 px-4 font-bold text-white"
        type="button"
      >
        Preview
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/40" />
        <Dialog.Popup className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[1.5rem] bg-white p-6 shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <Dialog.Title className="text-muted text-[0.8rem] tracking-[0.22em] uppercase">
                  {article.source.name}
                </Dialog.Title>
                <h2 className="mt-2 text-[clamp(2rem,3vw,2.75rem)] leading-[1.05] font-[family:var(--font-display)]">
                  {article.title}
                </h2>
              </div>
              <Dialog.Close className="inline-flex h-10 items-center justify-center rounded-full border border-[rgba(23,23,23,0.12)] bg-[rgba(255,255,255,0.9)] px-4 text-sm font-semibold text-[color:var(--color-ink)] transition hover:border-[color:var(--color-accent)] hover:bg-white">
                Close
              </Dialog.Close>
            </div>
            {article.urlToImage ? (
              <div className="bg-panel mb-5 overflow-hidden rounded-[1.25rem]">
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
            <Dialog.Description className="text-muted mb-4">
              {article.description}
            </Dialog.Description>
            {article.content ? (
              <p className="text-muted mb-4 whitespace-pre-line">
                {article.content}
              </p>
            ) : null}
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="border-b-accent hover:border-b-accent inline-flex rounded-full border px-4 py-2 font-bold transition"
            >
              Read full article
            </a>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
