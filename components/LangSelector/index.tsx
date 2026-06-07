"use client";

import { Select } from "@base-ui/react/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Language {
  lang: string;
  displayName: string;
}

interface LangSelectorProps {
  languages: Language[];
  lang: string;
}

function LangSelector({ languages, lang }: LangSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set(name, value);
    return params.toString();
  };

  return (
    <div className="inline-grid">
      <Select.Root
        value={lang}
        onValueChange={(nextLang) => {
          if (nextLang === null) return;
          router.replace(pathname + "?" + createQueryString("lang", nextLang));
        }}
      >
        <Select.Label className="sr-only">Language</Select.Label>
        <Select.Trigger className="text-foreground hover:border-accent data-popup-open:border-accent bg-card/90 inline-flex items-center justify-between gap-2 rounded-full border px-3 py-1 text-left shadow-sm transition outline-none">
          <Select.Value>
            {(value: string | null) =>
              value
                ? (languages.find(({ lang }) => lang === value)?.displayName ??
                  value)
                : ""
            }
          </Select.Value>
          <Select.Icon className="text-muted-foreground text-[0.8rem]">
            ▾
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner sideOffset={10} alignItemWithTrigger>
            <Select.Popup className="bg-card overflow-hidden rounded-[1.25rem] border shadow-[0_24px_70px_rgba(23,23,23,0.18)]">
              <Select.List className="grid gap-1 p-2">
                {languages.map(({ lang, displayName }) => (
                  <Select.Item
                    key={lang}
                    value={lang}
                    label={displayName}
                    className="data-highlighted:bg-accent/10 data-selected:bg-accent/8 flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm transition"
                  >
                    <Select.ItemText>{displayName}</Select.ItemText>
                    <Select.ItemIndicator className="text-accent-foreground">
                      ✓
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

export default LangSelector;
