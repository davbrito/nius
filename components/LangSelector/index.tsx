"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Language {
  lang: string;
  displayName: string;
}

interface LangSelectorProps {
  languages: Language[];
}

function LangSelector({ languages }: LangSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const lang = searchParams?.get("lang");

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set(name, value);
    return params.toString();
  };

  return (
    <select
      value={lang ?? ""}
      onChange={(event) => {
        router.replace(
          pathname + "?" + createQueryString("lang", event.target.value),
        );
      }}
    >
      {languages.map(({ lang, displayName }) => (
        <option key={lang} value={lang}>
          {displayName}
        </option>
      ))}
    </select>
  );
}

export default LangSelector;
