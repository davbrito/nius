import { useTranslations } from "next-intl";
import Link from "next/link";

export default function HiddenLinks() {
  const t = useTranslations("hidden_links");
  return (
    <div className="absolute top-0 left-0 z-10 translate-y-[-140%] focus-within:translate-y-0">
      <Link href="#main-content">{t("skip_to_content")}</Link>
    </div>
  );
}
