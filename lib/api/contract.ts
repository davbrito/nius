// contract.ts

import { ClientInferResponses, initContract } from "@ts-rest/core";
import * as z from "zod/mini";

const c = initContract();

const ArticleSchema = z.object({
  source: z.object({
    id: z.nullable(z.string()),
    name: z.string(),
  }),
  author: z.nullable(z.string()),
  title: z.string(),
  description: z.nullable(z.string()),
  url: z.string(),
  urlToImage: z.nullable(z.string()),
  publishedAt: z.string(),
  content: z.nullable(z.string()),
});

const TopHeadlinesSchema = z.object({
  status: z.string(),
  totalResults: z.number(),
  articles: z.array(ArticleSchema),
});

const EverythingSchema = z.object({
  status: z.string(),
  totalResults: z.number(),
  articles: z.array(ArticleSchema),
});

const ErrorSchema = z.object({
  status: z.string(),
  code: z.number(),
  message: z.string(),
});

export const contract = c.router({
  topHeadlines: {
    method: "GET",
    path: "/top-headlines",
    query: z.object({
      language: z.string(),
      pageSize: z.number(),
    }),
    responses: {
      200: TopHeadlinesSchema,
      400: ErrorSchema,
    },
    summary: "Get the top headlines",
  },
  everything: {
    method: "GET",
    path: "/everything",
    query: z.object({
      q: z.optional(z.string().check(z.maxLength(500))),
      searchIn: z.optional(z.string()),
      sources: z.optional(z.string()),
      domains: z.optional(z.string()),
      excludeDomains: z.optional(z.string()),
      from: z.optional(z.string()),
      to: z.optional(z.string()),
      language: z.optional(z.string()),
      sortBy: z.optional(z.string()),
      pageSize: z.optional(z.number()),
      page: z.optional(z.number()),
    }),
    responses: {
      200: EverythingSchema,
      400: ErrorSchema,
    },
    summary:
      "Search through millions of articles from various sources and blogs",
  },
});

export type ResponseShapes = ClientInferResponses<typeof contract>;

export type ArticleModel = z.infer<typeof ArticleSchema>;
