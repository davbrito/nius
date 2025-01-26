"use client";
import { ResponseShapes } from "@/lib/api/contract";
import { useSetSearchParam } from "@/lib/query";
import { use } from "react";

interface NewsListProps {
  page: number;
  promise: Promise<ResponseShapes["everything"]>;
}

export default function NewsList({ page, promise }: NewsListProps) {
  const query = useSetSearchParam();
  const pageSize = 10;

  const data = use(promise);
  const { status, body } = data;

  if (status === 400) return <div>{body.message}</div>;

  if (status !== 200) {
    console.error("Failed to fetch data", data);
    throw new Error("Failed to fetch data");
  }

  const pageCount = Math.ceil(body?.totalResults ?? 0 / pageSize);
  return (
    <div>
      <h2>News List</h2>
      <ul>
        {body?.articles.map((article) => (
          <li key={article.url}>
            <a href={article.url}>{article.title}</a>
          </li>
        ))}
      </ul>
      <nav>
        {page > 1 ? (
          <button
            type="button"
            onClick={() => {
              query.push("page", String(page - 1));
            }}
          >
            Previous
          </button>
        ) : null}
        <span>
          {page} of {pageCount}
        </span>
        {page < pageCount ? (
          <button
            type="button"
            onClick={() => {
              query.push("page", String(page + 1));
            }}
          >
            Next
          </button>
        ) : null}
      </nav>
    </div>
  );
}
