// contract.ts

import { ClientInferResponses, initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const ArticleSchema = z.object({
  source: z.object({
    id: z.string().nullable(),
    name: z.string(),
  }),
  author: z.string().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  url: z.string(),
  urlToImage: z.string().nullable(),
  publishedAt: z.string(),
  content: z.string().nullable(),
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
      q: z.string().max(500).optional(),
      searchIn: z.string().optional(),
      sources: z.string().optional(),
      domains: z.string().optional(),
      excludeDomains: z.string().optional(),
      from: z.string().optional(),
      to: z.string().optional(),
      language: z.string().optional(),
      sortBy: z.string().optional(),
      pageSize: z.number().optional(),
      page: z.number().optional(),
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
