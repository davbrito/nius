"use client";

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
    <details className="dropdown">
      <summary role="button" style={{ width: "max-content" }}>
        {lang
          ? languages.find(({ lang: l }) => l === lang)?.displayName
          : "Select Language"}
      </summary>
      <ul>
        {languages.map(({ lang, displayName }) => (
          <li
            key={lang}
            value={lang}
            onClick={() => {
              router.replace(pathname + "?" + createQueryString("lang", lang));
            }}
          >
            {displayName}
          </li>
        ))}
      </ul>
    </details>
  );
}

export default LangSelector;
