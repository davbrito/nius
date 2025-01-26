// client.ts
import { initClient } from "@ts-rest/core";
import { contract } from "./contract";

const API_KEY = process.env.NEWS_API_KEY!;
const BASE_URL = "https://newsapi.org/v2/";

export const newsClient = initClient(contract, {
  baseUrl: BASE_URL,
  baseHeaders: {
    Authorization: API_KEY,
  },
});
