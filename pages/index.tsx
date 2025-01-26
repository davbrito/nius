import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import Headlines from "../components/Headlines";
import PageLayout from "../components/PageLayout";

const API_KEY = process.env.NEWS_API_KEY!;
const BASE_URL = "https://newsapi.org/v2/";

const DEFAULT_LANG = "en";

interface HomeProps {
  articles: any[];
  languages: { lang: string; displayName: string }[];
}

export default function Home({
  articles,
  languages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const lang = router.query.lang ?? DEFAULT_LANG;

  return (
    <PageLayout title="Home">
      <p>
        Select the language for the news{" "}
        <select
          value={lang}
          onChange={(event) => {
            router.replace({ query: { lang: event.currentTarget.value } });
          }}
        >
          {languages.map(({ lang, displayName }) => (
            <option key={lang} value={lang}>
              {displayName}
            </option>
          ))}
        </select>
      </p>

      <Headlines articles={articles} />
    </PageLayout>
  );
}

export const getServerSideProps = (async ({ query: { lang } }) => {
  lang ||= DEFAULT_LANG;

  const params = new URLSearchParams({
    apiKey: API_KEY,
    language: lang as string,
    pageSize: "3",
  });

  const url = new URL("./top-headlines", BASE_URL);

  url.search = params.toString();

  const response = await fetch(url);

  const data = await response.json();

  const displayNames = new Intl.DisplayNames("en", { type: "language" });

  const languages = ["es", "en"].map((lang) => ({
    lang,
    displayName:
      displayNames.of(lang)?.replace(/^(.)/, (c) => c.toUpperCase()) ?? lang,
  }));

  return {
    props: {
      error: data.status === "error",
      articles: data.articles ?? null,
      languages,
    },
  };
}) satisfies GetServerSideProps<HomeProps>;
