import Link from "next/link";
import { useRouter } from "next/router";
import Headlines from "../components/Headlines";
import PageLayout from "../components/PageLayout";

const API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2/";

const DEFAULT_LANG = "en";

const languageDisplayName = new Intl.DisplayNames(undefined, {
  type: "language",
});

export default function Home({ articles }) {
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
          <option value="es">{languageDisplayName.of("es")}</option>
          <option value="en">{languageDisplayName.of("en")}</option>
        </select>
      </p>

      <Headlines articles={articles} />
    </PageLayout>
  );
}

export async function getServerSideProps({ query: { lang = DEFAULT_LANG } }) {
  const params = new URLSearchParams({
    apiKey: API_KEY,
    language: lang,
    pageSize: 3,
  });

  const url = new URL("./top-headlines", BASE_URL);

  url.search = params;

  const response = await fetch(url);

  const data = await response.json();

  return {
    props: {
      error: data.status === "error",
      articles: data.articles ?? null,
    },
  };
}
